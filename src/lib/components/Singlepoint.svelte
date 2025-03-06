<script>
	import { writable } from 'svelte/store';
	import DropDownList from '$lib/components/DropDownList.svelte';
	import MultiSelectList from '$lib/components/MultiSelectList.svelte';
	import RangeSelector from '$lib/components/RangeSelector.svelte';
	import SpinningWheel from '$lib/components/SpinningWheel.svelte';
	import DataDisplay from '$lib/components/DataDisplay.svelte';

	export let selectedDataStructure;

	let showWaiting = false;
	let showResults = false;
	const archList = ['mace_mp', 'mace', 'mace_off', 'm3gnet', 'chgnet', 'alignn', 'sevennet'];
	const properties = ['forces', 'energy', 'stress', 'hessian'];
	/** @type {Object} */
	let results;
	// let fileContent;

	let selectedArchitecture = archList[0];
	let selectedProperty = properties.slice(0, 3);
	let selectedRange = writable(':');
	let queryDict;

	function toggleWaiting() {
		showWaiting = !showWaiting;
	}

	$: queryDict = queryDict = {
		struct: selectedDataStructure,
		arch: selectedArchitecture,
		properties: selectedProperty,
		range_selector: $selectedRange,
		format: 'cif'
	};

	async function calculateSinglepoint() {
		showResults = false;

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
			// fileContent = data.file.content;
			selectedDataStructure = data.file.filename;
			showResults = true;
			toggleWaiting();
			console.log('Calculation result:', results);
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<div class="flex-col">
	<div class="flex pl-4 pt-4">
		<div class="flex space-x-2">
			<DropDownList bind:selected={selectedArchitecture} items={archList} title="Architectures" />
			<MultiSelectList bind:selected={selectedProperty} items={properties} title="Properties" />
			<RangeSelector maxIndex={100} bind:selectedRange title="Range Selection" />
			<div class="flex-col px-2">
				<button
					on:click={calculateSinglepoint}
					class="h-20 w-44 rounded bg-blue-700 py-2 font-bold text-white hover:bg-blue-500"
				>
					Calculate Singlepoint
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
			<DataDisplay data={results} />
		{/if}
	</div>
</div>
