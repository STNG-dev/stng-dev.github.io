module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended"
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
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
		'node_modules/',
		'build/',
		'*.min.js',
		'.config.js',
	]
};
