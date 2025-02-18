<script>
	import { onMount } from 'svelte';
	/* global Jmol */

	export let xyzData;

	let viewerDiv;
	const appletId = 'jsmolApplet';

	onMount(() => {
		const checkJmolLoaded = () => {
			if (typeof Jmol === 'undefined') {
				console.error('JSmol library not loaded.');
				return;
			}

			const Info = {
				addSelectionOptions: false,
				use: 'HTML5',
				color: 'white',
				width: '80%',
				height: '80%',
				debug: false,
				j2sPath: '/src/lib/jsmol/j2s',
				script: `
					load DATA "modelXYZ"
					${xyzData}
					END "modelXYZ"
				`
			};

			// Create the JSmol applet and insert it into the viewerDiv
			viewerDiv.innerHTML = Jmol.getAppletHtml(appletId, Info);
			Jmol.getApplet(appletId, Info);
		};

		// Check if JSmol is loaded
		if (typeof Jmol === 'undefined') {
			const script = document.createElement('script');
			script.src = '/src/lib/jsmol/JSmol.min.js';
			script.onload = checkJmolLoaded;
			document.head.appendChild(script);
		} else {
			checkJmolLoaded();
		}
	});
</script>

<svelte:head>
	<script src="/src/lib/jsmol/JSmol.min.js"></script>
</svelte:head>

<div class="flex h-screen w-full items-center justify-center">
	<div bind:this={viewerDiv} class="h-full w-full flex-1">
		<!-- JSmol applet will be injected here -->
	</div>
</div>
