const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        nodeEnv: 'production',
    },
    plugins: [
        new BrotliPlugin({
            test: /\.(js|svg)/,
            exclude: /\.(map)/, // TODO: BrotliPlugin does not use excludes
            filename: '[path].br[query]'
        }),
        new CompressionPlugin({
            test: /\.(js|svg)/,
            exclude: /\.(map)/,
            filename: '[path].gz[query]'
        })
    ]
});