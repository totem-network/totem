const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkerPlugin = require('worker-plugin');

const config = {
    entry: {
        app: [
            'core-js/stable',
            'regenerator-runtime/runtime',
            'react-hot-loader/patch',
            './app/src/index.tsx'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build/app'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000
                        }
                    },
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: 'file-loader?name=./fonts/[name].[ext]'
            }
        ]
    },
    node: {
        Buffer: true,
        fs: 'empty',
        child_process: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true
    },
    plugins: [
        new WorkerPlugin(),
        new webpack.DefinePlugin({
            'process.browser': 'true'
        }),
        new HtmlWebpackPlugin({
            template: 'app/src/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'app/assets/images',
                to: 'images'
            },
            {
                from: 'node_modules/cryptocurrency-icons/svg/icon',
                to: 'images/cryptocurrency-icons'
            },
            {
                from: 'node_modules/@browser-logos',
                to: 'images/browser-logos'
            },
            {
                from: 'app/assets/fonts',
                to: 'fonts'
            },
            {
                from: 'app/assets/apps',
                to: 'apps'
            },
            {
                from: 'app/assets/manifest.json'
            },
            {
                from: 'app/assets/browserconfig.xml'
            }
        ]),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new InjectManifest({
            swSrc: './app/src/service-worker.js',
            include: [
                /\.(html|js|svg)$/
            ]
        })
    ],
    resolve: {
        alias: {
            /*'react': 'preact/compat',
            'react-dom': 'preact/compat'*/
        },
        aliasFields: ['browser'],
        extensions: ['.mjs', '.ts', '.tsx', '.js', '.json'],
        mainFields: ['browser', 'module', 'main'],
        plugins: [
            new TsconfigPathsPlugin({})
        ]
    },
    target: 'web'
};

module.exports = config;
