<script>
	import { onMount } from 'svelte';
	import MultiSelectList from './MultiSelectList.svelte';

	export let fileContent = '';
	export let fileType = 'xyz';
	/**
	 * @type {import("3dmol").GLViewer}
	 */
	let viewer;
	let selectedStyle = ['stick', 'sphere'];
	const styles = ['stick', 'sphere', 'line', 'cross', 'cartoon'];
	// const stylesDict = { stick: { radius: 0.1 }, sphere: { radius: 0.2 } };

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
</script>

<div class="flex">
	<div
		id="3dmol-viewer"
		class="h-96 w-full
	"
	></div>
</div>
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
</div>
<div class="flex">
	<MultiSelectList bind:selected={selectedStyle} items={styles} title="Styles" />
</div>
