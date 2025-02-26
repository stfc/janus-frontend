<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import JSmolViewer from '$lib/components/JsmolViewer.svelte';
</script>

<PageHeader pageName={'JSmol Viewer test'} />
<div class="container mx-auto p-4">
	<JSmolViewer height={800} />
</div>
