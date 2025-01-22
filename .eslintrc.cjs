/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		eqeqeq: 'error',
		camelcase: ['warn', { properties: 'never' }],
		'no-else-return': 'error',
		'no-empty-function': 'error',
		'no-nested-ternary': 'error',
		'no-param-reassign': 'warn',
		'no-unneeded-ternary': 'error',
		'no-useless-return': 'warn',
		'no-var': 'error',
		'no-shadow': 'warn',
		'prefer-const': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'require-await': 'error',
		yoda: 'error',
		'svelte/no-inner-declarations': 'off'
	}
};
