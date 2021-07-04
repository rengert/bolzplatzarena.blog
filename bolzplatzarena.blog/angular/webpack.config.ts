import * as webpack from 'webpack';

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

export default {
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['de'],
    })],
} as webpack.Configuration;
