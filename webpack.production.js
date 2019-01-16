const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // TODO: prepack not working
        new PrepackWebpackPlugin({
            test: /\.(js)/
        }),
        /*new BrotliPlugin({
            test: /\.(js|svg)/,
            asset: '[path].br[query]'
        }),
        new CompressionPlugin({
            test: /\.(js|svg)/,
            asset: '[path].gz[query]'
        })*/
        new CompressionPlugin({
            test: /\.(js|svg)/,
            asset: '[path][query]'
        })
    ]
});