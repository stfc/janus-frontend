<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import ThreeDmol from '$lib/components/ThreeDmol.svelte';
	import Weas from '$lib/components/weas.svelte';
	import JsmolViewer from '$lib/components/JsmolViewer.svelte';

	const fileList = import.meta.glob('/src/lib/cif/*');
	const files = Object.keys(fileList).map((file) => file.replace('/src/lib/cif/', ''));
	let selectedStructure = files[0];
</script>

<PageHeader pageName={'Viewer comparison'} />
<div class="mt-2">
	<label for="file-select" class="mr-2">Files:</label>
	<select id="file-select" class="rounded border border-gray-300" bind:value={selectedStructure}>
		{#each files as file}
			<option value={file}>{file}</option>
		{/each}
	</select>
</div>
<div>
	<ThreeDmol {selectedStructure} />
	<Weas {selectedStructure} />
	<JsmolViewer {selectedStructure} />
</div>
