<script>
	/** @type {string[]} */
	export let items;
	/** @type {string} */
	export let title = '';
	/** @type {string} */
	export let selected = items.length > 0 ? items[0] : '';

	function handleChange(event) {
		selected = event.target.value;
	}
</script>

<div class="flex flex-col">
	{#if title}
		<label for="dropdown" class="font-semibold">{title}</label>
	{/if}
	{#if items.length > 0}
		<select id="dropdown" bind:value={selected} on:change={handleChange} class="rounded border">
			{#each items as item}
				<option value={item}>{item}</option>
			{/each}
		</select>
	{:else}
		<select id="dropdown" class="rounded border border-gray-200 bg-gray-100 text-gray-400">
			<option>{'No files found'}</option>
		</select>
	{/if}
</div>
