const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    entry: {
        test: './tests/app/**/*.test.ts*'
    },
    output: {
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('testing')
            }
        })
    ],
    devServer: {
        historyApiFallback: {
            index: '/'
        },
    }
});