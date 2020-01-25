module.exports = {
  root: true,

  env: {
    node: true,
    jest: true
  },

  rules: {
    "no-console": 2,
    "vue/attributes-order": 2,
    "vue/no-confusing-v-for-v-if": 2,
    "vue/order-in-components": 2,
    "vue/this-in-template": 2,
    "vue/eqeqeq": 2,
    "vue/no-deprecated-scope-attribute": 1,
    "vue/no-empty-pattern": 1,
    "vue/require-direct-export": 1,
    camelcase: "off",
    "vue/prop-name-casing": 2,
    "vue/no-v-html": "off",
    "vue/name-property-casing": [2, "kebab-case"],
    "vue/match-component-file-name": 2
  },

  parserOptions: {
    parser: "babel-eslint"
  },

  globals: {
    app: true,
    path: true
  },

  extends: ["plugin:vue/strongly-recommended", "@vue/prettier"]
};
