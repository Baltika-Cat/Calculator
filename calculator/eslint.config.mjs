import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import reactRefresh from "eslint-plugin-react-refresh";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:prettier/recommended",
    "prettier",
)), {
    plugins: {
        "react-refresh": reactRefresh,
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        "unused-imports": unusedImports,
        "simple-import-sort": simpleImportSort,
        prettier: fixupPluginRules(prettier),
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
                modules: true,
                experimentalObjectRestSpread: true,
            },

            project: ["./tsconfig.json", "./tsconfig.eslint.json", "tsconfig.node.json"],
            tsconfigRootDir: "C:\\Users\\Base\\Desktop\\Pet-projects\\Calculator\\calculator",
        },
    },

    rules: {
        "react-refresh/only-export-components": ["warn", {
            allowConstantExport: true,
        }],

        "react/jsx-props-no-spreading": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",

        "react/function-component-definition": ["error", {
            namedComponents: ["function-declaration", "function-expression", "arrow-function"],
            unnamedComponents: ["function-expression", "arrow-function"],
        }],

        "no-var": "error",
        "no-multi-spaces": "error",
        "space-in-parens": "error",
        "no-multiple-empty-lines": "error",
        "prefer-const": "error",
        "no-use-before-define": "error",
        "no-console": "off",
        "prettier/prettier": "error",
        "import/prefer-default-export": "off",
        "import/extensions": "off",
        "max-line-per-function": "off",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "unused-imports/no-unused-imports": 1,
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-var-requires": 2,
        "implicit-arrow-linebreak": ["error", "below"],
        "@typescript-eslint/lines-between-class-members": "off",
        "@typescript-eslint/no-throw-literal": "off",
        "@typescript-eslint/array-type": ["error", {
            default: "array",
        }],

        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",

        "@typescript-eslint/explicit-member-accessibility": ["error", {
            overrides: {
                accessors: "explicit",
                constructors: "no-public",
                properties: "explicit",
                methods: "explicit",
                parameterProperties: "explicit",
            },
        }],

        "@typescript-eslint/no-misused-promises": [2, {
            checksVoidReturn: {
                attributes: false,
            },
        }],

        "@typescript-eslint/no-floating-promises": "off",
    },
}, {
    files: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],

    ignores: ['dist', 'eslint.config.mjs', '.eslintrc.cjs', 'vite.config.ts'],

    languageOptions: {
        globals: {
            ...globals.node,
        },
    },
}];