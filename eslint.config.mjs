import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	{
		ignores: [
			'**/node_modules',
			'build',
			'.svelte-kit',
			'package',
			'**/.env',
			'**/.env.*',
			'!**/.env.example',
			'**/pnpm-lock.yaml',
			'**/package-lock.json',
			'**/yarn.lock'
		]
	},
	...compat.extends('eslint:recommended', 'plugin:svelte/recommended', 'prettier'),
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},

			ecmaVersion: 2020,
			sourceType: 'module',

			parserOptions: {
				extraFileExtensions: ['.svelte']
			}
		},

		rules: {
			eqeqeq: 'error',

			camelcase: [
				'warn',
				{
					properties: 'never'
				}
			],

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
	}
];
