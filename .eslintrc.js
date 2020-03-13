module.exports = {
  'extends': 'airbnb-base',
  'env': {
    'node': true,
    'mocha': true,
    'es6': true
  },
  'parserOptions': {
    'ecmaVersion': 8,
    'sourceType': 'script',
  },
  'globals': {
    'appHelpers': true,
  },
  'rules': {
    'no-trailing-spaces': 'off',
    'func-names': 'off',
    'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never' }],
    'padded-blocks': 'off',
    'prefer-destructuring': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'no-unused-vars': ['error', { 'args': 'none' }],
    'no-use-before-define': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-arrow-callback': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'warn',
    'import/newline-after-import': 'off',
    'arrow-body-style': 'off',
    'strict': 'off',
    'spaced-comment': 'off',
    'comma-dangle': 'off',
    'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
    'max-len': ['error', { 'code': 120, 'ignoreComments': true }],
    'no-shadow': 'warn',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'warn',
    'no-else-return': 'warn',
    'object-shorthand': 'warn',

  },
  'overrides': [
    {
      'files': ['**/*.spec.js', '**/*.test.js'],
      'rules': {
        'no-unused-expressions': 'off',
        'no-underscore-dangle': 'off',
      }
    }
  ]

};