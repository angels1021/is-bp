export default {
  cacheDirectory: true,
  babelrc: false,
  presets: [
    [
      'latest',
      {
        es2015: {
          modules: false
        }
      }
    ],
    'react',
    'stage-3'
  ],
  plugins: [
    'transform-object-rest-spread',
    'syntax-dynamic-import'
  ],
  env: {
    production: {
      only: [
        'src'
      ],
      plugins: [
        'transform-react-remove-prop-types',
        'transform-react-constant-elements',
        'transform-react-inline-elements'
      ]
    },
    development: {
      presets: ['react-hmre']
    }
  }
};
