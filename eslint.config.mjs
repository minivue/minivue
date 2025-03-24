// @ts-check
import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

export default typescriptEslint.config(
  { ignores: ['*.d.ts', '**/coverage', '**/dist', '**/.nuxt'] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.strict,
      ...typescriptEslint.configs.stylistic,
      ...eslintPluginVue.configs['flat/strongly-recommended'],
    ],
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/prefer-import-from-vue': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/v-on-event-hyphenation': 'off',
      'vue/no-deprecated-slot-attribute': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/prefer-literal-enum-member': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  eslintConfigPrettier,
)
