<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import NglViewer from '$lib/components/NglViewer.svelte';

	// Example XYZ file content
	// const exampleXYZ = `
	// 3
	// Example XYZ file
	// H 0.0 0.0 0.0
	// O 0.0 0.0 1.0
	// H 1.0 0.0 0.0
	// `;
	const example2 = `
    @<TRIPOS>MOLECULE
    Benzene
    12 12 0 0 0
    SMALL
    USER_CHARGES

    @<TRIPOS>ATOM
    1 C1 0.0000 1.3952 0.0000 C.ar 1 BENZENE 0.000
    2 C2 1.2083 0.6976 0.0000 C.ar 1 BENZENE 0.000
    3 C3 1.2083 -0.6976 0.0000 C.ar 1 BENZENE 0.000
    4 C4 0.0000 -1.3952 0.0000 C.ar 1 BENZENE 0.000
    5 C5 -1.2083 -0.6976 0.0000 C.ar 1 BENZENE 0.000
    6 C6 -1.2083 0.6976 0.0000 C.ar 1 BENZENE 0.000
    7 H1 0.0000 2.4824 0.0000 H 1 BENZENE 0.000
    8 H2 2.1498 1.2412 0.0000 H 1 BENZENE 0.000
    9 H3 2.1498 -1.2412 0.0000 H 1 BENZENE 0.000
    10 H4 0.0000 -2.4824 0.0000 H 1 BENZENE 0.000
    11 H5 -2.1498 -1.2412 0.0000 H 1 BENZENE 0.000
    12 H6 -2.1498 1.2412 0.0000 H 1 BENZENE 0.000

    @<TRIPOS>BOND
    1 1 2 ar
    2 2 3 ar
    3 3 4 ar
    4 4 5 ar
    5 5 6 ar
    6 6 1 ar
    7 1 7 1
    8 2 8 1
    9 3 9 1
    10 4 10 1
    11 5 11 1
    12 6 12 1
    `;
	// const example3 = `
	// data_benzene
	// _symmetry_space_group_name_H-M    'P 1'
	// _cell_length_a                    7.000(1)
	// _cell_length_b                    7.000(1)
	// _cell_length_c                    7.000(1)
	// _cell_angle_alpha                 90
	// _cell_angle_beta                  90
	// _cell_angle_gamma                 90
	// _cell_volume                      343.00
	// _cell_formula_units_Z             1

	// loop_
	// _symmetry_equiv_pos_as_xyz
	// 'x, y, z'

	// loop_
	// _atom_site_label
	// _atom_site_type_symbol
	// _atom_site_fract_x
	// _atom_site_fract_y
	// _atom_site_fract_z
	// _atom_site_U_iso_or_equiv
	// C1   C   0.00000   0.00000   0.00000   0.05
	// C2   C   0.50000   0.00000   0.00000   0.05
	// C3   C   0.50000   0.50000   0.00000   0.05
	// C4   C   0.00000   0.50000   0.00000   0.05
	// C5   C   0.25000   0.25000   0.00000   0.05
	// C6   C   0.75000   0.25000   0.00000   0.05
	// H1   H   0.00000   0.00000   0.50000   0.05
	// H2   H   0.50000   0.00000   0.50000   0.05
	// H3   H   0.50000   0.50000   0.50000   0.05
	// H4   H   0.00000   0.50000   0.50000   0.05
	// H5   H   0.25000   0.25000   0.50000   0.05
	// H6   H   0.75000   0.25000   0.50000   0.05
	// `;
</script>

<PageHeader pageName={'NGL viewer test'} />
<div class="container mx-auto p-4">
	<NglViewer fileContent={example2} />
	<!-- test
	{example2}
	{exampleXYZ} -->
</div>
