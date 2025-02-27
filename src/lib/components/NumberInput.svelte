<script>
	/** @type {number} */
	export let selectedValue;
	/** @type {string} */
	export let title;
	export let stepValue = 0.1;
	export let max = 999;
</script>

<div class="flex flex-col p-2">
	<label for={title} class="w-30 font-semibold text-gray-700">{title} value:</label>
	<input
		id={title}
		type="number"
		min="0"
		{max}
		step={stepValue}
		bind:value={selectedValue}
		class="w-20 rounded border px-2 py-1"
	/>
</div>
