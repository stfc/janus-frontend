<script context="module">
	export { load } from './+page.js';
</script>

<script>
	import { writable } from 'svelte/store';
	import FileUploader from '$lib/components/FileUploader.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import DropDownList from '$lib/components/DropDownList.svelte';
	import MultiSelectList from '$lib/components/MultiSelectList.svelte';
	import RangeSelector from '$lib/components/RangeSelector.svelte';
	import SpinningWheel from '$lib/components/SpinningWheel.svelte';
	import DataDisplay from '$lib/components/DataDisplay.svelte';

	export let data;

	let showUploader = false;
	let showWaiting = false;
	let showResults = false;
	let filenames = data.files;
	const archList = ['mace_mp', 'mace', 'mace_off', 'm3gnet', 'chgnet', 'alignn', 'sevennet'];
	const properties = ['forces', 'energy', 'stress', 'hessian'];
	/** @type {Object} */
	let results;

	let selectedDataStructure = filenames[0];
	let selectedArchitecture = archList[0];
	let selectedProperty = properties.slice(0, 3);
	let selectedRange = writable(':');

	function toggleUploader() {
		showUploader = !showUploader;
	}

	function toggleWaiting() {
		showWaiting = !showWaiting;
	}

	async function handleFileUpload(event) {
		// Re-fetch the data after a file is uploaded
		const response = await fetch('/api/upload/files');
		if (response.ok) {
			const data = await response.json();
			filenames = data;
			selectedDataStructure = event.detail.filename; // Set the uploaded filename as the selected data structure
		} else {
			console.error('Failed to fetch data');
		}
	}

	async function calculateSinglepoint() {
		showResults = false;
		const queryDict = {
			struct: selectedDataStructure,
			arch: selectedArchitecture,
			properties: selectedProperty,
			range_selector: $selectedRange
		};

		try {
			console.log(JSON.stringify(queryDict));
			toggleWaiting();
			const response = await fetch(`/api/singlepoint`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(queryDict)
			});

			if (!response.ok) {
				throw new Error('Failed to calculate');
			}
			results = await response.json();
			showResults = true;
			toggleWaiting();
			console.log('Calculation result:', results);
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<SideBar pageName="Singlepoint Calculation" />

<div class="flex-col">
	<div class="flex-1 pl-48 pt-4">
		<div class="flex space-x-4">
			<div class="flex-col space-y-4">
				<DropDownList
					bind:selected={selectedDataStructure}
					items={filenames}
					title="Data structures"
				/>
				{#if showUploader}
					<FileUploader on:upload={handleFileUpload} />
				{/if}
				<button
					on:click={toggleUploader}
					class="h-12 rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-500"
				>
					{showUploader ? 'Hide Uploader' : 'Upload New File'}
				</button>
			</div>
			<DropDownList bind:selected={selectedArchitecture} items={archList} title="Architectures" />
			<MultiSelectList bind:selected={selectedProperty} items={properties} title="Properties" />
			<RangeSelector maxIndex={100} bind:selectedRange title="Range Selection" />
			<div class="flex-col px-2">
				<button
					on:click={calculateSinglepoint}
					class="h-20 w-40 rounded bg-blue-700 py-2 font-bold text-white hover:bg-blue-500"
				>
					Calculate
				</button>
				{#if showWaiting}
					<div class="px-2 py-4">
						Waiting for results...
						<div class="px-12 py-4">
							<SpinningWheel />
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<div class="ml-48 py-4">
		{#if showResults}
			<DataDisplay data={results} />
		{/if}
	</div>
</div>
