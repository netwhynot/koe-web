module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double", { avoidEscape: true }],
    "vue/multi-word-component-names": "off",
  },
};
