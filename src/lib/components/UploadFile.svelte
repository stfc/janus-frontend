<script>
	import { onMount } from 'svelte';
	import FileUploader from '$lib/components/FileUploader.svelte';
	import DropDownList from '$lib/components/DropDownList.svelte';

	export let data;

	let showUploader = false;
	let filenames = data.files;
	let loaded = false;

	export let selectedDataStructure = filenames[0];
	function toggleUploader() {
		showUploader = !showUploader;
	}

	// @ts-ignore
	async function handleFileUpload(event) {
		const response = await fetch('/api/upload/files');
		if (response.ok) {
			const data = await response.json();
			filenames = data;
			selectedDataStructure = event.filename;
		} else {
			console.error('Failed to fetch data');
		}
	}
	function fetchData() {
		fetch('/api/upload/files')
			.then((response) => response.json())
			.then((data) => {
				filenames = data;
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	$: if (selectedDataStructure && loaded) {
		fetchData();
	}

	function toggle_loaded() {
		loaded = true;
	}

	onMount(toggle_loaded());
</script>

<div class="flex pl-4 pt-4">
	<div class="flex space-x-4">
		<div class="flex-col space-y-4">
			<DropDownList
				bind:selected={selectedDataStructure}
				items={filenames}
				title="Data structures"
			/>
			{#if showUploader}
				<FileUploader onUpload={handleFileUpload} />
			{/if}
			<button
				on:click={toggleUploader}
				class="h-12 rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-500"
			>
				{showUploader ? 'Hide Uploader' : 'Upload New File'}
			</button>
		</div>
	</div>
</div>
