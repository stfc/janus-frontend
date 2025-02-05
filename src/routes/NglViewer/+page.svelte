<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import NglViewer from '$lib/components/NglViewer.svelte';

	// Example XYZ file content
	const exampleXYZ = `
    3
    Example XYZ file
    H 0.0 0.0 0.0
    O 0.0 0.0 1.0
    H 1.0 0.0 0.0
    `;
	const example2 = `
    @<TRIPOS>MOLECULE
    Converted from extxyz
    8 7 0 0 0
    SMALL
    USER_CHARGES
    @<TRIPOS>ATOM
    1 Na 0.00124690 0.00391954 0.00297262 Na 1 UNL 0.000
    2 Cl 2.82041775 -0.00059359 -0.00108448 Cl 1 UNL 0.000
    3 Na 0.00180732 2.82298136 2.82316615 Na 1 UNL 0.000
    4 Cl 2.81860026 2.81853489 2.82005323 Cl 1 UNL 0.000
    5 Na 2.82071352 0.00814158 2.81856713 Na 1 UNL 0.000
    6 Cl -0.00211419 -0.00357673 2.81844051 Cl 1 UNL 0.000
    7 Na 2.82204155 2.81429554 0.00116447 Na 1 UNL 0.000
    8 Cl -0.00065740 2.81958913 -0.00121527 Cl 1 UNL 0.000
    @<TRIPOS>BOND
    1 1 2 1
    2 3 4 1
    3 5 6 1
    4 7 8 1
    5 1 3 1
    6 2 4 1
    7 5 7 1
    `;
</script>

<PageHeader pageName={'NGL viewer test'} />
<div class="p-4">
	<h1 class="mb-4 text-2xl font-bold">NGL Viewer</h1>
	<NglViewer fileContent={example2} />
	test
	{example2}
	{exampleXYZ}
</div>
