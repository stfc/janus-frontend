<script>
	import { writable } from 'svelte/store';
	import FileUploader from '$lib/components/FileUploader.svelte';
	import DropDownList from '$lib/components/DropDownList.svelte';
	import MultiSelectList from '$lib/components/MultiSelectList.svelte';
	import RangeSelector from '$lib/components/RangeSelector.svelte';
	import SpinningWheel from '$lib/components/SpinningWheel.svelte';
	import DataDisplay from '$lib/components/DataDisplay.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import ThreeDmol from '$lib/components/ThreeDmol.svelte';
	import Weas from '$lib/components/weas.svelte';

	export let data;

	let showUploader = false;
	let showWaiting = false;
	let showResults = false;
	let filenames = data.files;
	const archList = ['mace_mp', 'mace', 'mace_off', 'm3gnet', 'chgnet', 'alignn', 'sevennet'];
	const properties = ['forces', 'energy', 'stress', 'hessian'];
	/** @type {Object} */
	let results;
	let fileContent;

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

	// @ts-ignore
	async function handleFileUpload(event) {
		// Re-fetch the data after a file is uploaded
		const response = await fetch('/api/upload/files');
		if (response.ok) {
			const data = await response.json();
			filenames = data;
			selectedDataStructure = event.filename;
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
			range_selector: $selectedRange,
			format: 'cif'
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
				toggleWaiting();
				throw new Error('Failed to calculate');
			}
			const data = await response.json();
			results = data.results;
			fileContent = data.file.content;
			showResults = true;
			toggleWaiting();
			console.log('Calculation result:', results);
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<PageHeader pageName="Singlepoint" />

<div class="flex-col">
	<div class="flex-1 pl-4 pt-4">
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
	<div class="px-4 py-4">
		{#if showResults}
			<ThreeDmol givenFile={fileContent} example={false} />
			<Weas givenFile={fileContent} example={false} />
			{fileContent}
			<DataDisplay data={results} />
		{/if}
	</div>
</div>
