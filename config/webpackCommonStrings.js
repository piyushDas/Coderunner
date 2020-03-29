module.exports = {
  presetArray: [
    ['@babel/env', { modules: false, loose: true }],
    [
      '@babel/preset-react',
      {
        useBuiltIns: 'usage'
      }
    ]
  ],
  commonRunTimePlugin: [
    'sitrep',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ]
  ],
  commonPlugin: [
    'transform-es2015-arrow-functions',
    'jsx-control-statements',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-transform-react-inline-elements'
  ]
}
