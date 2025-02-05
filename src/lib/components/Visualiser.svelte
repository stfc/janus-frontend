<script>
	import { onMount } from 'svelte';
	import MultiSelectList from './MultiSelectList.svelte';
	import DataDisplay from './DataDisplay.svelte';

	export let fileContent = '';
	export let fileType = 'xyz';
	/**
	 * @type {import("3dmol").GLViewer}
	 */
	let viewer;
	let selectedStyle = ['stick', 'sphere'];
	const styles = ['stick', 'sphere', 'line', 'cross', 'cartoon'];
	const stylesDict = { stick: { radius: 0.1 }, sphere: { radius: 0.2 } };
	const radiusDict = { stick: 0.1, sphere: 0.2, line: 1, cross: 1, cartoon: 1 };

	onMount(() => {
		if (typeof window !== 'undefined') {
			const element = document.getElementById('3dmol-viewer');
			if (element.clientWidth > 0 && element.clientHeight > 0) {
				import('3dmol').then((ThreeDMol) => {
					const config = { backgroundColor: 'white' };
					viewer = ThreeDMol.createViewer(element, config);

					// Load XYZ file content
					viewer.addModel(fileContent, fileType);
					updateStyle('default');
					viewer.zoomTo();
					viewer.render();

					window.addEventListener('resize', () => {
						viewer.resize();
					});
				});
			} else {
				console.error('3dmol-viewer element has zero size.');
			}
		}
	});

	/**
	 * @param {string} style
	 */
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

	// function updateStyles();
</script>

<div class="flex flex-col items-center">
	<div id="3dmol-viewer" class="h-96 w-full border border-gray-300"></div>
	<div class="mb-4">
		<label for="style-select" class="mr-2">Select Style:</label>
		<select
			id="style-select"
			class="rounded border border-gray-300 p-2"
			on:change={(e) => updateStyle(e.target.value)}
		>
			<option value="stick">Stick</option>
			<option value="sphere">Sphere</option>
			<option value="line">Line</option>
			<option value="cartoon">Cartoon</option>
			<option value="cross">Cross</option>
		</select>
		<MultiSelectList bind:selected={selectedStyle} items={styles} title="Styles" />
	</div>
	<DataDisplay data={stylesDict} />
	test
	<label for="radius" class="w-24 text-gray-700">Radius value::</label>
	<input
		id="radius"
		type="number"
		min="0"
		max={5}
		bind:value={radiusDict['sphere']}
		class="w-20 rounded border px-2 py-1"
	/>
	test
</div>
