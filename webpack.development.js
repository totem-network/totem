const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    watchOptions: {
        ignored: /node_modules/
    },
    resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom'
        }
    },
    devServer: {
        historyApiFallback: {
            index: '/'
        },
        host: '0.0.0.0',
        hot: true
    }
});