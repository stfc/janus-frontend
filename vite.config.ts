import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
	if (command === 'serve') {
		const env = loadEnv(mode, process.cwd(), '');
		return {
			plugins: [sveltekit()],
			server: {
				host: env.HOST,
				port: parseInt(env.PORT),
				proxy: {
					'/api': {
						target: env.API_URL,
						changeOrigin: true,
						rewrite: (path) => path.replace(/^\/api/, ''),
					},
				},
			},
		};
	}
	return {
		plugins: [sveltekit()],
	};
});