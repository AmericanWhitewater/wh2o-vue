module.exports = {
  root: true,

  env: {
    node: true,
    jest: true,
  },

  rules: {
    "no-console": 2,
    "no-debugger": 2,

    "vue/attributes-order": 2,
    "vue/eqeqeq": 2,
    "vue/html-self-closing": 1,
    "vue/match-component-file-name": 1,
    "vue/no-boolean-default": "off",
    "vue/no-restricted-syntax": 2,
    "vue/no-side-effects-in-computed-properties": 1,
    "vue/no-use-v-if-with-v-for": 2,
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-direct-export": 2,
    "vue/require-prop-type-constructor": 2,
    "vue/require-prop-types": 2,
    "vue/require-render-return": 2,
    "vue/require-v-for-key": 2,
    "vue/return-in-computed-property": 2,
    "vue/this-in-template": 2,
    "vue/use-v-on-exact": 1,
    "vue/custom-event-name-casing": 0,
    "vue/v-on-style": 2,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/camelcase": 0,
    "vue/valid-template-root": 2,
    "vue/valid-v-for": 2,
    "no-new": "off",
    "vue/name-property-casing": [2, "kebab-case"],
    camelcase: "off",
    radix: "off",
    "vue/order-in-components": [
      2,
      {
        order: [
          "el",
          "name",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "fetch",
          "asyncData",
          "data",
          "computed",
          "watch",
          "methods",
          "LIFECYCLE_HOOKS",
          "head",
          ["template", "render"],
          "renderError",
        ],
      },
    ],
    "vue/component-tags-order": [
      2,
      {
        order: ["template", "script", "style"],
      },
    ],
  },

  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],

  extends: [
    "plugin:vue/essential",
    "plugin:@typescript-eslint/recommended",
    "@vue/typescript/recommended",
  ],
};
