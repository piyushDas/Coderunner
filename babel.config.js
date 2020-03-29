module.exports = {
  "presets": [
    [
      "@babel/env",
      {
        "modules": false,
        "loose": true
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "sitrep",
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ],
    "@babel/plugin-transform-arrow-functions",
    "jsx-control-statements",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    "@babel/plugin-syntax-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "babel-plugin-transform-class-properties",
    "@babel/plugin-transform-react-inline-elements"
  ]
};