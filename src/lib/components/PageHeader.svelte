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
			<a href="/test" class="text-white hover:text-gray-300">Test</a>
		</nav>
	</header>
</div>
