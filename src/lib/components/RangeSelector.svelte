<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let maxIndex = 999;
	export let selectedRange = writable(':');
	export let title;

	let startIndex = 0;
	let endIndex = maxIndex;
	let showSelection = false;

	onMount(() => {
		selectedRange.set(':');
	});

	function updateRange() {
		if (startIndex === 0 && endIndex === maxIndex) {
			selectedRange.set(':');
		} else {
			selectedRange.set(`${startIndex}:${endIndex}`);
		}
	}

	function toggleSelection() {
		showSelection = !showSelection;
		if (showSelection) {
			showSelection = false;
			selectedRange.set(':');
		} else {
			showSelection = true;
			updateRange();
		}
	}
</script>

<div class="flex w-52 flex-col">
	{#if title}
		<div class="mb-2 font-semibold">{title}</div>
	{/if}

	<div class="rounded border border-gray-500 p-2">
		<input
			id="toggle"
			type="checkbox"
			bind:checked={showSelection}
			on:change={toggleSelection}
			class="form-checkbox h-5 w-5 text-blue-600"
		/>
		<label for="toggle" class="">Set specific range</label>
	</div>

	{#if showSelection}
		<div class="rounded border border-gray-500 p-2">
			<div class="flex items-center space-x-2">
				<label for="start" class="w-24 text-gray-700">Start Index:</label>
				<input
					id="start"
					type="number"
					min="0"
					max={maxIndex}
					bind:value={startIndex}
					class="w-20 rounded border px-2 py-1"
					on:input={updateRange}
				/>
			</div>
			<div class="flex items-center space-x-2">
				<label for="end" class="w-24 text-gray-700">End Index:</label>
				<input
					id="end"
					type="number"
					min="0"
					max={maxIndex}
					bind:value={endIndex}
					class="w-20 rounded border px-2 py-1"
					on:input={updateRange}
				/>
			</div>
		</div>
	{/if}
</div>
