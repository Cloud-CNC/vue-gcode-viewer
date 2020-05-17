/**
 * @fileoverview Vue CLI config
 */

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.gcode$/i,
          use: 'raw-loader',
        }
      ]
    }
  }
};