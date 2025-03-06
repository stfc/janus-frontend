<script>
	export let pageName;
</script>

<div class="flex">
	<header
		class="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-blue-800 px-4 py-2"
	>
		<span class="self-center whitespace-nowrap text-3xl font-semibold text-white">{pageName}</span>
		<nav class="flex space-x-4">
			<a href="/" class="text-white hover:text-gray-300">Home</a>
			<a href="/singlepoint" class="text-white hover:text-gray-300">Singlepoint</a>
			<a href="/geomopt" class="text-white hover:text-gray-300">Geomopt</a>
			<a href="/threeDmol.js" class="text-white hover:text-gray-300">3Dmol.js test</a>
			<a href="/jsmolViewer" class="text-white hover:text-gray-300">JSmolViewer test</a>
			<a href="/weas" class="text-white hover:text-gray-300">Weas widget test</a>
			<a href="/comparison" class="text-white hover:text-gray-300">Comparison test</a>
			<a href="/testHome" class="text-white hover:text-gray-300">Test home</a>
		</nav>
	</header>
</div>
