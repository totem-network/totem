const gulp = require('gulp');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const webpackConfig = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|tests)/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|tests)/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            },
            {
                test: /\.test.tsx?$/,
                exclude: /(node_modules)/,
                use: ['babel-loader', 'ts-loader']
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
    resolve: {
        alias: {
            '3box': path.resolve('./node_modules/3box/dist/3box.min.js'),
            'ipfs': path.resolve('./node_modules/ipfs/dist/index.min.js'),
        },
        aliasFields: ['browser'],
        extensions: ['.mjs', '.ts', '.tsx', '.js', '.json'],
        mainFields: ['browser', 'module', 'main'],
        modules: [
            path.resolve('./app/src'),
            path.resolve('./app/assets'),
            path.resolve('./build/contracts'),
            path.resolve('./node_modules')
        ],
        plugins: [
            new TsconfigPathsPlugin({})
        ]
    },
};

gulp.task('test', function() {
    
});

gulp.task('test:integration', function() {
    return gulp.src('tests/app/integration/**/*.test.ts*')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('tests/build'))
        .pipe(mocha({
            require: [
                'jsdom-global/register'
            ]
        }))
        .once('error', err => {
            console.error(err);
            process.exit(1);
        });
});

gulp.task('test:unit', function() {
    return gulp.src('tests/app/unit/**/*.test.ts*')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('tests/build'))
        .pipe(mocha({
            require: [
                'jsdom-global/register'
            ]
        }))
        .once('error', err => {
            console.error(err);
            process.exit(1);
        });
});