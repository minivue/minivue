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
    'font-family-no-missing-generic-family-keyword': null,
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        /** This option will resolve nested selectors with & interpolation. - https://stylelint.io/user-guide/rules/selector-class-pattern/#resolvenestedselectors-true--false-default-false */
        resolveNestedSelectors: true,
        /** Custom message */
        message: function expected(selectorValue) {
          return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`
        },
      },
    ],
  },
}
