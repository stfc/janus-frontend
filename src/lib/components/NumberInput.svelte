<script>
	/** @type {number} */
	export let selectedValue;
	/** @type {string} */
	export let title;
	export let stepValue = 0.1;
</script>

<label for={title} class="w-30 text-gray-700">{title} value:</label>
<input
	id={title}
	type="number"
	min="0"
	max={99}
	step={stepValue}
	bind:value={selectedValue}
	class="w-20 rounded border px-2 py-1"
/>
