import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([{
	files: [
		"**/*.{js,mjs,cjs,jsx}",
	],
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			}
		},
		globals: {
			...globals.browser,
			...globals.es2021,
			...globals.node,
		},
	},
	rules: {
		...js.configs.recommended.rules,

		"no-unused-vars": "warn",
		"no-console": "warn",
		indent: ["error", 2, { SwitchCase: 1 }],
		semi: [2, "always"],
		"space-before-function-paren": ["error", {
			anonymous: "never",
			named: "never",
			asyncArrow: "always",
		}],
		quotes: ["error", "double", { allowTemplateLiterals: true }],
		"comma-dangle": ["error", {
			arrays: "always-multiline",
			objects: "always-multiline",
		}],
	},
	ignores: [
		"node_modules/**",
		"build/**",
		"dist/**",
		"*.min.js",
		"*.config.js",
	],
}]);
