<script>
	import { onMount } from 'svelte';

	let domElement;
	let editor;
	let weas;
	let loaded = false;
	export let fileFormat = 'cif';
	export let fileContent = undefined;
	export let height = 300;
	export let width = 100;

	async function updateViewer(fileContent) {
		if (!editor) return;
		editor.clear();
		let atomsList;
		if (fileFormat === 'cif') {
			atomsList = await weas.parseCIF(fileContent);
		} else if (fileFormat === 'xyz') {
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

	onMount(async () => {
		if (typeof window !== 'undefined') {
			weas = await import('weas/dist/weas.mjs');
			editor = new weas.WEAS({ domElement });
			window.editor = editor;
			updateViewer(fileContent);
			loaded = true;
		}
	});

	$: if (loaded && fileContent) {
		updateViewer(fileContent);
	}
</script>

<div id="viewer" style="height: {height}px; width: {width};" bind:this={domElement}></div>

<style>
	#viewer {
		position: relative;
	}
</style>
