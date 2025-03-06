<script>
	import { onMount } from 'svelte';

	const fileList = import.meta.glob('/src/lib/cif/*');
	const files = Object.keys(fileList).map((file) => file.replace('/src/lib/cif/', ''));
	export let selectedStructure = files[0];
	export let givenFile = undefined;
	export let givenFormat = 'cif';
	export let height = 300;
	export let width = '100%'; // Add width as a prop
	export let example = true;
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

	async function retrieveFile(file) {
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
			viewer.addModel(newFile, givenFormat);
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
			if (givenFile) {
				updateViewer(givenFile);
			} else {
				await retrieveFile(selectedStructure);
			}
			viewer.zoom(0.8, 2000);
		};
		document.head.appendChild(script);
	});

	$: if (example && viewer && selectedStructure) {
		retrieveFile(selectedStructure);
	}
	$: if (givenFile && !example && viewer) {
		updateViewer(givenFile);
	}
</script>

<div id="container-01" class="mol-container" style="height: {height}px; width: {width};"></div>
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
{#if example}
	<div class="mt-2">
		<label for="file-select" class="mr-2">Files:</label>
		<select
			id="file-select"
			class="rounded border border-gray-300"
			bind:value={selectedStructure}
			on:change={(e) => retrieveFile(e.target.value)}
		>
			{#each files as file}
				<option value={file}>{file}</option>
			{/each}
		</select>
	</div>
{/if}

<style>
	.mol-container {
		position: relative;
	}
</style>
