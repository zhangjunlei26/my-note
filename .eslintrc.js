var IGNORE = 0, WARN = 1, ERROR = 2, MAX_PARAMS = 4

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    'pt': false,
    'TGP': false,
    'window': false,
    'pgvMain': false,
    'location': false,
    'document': false,
    'BJ_REPORT': false,
    'pgvSendClick': false,
    '__API_HOST__': false,
    '__ASSETS_PUBLIC_PATH__': false
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'no-plusplus': IGNORE,
    'no-param-reassign': [ERROR, { 'props': false }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : IGNORE,
    // don't require .vue extension when importing
    'import/extensions': [ERROR, 'always', {
      'js': 'never',
      'vue': 'never',
      'css': 'never',
      'json': 'never'
    }],
  }
}
