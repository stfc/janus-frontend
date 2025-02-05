<script>
	import DataDisplay from '$lib/components/DataDisplay.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';

	const radiusDict = { stick: 0.1, sphere: 0.2, line: 1, cross: 1, cartoon: 1 };
	const keys = Object.keys(radiusDict);
</script>

<PageHeader pageName={'Geomopt'} />
<div class="space-x-2 p-4">
	{#each keys as item}
		<NumberInput bind:selectedValue={radiusDict[item]} title={item} />
	{/each}
</div>
<DataDisplay data={radiusDict} />
