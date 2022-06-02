'use strict';

module.exports = {
  plugins: [
    [
      require('./scripts/error-codes/transform-error-messages'),
      {noMinify: true},
    ],
    // ["module-resolver", {
    //   "alias": {
    //     "yjs": "./node_modules/yjs",
    //   }
    // }]
    // [ "babel-plugin-webpack-alias", { "config": "./webpack.config.js" } ]

  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
};
