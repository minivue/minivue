/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-standard',
    'stylelint-config-standard-vue',
    'stylelint-config-recess-order',
  ],
  overrides: [
    {
      files: ['*.vue', '*.css'],
    },
  ],
  rules: {
    'selector-type-no-unknown': null,
    'color-function-notation': null,
    'import-notation': null,
  },
}
