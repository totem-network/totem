const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CompressionPlugin({
            test: /\.(js|svg)/,
            asset: '[path].gz[query]'
        })
    ]
});