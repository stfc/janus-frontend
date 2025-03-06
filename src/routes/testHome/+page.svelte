<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Singlepoint from '$lib/components/Singlepoint.svelte';
	import Weas from '$lib/components/weas.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import Geomopt from '$lib/components/Geomopt.svelte';
	import TestWeas from '$lib/components/TestWeas.svelte';
	import ThreeDmol from '$lib/components/ThreeDmol.svelte';
	export let data;
	let selectedDataStructure;
	let calculationMode = 0;
	let fileContent = 'test';
	let fileFormat = 'cif';

	function fetchData() {
		fetch(`/api/upload/file/${selectedDataStructure}`)
			.then((response) => response.json())
			.then((data) => {
				fileContent = data.content;
				fileFormat = data.fileFormat;
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	$: if (selectedDataStructure) {
		fetchData();
	}
</script>

<PageHeader pageName="Test home" />
<div class="flex">
	<UploadFile {data} bind:selectedDataStructure />

	<div class="flex flex-col space-y-2 pl-4 pt-4">
		<label class="flex items-center">
			<input
				type="radio"
				name="calculationMode"
				value="1"
				bind:group={calculationMode}
				class="mr-2"
			/>
			Singlepoint
		</label>
		<label class="flex items-center">
			<input
				type="radio"
				name="calculationMode"
				value="2"
				bind:group={calculationMode}
				class="mr-2"
			/>
			Geomopt
		</label>
		<label class="flex items-center">
			<input
				type="radio"
				name="calculationMode"
				value="0"
				bind:group={calculationMode}
				class="mr-2"
			/>
			None
		</label>
	</div>
	{#if calculationMode == 1}
		<Singlepoint {data} bind:fileContent bind:selectedDataStructure />
	{:else if calculationMode == 2}
		<Geomopt {data} bind:fileContent bind:selectedDataStructure />
	{/if}
</div>
<TestWeas height={500} {fileContent} {fileFormat} />
<ThreeDmol height={500} givenFile={fileContent} givenFormat={fileFormat} example={false} />
<!-- <Weas height={800} givenFile={fileContent} givenFormat={fileFormat} example={false} /> -->
