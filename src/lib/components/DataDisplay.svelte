<script>
	/** @type {*} */
	export let data;
	const headings = Object.keys(data);
</script>

<div class="mb-10 block w-auto rounded-b-xl p-5 text-left">
	<div>
		{#each headings as header}
			{@const val = data[header]}
			<div class="flex p-1 align-top">
				<div class="mr-2 font-bold">{header}:</div>
				<div class="break-all">
					{#if Array.isArray(val)}
						{#each val as item}
							<span class="mr-2 inline-block rounded bg-blue-200 px-4 py-2 text-black">
								<p>{item}</p>
							</span>
						{/each}
					{:else if val === true || val === 'pass' || val === 'true'}
						<span class="inline-block rounded bg-green-400 px-4 py-2 text-white">
							{data[header]}
						</span>
					{:else if val === false || val === 'fail' || val === 'false'}
						<span class="inline-block rounded bg-red-400 px-4 py-2 text-white">
							{data[header]}
						</span>
					{:else}
						<span class="inline-block rounded bg-blue-300 px-4 py-2 text-black">
							{data[header]}
						</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
