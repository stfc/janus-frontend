<script>
	import { onMount } from 'svelte';
	import * as weas from 'weas/dist/weas.mjs';

	let domElement;
	let editor;
	let selectedStructure = 'c2h6so.xyz';

	async function fetchFile(filename) {
		if (!filename.includes('.')) {
			return '';
		}
		const baseUrl = 'https://raw.githubusercontent.com/superstar54/weas/main/demo/datas/';
		const response = await fetch(`${baseUrl}${filename}`);
		if (!response.ok) {
			throw new Error(`Failed to load file from GitHub: ${filename}`);
		}
		return await response.text();
	}

	async function updateAtoms(filename, fileContent = null) {
		editor.clear();
		const structureData = fileContent || (await fetchFile(filename));
		let atomsList;

		if (filename.endsWith('.xyz')) {
			atomsList = weas.parseXYZ(structureData);
		} else if (filename.endsWith('.cif')) {
			atomsList = weas.parseCIF(structureData);
		}

		editor.avr.atoms = atomsList;
		editor.avr.modelStyle = 1;
		editor.instancedMeshPrimitive.fromSettings([]);
	}

	function handleFileUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const filename = file.name;
			const reader = new FileReader();
			reader.onload = async (e) => {
				const fileContent = e.target.result;
				await updateAtoms(filename, fileContent);
			};
			reader.readAsText(file);
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			editor = new weas.WEAS({ domElement });
			window.editor = editor;
			updateAtoms(selectedStructure);
		}
	});
</script>

<h1>WEAS (Web Environment For Atomistic Structures)</h1>
Select structure
<select bind:value={selectedStructure} on:change={() => updateAtoms(selectedStructure)}>
	<option value="c2h6so.xyz">C2H6SO Molecule</option>
	<option value="urea.cif">Hydrogen bond</option>
	<option value="catio3.cif">CaTiO3 Crystal</option>
	<option value="CoO.cif">CoO Crystal</option>
	<option value="deca_ala_md.xyz">MD trajectory</option>
	<option value="au.cif">Selection</option>
</select>

<label for="file-upload" class="custom-file-upload">
	<i class="fas fa-cloud-upload-alt"></i> Upload Structure
</label>
<input id="file-upload" type="file" style="display: none" on:change={handleFileUpload} />

<div id="viewer" bind:this={domElement}></div>

<style>
	@import 'weas/dist/style.css';
	@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css');

	#viewer {
		position: relative;
		width: 100%;
		height: 800px;
	}
</style>
