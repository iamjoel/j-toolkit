module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'max-params': {
      max: 3
    },
    'max-len': {
      code: 80
    }
  },
  ignorePatterns: [
    'node_modules',
    'env.d.ts',
    '**/*.js'
  ]
}
