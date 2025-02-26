<script>
	import { onMount } from 'svelte';
	export let givenFile = undefined;

	let JmolDiv;
	let Jmol;
	const myJmol = 'myJmol';
	const fileList = import.meta.glob('/src/lib/cif/*');
	const files = Object.keys(fileList).map((file) => file.replace('/src/lib/cif/', ''));
	export let selectedStructure = files[0];
	export let height = 300; // Height in pixels
	export let width = 100; // Width in percentage
	let zoom = 20;

	function calcZoom() {
		const ratio = height / 300;
		zoom = 20 * ratio;
	}

	function updateAtoms() {
		const JmolInfo = {
			width: '100%',
			height: '100%',
			color: '#E2F4F5',
			j2sPath: '/src/lib/jsmol/j2s',
			use: 'html5',
			script: `
					load /src/lib/cif/${selectedStructure};
					zoom ${zoom}
				`
		};
		JmolDiv.innerHTML = Jmol.getAppletHtml(myJmol, JmolInfo);
	}

	onMount(async () => {
		let script;
		calcZoom();
		if (givenFile) {
			script = `
					load DATA "modelCIF"
					${givenFile}
					END "modelCIF"`;
		} else {
			script = `
					load /src/lib/cif/${selectedStructure};
					zoom ${zoom}
					`;
		}
		const JmolInfo = {
			width: '100%',
			height: '100%',
			color: '#E2F4F5',
			j2sPath: '/src/lib/jsmol/j2s',
			use: 'html5',
			script: script
		};
		JmolDiv.innerHTML = await Jmol.getAppletHtml(myJmol, JmolInfo);
	});

	$: if (JmolDiv && selectedStructure) {
		updateAtoms();
	}
</script>

<svelte:head>
	<script src="/src/lib/jsmol/JSmol.min.js"></script>
</svelte:head>
<div class="flex p-4">
	<div id="JmolDiv" bind:this={JmolDiv} style="height: {height}px; width: {width}%;"></div>
</div>
<div class="mt-2">
	<label for="file-select" class="mr-2">Files:</label>
	<select
		id="file-select"
		class="rounded border border-gray-300"
		bind:value={selectedStructure}
		on:change={() => updateAtoms()}
	>
		{#each files as file}
			<option value={file}>{file}</option>
		{/each}
	</select>
</div>

<style>
	#JmolDiv {
		position: relative;
	}
</style>
