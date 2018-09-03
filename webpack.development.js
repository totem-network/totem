const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        publicPath: '/'
    },
    plugins: [
        new BundleAnalyzerPlugin({
            openAnalyzer: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
    devServer: {
        historyApiFallback: {
            index: '/'
        },
        host: '0.0.0.0',
        hot: true
    }
});