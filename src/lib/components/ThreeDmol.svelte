<script>
	import { onMount } from 'svelte';

	const fileList = import.meta.glob('/src/lib/cif/*');
	const files = Object.keys(fileList).map((file) => file.replace('/src/lib/cif/', ''));
	let selectedFile = files[0];
	let viewer;

	function updateStyle(style) {
		if (viewer) {
			if (style === 'default') {
				viewer.setStyle({}, { stick: { radius: 0.1 }, sphere: { radius: 0.2 } });
			} else {
				viewer.setStyle({}, { [style]: {} });
			}
			viewer.render();
		}
	}

	async function readFile(file) {
		const response = await fetch(`/src/lib/cif/${file}`);
		if (response.ok) {
			const data = await response.text();
			updateViewer(data);
		} else {
			console.error('Failed to load file content');
		}
	}

	function updateViewer(newFile) {
		if (viewer) {
			viewer.removeAllModels();
			viewer.addModel(newFile, 'cif');
			updateStyle('default');
			viewer.zoomTo();
			viewer.render();
		}
	}

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://3Dmol.org/build/3Dmol-min.js';
		script.onload = async () => {
			const element = document.querySelector('#container-01');
			const config = { backgroundColor: 'black' };
			viewer = window.$3Dmol.createViewer(element, config);
			await readFile(selectedFile);
			viewer.zoom(0.8, 2000);
		};
		document.head.appendChild(script);
	});
</script>

<div id="container-01" class="mol-container"></div>
<div class="mt-2">
	<label for="style-select" class="mr-2">Select Style:</label>
	<select
		id="style-select"
		class="w-32 rounded border border-gray-300"
		on:change={(e) => updateStyle(e.target.value)}
	>
		<option value="default">Stick+ball</option>
		<option value="stick">Stick</option>
		<option value="sphere">Sphere</option>
		<option value="line">Line</option>
		<option value="cartoon">Cartoon</option>
		<option value="cross">Cross</option>
	</select>
</div>
<div class="mt-2">
	<label for="file-select" class="mr-2">Files:</label>
	<select
		id="file-select"
		class="rounded border border-gray-300"
		bind:value={selectedFile}
		on:change={(e) => readFile(e.target.value)}
	>
		{#each files as file}
			<option value={file}>{file}</option>
		{/each}
	</select>
</div>

<style>
	.mol-container {
		width: 60%;
		height: 400px;
		position: relative;
	}
</style>
