const gulp = require('gulp');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const path = require('path');

gulp.task('test', function() {
    
});

gulp.task('test:integration', function() {
    return gulp.src('test/app/integration/**/*.test.ts*')
        .pipe(webpack({
            module: {
                exprContextCritical: false,
                rules: [
                    {
                        test: /\.tsx?$/,
                        exclude: /(node_modules|test)/,
                        use: ['babel-loader', 'ts-loader']
                    },
                    {
                        test: /\.test.tsx?$/,
                        exclude: /(node_modules)/,
                        use: ['babel-loader', 'ts-loader']
                    }
                ]
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js'],
                modules: [
                    path.resolve('./app/src'),
                    path.resolve('./app/assets'),
                    path.resolve('./node_modules')
                ]
            },
            node: {
                fs: 'empty',
            }
        }))
        .pipe(gulp.dest('test/build'))
        .pipe(mocha());
});

gulp.task('test:unit', function() {
    return gulp.src('test/app/unit/**/*.test.ts*')
        .pipe(webpack({
            module: {
                exprContextCritical: false,
                rules: [
                    {
                        test: /\.tsx?$/,
                        exclude: /(node_modules|test)/,
                        use: ['babel-loader', 'ts-loader']
                    },
                    {
                        test: /\.test.tsx?$/,
                        exclude: /(node_modules)/,
                        use: ['babel-loader', 'ts-loader']
                    }
                ]
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js'],
                modules: [
                    path.resolve('./app/src'),
                    path.resolve('./app/assets'),
                    path.resolve('./node_modules')
                ]
            },
            node: {
                fs: 'empty',
            }
        }))
        .pipe(gulp.dest('test/build'))
        .pipe(mocha());
});