<script context="module">
	export { load } from './+page.js';
</script>

<script>
	import { writable } from 'svelte/store';
	import FileUploader from '$lib/components/FileUploader.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import DropDownList from '$lib/components/DropDownList.svelte';
	import RangeSelector from '$lib/components/RangeSelector.svelte';

	export let data;

	let test = data.files;
	let showUploader = false;
	const archList = ['mace_mp', 'chgnet', 'm3gnet'];
	const properties = ['all properties', 'forces', 'energy', 'stress'];

	let selectedDataStructure = test[0];
	let selectedArchitecture = archList[0];
	let selectedProperty = properties[0];
	let selectedRange = writable(':');

	function toggleUploader() {
		showUploader = !showUploader;
	}

	async function handleFileUpload(event) {
		// Re-fetch the data after a file is uploaded
		const response = await fetch('/api/upload/files');
		if (response.ok) {
			const data = await response.json();
			test = data;
			selectedDataStructure = event.detail.filename; // Set the uploaded filename as the selected data structure
		} else {
			console.error('Failed to fetch data');
		}
	}
</script>

<SideBar pageName="Singlepoint Calculation" />

<div class="flex-1 pl-48 pt-4">
	<div class="flex space-x-4">
		<DropDownList bind:selected={selectedDataStructure} items={test} title="Data structures" />
		<DropDownList bind:selected={selectedArchitecture} items={archList} title="Architectures" />
		<DropDownList bind:selected={selectedProperty} items={properties} title="Properties" />
		<RangeSelector maxIndex={100} bind:selectedRange title="Range Selection" />
	</div>
	{#if showUploader}
		<FileUploader on:upload={handleFileUpload} />
	{/if}
	<button on:click={toggleUploader} class="mt-4 rounded bg-blue-500 p-2 text-white">
		{showUploader ? 'Hide Uploader' : 'Upload New File'}
	</button>

	<div class="mt-4">
		<!-- <p>Selected Data Structure: {selectedDataStructure}</p>
        <p>Selected Architecture: {selectedArchitecture}</p>
        <p>Selected Property: {selectedProperty}</p> -->
	</div>
</div>
