const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const config = {
    entry: {
        app: [
            '@babel/polyfill',
            './src/index.ts'
        ],
        update: [
            '@babel/polyfill',
            './src/update.ts'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            }
        ]
    },
    node: {
        fs: 'empty',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.browser': 'true'
        }),
        new HtmlWebpackPlugin({
            chunks: ['app'],
            template: 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['update'],
            filename: 'update.html',
            template: 'src/update.html'
        }),
        new InjectManifest({
            importWorkboxFrom: 'local',
            swSrc: './src/service-worker.js',
            include: /\.(html|js|svg)$/
        })
    ]
};

module.exports = config;
