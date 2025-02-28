<script>
	import FileUploader from '$lib/components/FileUploader.svelte';
	import DropDownList from '$lib/components/DropDownList.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
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
	/** @type {Object} */
	let results;
	let resultsFileContent;
	let trajFileContents;

	let selectedDataStructure = filenames[0];
	let selectedArchitecture = archList[0];
	let selectedFmax = 0.1;
	let selectedSteps = 1000;

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
			fmax: selectedFmax,
			steps: selectedSteps,
			format: 'cif'
		};

		try {
			console.log(JSON.stringify(queryDict));
			toggleWaiting();
			const response = await fetch(`/api/geomopt`, {
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
			resultsFileContent = data.results_file.content;
			trajFileContents = data.traj_file.content;
			showResults = true;
			toggleWaiting();
			console.log('Calculation result:', results);
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<PageHeader pageName="Geomopt" />

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
			<NumberInput bind:selectedValue={selectedFmax} title={'Fmax'} />
			<NumberInput bind:selectedValue={selectedSteps} title={'Steps'} stepValue={1} />
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
			<ThreeDmol givenFile={resultsFileContent} example={false} />
			<Weas givenFile={resultsFileContent} example={false} />
			<DataDisplay data={results} />
		{/if}
	</div>
</div>
{trajFileContents}
