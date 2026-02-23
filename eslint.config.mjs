import { defineConfig, globalIgnores } from "eslint/config"
import reactPlugin from "eslint-plugin-react"
import nextTs from "eslint-config-next/typescript"
import nextVitals from "eslint-config-next/core-web-vitals"
import eslintPluginStylistic from "@stylistic/eslint-plugin"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

const importLintingConfig = defineConfig([
  {
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "type",
            "builtin",
            "object",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "@/*",
              group: "external",
              position: "after",
            },
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
])

const languageLintingConfig = defineConfig([
  eslintPluginStylistic.configs.recommended,
  {
    rules: {
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "*", next: ["return", "export"] },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
    },
  },
])

const nextLintingConfig = defineConfig([
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
])

const reactLintingConfig = defineConfig([
  {
    files: ["**/*.{tsx,jsx}"],
    plugins: { react: reactPlugin },
    settings: { react: { version: "detect" } },
    rules: {
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
    },
  },
])

const prettierLintingConfig = defineConfig([
  {
    files: ["**/*.{ts,tsx,js,mjs,cjs}"],
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      "prettier/prettier": [
        "warn",
        {
          semi: false,
          singleQuote: false,
          printWidth: 100,
          trailingComma: "all",
          tabWidth: 2,
          arrowParens: "always",
          bracketSpacing: true,
          endOfLine: "auto",
          plugins: ["prettier-plugin-tailwindcss"],
        },
      ],
    },
  },
])

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...nextLintingConfig,
  ...reactLintingConfig,
  ...importLintingConfig,
  ...languageLintingConfig,
  ...prettierLintingConfig,
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
])

export default eslintConfig
