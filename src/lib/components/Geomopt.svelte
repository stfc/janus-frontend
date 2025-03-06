<script>
	import DropDownList from '$lib/components/DropDownList.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import SpinningWheel from '$lib/components/SpinningWheel.svelte';
	import DataDisplay from '$lib/components/DataDisplay.svelte';

	export let selectedDataStructure;

	let showWaiting = false;
	let showResults = false;
	const archList = ['mace_mp', 'mace', 'mace_off', 'm3gnet', 'chgnet', 'alignn', 'sevennet'];
	/** @type {Object} */
	let results;
	let resultsFileContent;
	let trajFileContents;
	let queryDict;
	let selectedArchitecture = archList[0];
	let selectedFmax = 0.1;
	let selectedSteps = 1000;

	function toggleWaiting() {
		showWaiting = !showWaiting;
	}

	$: queryDict = {
		struct: selectedDataStructure,
		arch: selectedArchitecture,
		fmax: selectedFmax,
		steps: selectedSteps,
		format: 'cif'
	};

	async function calculateGeomopt() {
		showResults = false;

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
			console.log(data);
			results = data.results;
			resultsFileContent = data.results_file.content;
			trajFileContents = data.traj_file.content;
			selectedDataStructure = data.results_file.filename;
			showResults = true;
			toggleWaiting();
			console.log('Calculation result:', results);
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<div class="flex-col">
	<div class="flex-1 pl-4 pt-4">
		<div class="flex space-x-2">
			<DropDownList bind:selected={selectedArchitecture} items={archList} title="Architectures" />
			<NumberInput bind:selectedValue={selectedFmax} title={'Fmax'} />
			<NumberInput bind:selectedValue={selectedSteps} title={'Steps'} stepValue={1} />
			<div class="flex-col">
				<button
					on:click={calculateGeomopt}
					class="h-20 w-40 rounded bg-blue-700 py-2 font-bold text-white hover:bg-blue-500"
				>
					Calculate Geomopt
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
