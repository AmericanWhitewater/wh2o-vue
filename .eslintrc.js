module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    "no-console": 0,
    "vue/attributes-order": 1,
    "vue/no-confusing-v-for-v-if": "error",
    "vue/order-in-components": "error",
    "vue/this-in-template": "error",
    "vue/eqeqeq": 1,
    "vue/no-deprecated-scope-attribute": 1,
    "vue/no-empty-pattern": 1,
    "vue/require-direct-export": 1,
    camelcase: "off"
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
