<script>
	/** @type {string[]} */
	export let items;
	/** @type {string} */
	export let title = '';
	/** @type {string[]} */
	export let selected = items.slice(); // Initialize with all items

	function handleCheckboxChange(event) {
		const value = event.target.value;
		if (event.target.checked) {
			selected = [...selected, value];
		} else {
			selected = selected.filter((item) => item !== value);
		}
	}
</script>

<div class="flex w-48 flex-col">
	{#if title}
		<div class="font-semibold">{title}</div>
	{/if}
	<div class="rounded border border-gray-500 p-2">
		{#if items.length > 0}
			{#each items as item}
				<label class="flex items-center space-x-2">
					<input
						type="checkbox"
						value={item}
						on:change={handleCheckboxChange}
						checked={selected.includes(item)}
					/>
					<span>{item}</span>
				</label>
			{/each}
		{:else}
			<p class="text-gray-400">{'No items found'}</p>
		{/if}
	</div>
</div>
