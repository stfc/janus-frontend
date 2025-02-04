<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Visualiser from '$lib/components/Visualiser.svelte';

	// Example XYZ file content
	const exampleXYZ = `
    3
    Example XYZ file
    H 0.0 0.0 0.0
    O 0.0 0.0 1.0
    H 1.0 0.0 0.0
    `;
	const example2 = `
    8
    Example 2
    Na 0.00000000 0.00000000 0.00000000
    Cl 2.82000000 0.00000000 0.00000000
    Na 0.00000000 2.82000000 2.82000000
    Cl 2.82000000 2.82000000 2.82000000
    Na 2.82000000 0.00000000 2.82000000
    Cl 0.00000000 0.00000000 2.82000000
    Na 2.82000000 2.82000000 0.00000000
    Cl 0.00000000 2.82000000 0.00000000
    `;
</script>

<PageHeader pageName={'Geomopt'} />
<div class="p-4">
	<h1 class="mb-4 text-2xl font-bold">3Dmol.js Viewer</h1>
	<Visualiser fileContent={exampleXYZ} />
	test
	{example2}
</div>
