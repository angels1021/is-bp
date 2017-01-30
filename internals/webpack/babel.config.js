export default {
  "cacheDirectory": true,
  "babelrc": false,
  "presets": [
    [
      "latest",
      {
        "es2015": {
          "modules": false
        }
      }
    ],
    "react",
    "stage-3",
    "react-hmre"
  ],
  "plugins": [
    "transform-object-rest-spread"
  ],
  "env": {
    "production": {
      "only": [
        "app"
      ],
      "plugins": [
        "transform-react-remove-prop-types",
        "transform-react-constant-elements",
        "transform-react-inline-elements"
      ]
    }
  }
}
