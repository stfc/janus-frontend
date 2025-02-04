<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	export let fileContent = '';
	/**
	 * @type {import("3dmol").GLViewer}
	 */
	let viewer;

	onMount(() => {
		if (typeof window !== 'undefined') {
			import('3dmol').then((ThreeDMol) => {
				const element = document.getElementById('3dmol-viewer');
				const config = { backgroundColor: 'white' };
				viewer = ThreeDMol.createViewer(element, config);

				// Load XYZ file content
				viewer.addModel(fileContent, 'xyz');
				updateStyle('stick');
				viewer.zoomTo();
				viewer.render();

				window.addEventListener('resize', () => {
					viewer.resize();
				});
			});
		}
	});

	/**
	 * @param {string} style
	 */
	function updateStyle(style) {
		if (viewer) {
			viewer.setStyle({}, { [style]: {} });
			viewer.render();
		}
	}
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
		</select>
	</div>
</div>
