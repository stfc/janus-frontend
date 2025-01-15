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

<div class="flex flex-col w-48">
  {#if title}
    <label for="dropdown" class="mb-2 font-semibold">{title}</label>
  {/if}
  <select id="dropdown" bind:value={selected} on:change={handleChange} class="p-2 border rounded">
    {#each items as item}
      <option value={item}>{item}</option>
    {/each}
  </select>
</div>