<script>
	import { onMount } from 'svelte';

	export let fileContent = '';
	/**
	 * @type {import("ngl").Stage}
	 */
	let stage;

	onMount(() => {
		if (typeof window !== 'undefined') {
			import('ngl').then((NGL) => {
				const element = document.getElementById('ngl-viewer');
				stage = new NGL.Stage(element, { backgroundColor: 'white' });

				// Load MOL2 file content
				const blob = new Blob([fileContent], { type: 'text/plain' });
				stage
					.loadFile(blob, { ext: 'mol2' })
					.then(() => {
						updateStyle('default');
						stage.autoView();

						window.addEventListener('resize', () => {
							stage.handleResize();
						});
					})
					.catch((error) => {
						console.error('Error loading file:', error);
					});
			});
		}
	});

	/**
	 * @param {string} style
	 */
	function updateStyle(style) {
		if (stage) {
			stage.eachComponent((component) => {
				component.removeAllRepresentations();
				if (style === 'default') {
					component.addRepresentation('ball+stick', { radius: 0.1 });
					component.addRepresentation('spacefill', { radius: 0.2 });
				} else {
					component.addRepresentation(style);
				}
			});
			stage.autoView();
		}
	}
</script>

<div class="flex flex-col items-center space-y-2">
	<div id="ngl-viewer" class="h-96 w-full border border-gray-300"></div>
	<div class="mb-4">
		<label for="style-select" class="mr-2">Select Style:</label>
		<select
			id="style-select"
			class="rounded border border-gray-300 py-2 text-left"
			on:change={(e) => updateStyle(e.target.value)}
		>
			<option value="ball+stick">Ball+Stick</option>
			<option value="spacefill">Spacefill</option>
			<option value="line">Line</option>
			<option value="cartoon">Cartoon</option>
			<option value="surface">Surface</option>
		</select>
	</div>
</div>
