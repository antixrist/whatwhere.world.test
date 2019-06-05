module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  rules: {
    semi: [2, 'always'],
    'comma-dangle': [2, {
      arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'only-multiline',
      exports: 'only-multiline',
      functions: 'only-multiline',
    }],
    'nuxt/no-cjs-in-config': 0,
    'vue/name-property-casing': [2, 'kebab-case'],
  }
};
