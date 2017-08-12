'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');
const util = require('gulp-util');
const gulpNgConfig = require('gulp-ng-config');

const browserSync = require('browser-sync');
const webpack = require('webpack-stream');

const $ = require('gulp-load-plugins')();


function webpackWrapper(watch, test, callback) {
    var webpackOptions = {
        watch: watch,
        module: {
            // PRELOADER -> LINT
            // preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'ng-annotate',
                    'babel-loader'
                ]
            }]
        },
        output: { filename: 'app.module.js' }
    };

    if(watch) {
        webpackOptions.devtool = 'inline-source-map';
    }

    var webpackChangeHandler = function(err, stats) {
        if(err) {
            conf.errorHandler('Webpack')(err);
        }
        $.util.log(stats.toString({
            colors: $.util.colors.supportsColor,
            chunks: false,
            hash: false,
            version: false
        }));
        browserSync.reload();
        if(watch) {
            watch = false;
            callback();
        }
    };

    var sources = [ path.join(conf.paths.src, '/app/app.module.js') ];
    if (test) {
        sources.push(path.join(conf.paths.src, '/app/**/*.spec.js'));
    }

    return gulp.src(sources)
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('env', function() {
    return gulp.src([ path.join(conf.paths.env, '/env.json') ])
        .pipe(gulpNgConfig('app.env', {
            environment: ['global', 'env.' + util.env.type]
        }))
        .pipe(gulp.dest(path.join(conf.paths.src, '/app')));
});

gulp.task('scripts', ['env'], function () {
    return webpackWrapper(false, false);
});

gulp.task('scripts:watch', ['scripts'], function (callback) {
    return webpackWrapper(true, false, callback);
});

gulp.task('scripts:test', function () {
    return webpackWrapper(false, true);
});

gulp.task('scripts:test-watch', ['scripts'], function (callback) {
    return webpackWrapper(true, true, callback);
});
