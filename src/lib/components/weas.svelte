<script>
	import { onMount } from 'svelte';

	let domElement;
	let editor;
	let weas;
	export let givenFormat = 'cif';
	const fileList = import.meta.glob('/src/lib/cif/*');
	const files = Object.keys(fileList).map((file) => file.replace('/src/lib/cif/', ''));
	export let selectedStructure = files[0];
	export let givenFile = undefined;
	export let height = 300;
	export let width = 100;
	export let example = true;

	async function retrieveFile(file) {
		const response = await fetch(`/src/lib/cif/${file}`);
		if (response.ok) {
			const data = await response.text();
			return data;
		}
		console.error('Failed to load file content');
	}

	async function updateViewer(fileContent, format) {
		if (!editor) return;
		editor.clear();
		let atomsList;
		if (format === 'cif') {
			atomsList = await weas.parseCIF(fileContent);
		} else if (format === 'xyz') {
			atomsList = await weas.parseXYZ(fileContent);
		}
		if (!atomsList) {
			console.error('Failed to parse structure data');
			return;
		}

		if (editor.avr) {
			editor.avr.atoms = atomsList;
			editor.avr.modelStyle = 1;
			editor.instancedMeshPrimitive.fromSettings([]);
		} else {
			console.error('Editor or editor.avr is not defined');
		}
	}

	async function updateAtoms(filename, fileContent = null) {
		const structureData = fileContent || (await retrieveFile(filename));
		await updateViewer(structureData, formatCheck(filename));
	}

	function formatCheck(filename) {
		if (filename.endsWith('.cif')) {
			return 'cif';
		} else if (filename.endsWith('.xyz')) {
			return 'xyz';
		} else {
			console.error('Format should be .cif or .xyz');
		}
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

	onMount(async () => {
		if (typeof window !== 'undefined') {
			weas = await import('weas/dist/weas.mjs');
			editor = new weas.WEAS({ domElement });
			window.editor = editor;
			if (givenFile) {
				updateViewer(givenFile, givenFormat);
			} else {
				await updateAtoms(selectedStructure);
			}
		}
	});

	$: if (weas && example && selectedStructure) {
		updateAtoms(selectedStructure);
	}
</script>

<div id="viewer" style="height: {height}px; width: {width};" bind:this={domElement}></div>
<label for="file-upload" class="custom-file-upload">
	<i class="fas fa-cloud-upload-alt"></i> Upload Structure
</label>
<input id="file-upload" type="file" on:change={handleFileUpload} />
{#if example}
	<div class="mt-2">
		<label for="file-select" class="mr-2">Example files:</label>
		<select
			id="file-select"
			class="rounded border border-gray-300"
			bind:value={selectedStructure}
			on:change={() => updateAtoms(selectedStructure)}
		>
			{#each files as file}
				<option value={file}>{file}</option>
			{/each}
		</select>
	</div>
{/if}

<style>
	#viewer {
		position: relative;
	}
</style>
