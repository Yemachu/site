module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
		ecmaVersion: 6,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		}
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			typescript: {},
		},
		react: {
			version: "detect",
		},
	},
	plugins: [
		"react",
		"@typescript-eslint",
	],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:@typescript-eslint/recommended",
	],
	rules: {
		"no-unused-expressions": ["error"],
		"no-unused-vars":        ["error"],
		"quotes":                ["warn", "double"],
		"@typescript-eslint/explicit-function-return-type": ["error", {
			allowExpressions: true,
		}],
	}
};
