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
	  Lattice="5.64 0.0 0.0 0.0 5.64 0.0 0.0 0.0 5.64" Properties=species:S:1:pos:R:3:mace_mp_forces:R:3:forces:R:3 units="_JSON {"forces": "ev/Ang", "energy": "eV", "stress": "ev/Ang^3"}" model_path=small arch=mace_mp mace_mp_energy=-27.034896907052207 mace_mp_stress="-0.004784496229505566 -0.004793411819987584 -0.004785591734839915 7.029541832701609e-07 3.548069351258103e-07 6.575684530072299e-07" system_name=NaCl-traj energy=-27.034896907052207 free_energy=-27.034896907052207 stress="-0.004784496229505566 6.575684530072299e-07 3.548069351258103e-07 6.575684530072299e-07 -0.004793411819987584 7.029541832701609e-07 3.548069351258103e-07 7.029541832701609e-07 -0.004785591734839915" pbc="T T T"
	  Na 0.00124690 0.00391954 0.00297262
	  Cl 2.82041775 -0.00059359 -0.00108448
	  Na 0.00180732 2.82298136 2.82316615
	  Cl 2.81860026 2.81853489 2.82005323
	  Na 2.82071352 0.00814158 2.81856713
	  Cl -0.00211419 -0.00357673 2.81844051
	  Na 2.82204155 2.81429554 0.00116447
	  Cl -0.00065740 2.81958913 -0.00121527
	`;
	const example3 = `
	  ATOM      1  Lattice="5.64  UNK     1       0.000   0.000   0.000  1.00  0.00           Lattice="5.64
	  ATOM      2  Na  UNK     1       0.001   0.004   0.003  1.00  0.00           Na
	  ATOM      3  Cl  UNK     1       2.820  -0.001  -0.001  1.00  0.00           Cl
	  ATOM      4  Na  UNK     1       0.002   2.823   2.823  1.00  0.00           Na
	  ATOM      5  Cl  UNK     1       2.819   2.819   2.820  1.00  0.00           Cl
	  ATOM      6  Na  UNK     1       2.821   0.008   2.819  1.00  0.00           Na
	  ATOM      7  Cl  UNK     1      -0.002  -0.004   2.818  1.00  0.00           Cl
	  ATOM      8  Na  UNK     1       2.822   2.814   0.001  1.00  0.00           Na
	  ATOM      9  Cl  UNK     1      -0.001   2.820  -0.001  1.00  0.00           Cl
	`;
</script>

<PageHeader pageName={'3Dmol.js test'} />
<div class="p-4">
	<h1 class="mb-4 text-2xl font-bold">3Dmol.js Viewer</h1>
	<Visualiser fileContent={example3} fileType="pdb" />
	test
	{example2}
	{exampleXYZ}
</div>
