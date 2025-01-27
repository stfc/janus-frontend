<script>
	export let size = 36;
	export let color = '#09f';
	$: document.documentElement.style.setProperty('--size', `${size}px`);
	$: document.documentElement.style.setProperty('--color', color);
</script>

<div class="spinner"></div>

<style>
	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		border-left-color: var(--color, #09f);
		animation: spin 1s ease infinite;
		width: var(--size, 36px);
		height: var(--size, 36px);
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
