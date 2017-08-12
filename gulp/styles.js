'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');

const browserSync = require('browser-sync');

const $ = require('gulp-load-plugins')();

const wiredep = require('wiredep').stream;
const _ = require('lodash');

const support_browsers = [
    'last 10 version',
    '> 1%',
    'safari 5',
    'ie 6-11',
    'opera 12.1',
    'Firefox <= 20',
    'ios 6', 'android 4'
];

gulp.task('styles-reload', ['styles'], () => {
    return buildStyles()
    .pipe(browserSync.stream());
});

gulp.task('styles', () => {
    return buildStyles();
});

var buildStyles = () => {
    var sassOptions = {
        outputStyle: 'expanded',
        precision: 10
    };

    var injectFiles = gulp.src([
        // path.join(conf.paths.src, '/app/**/*.scss'),
        path.join(conf.paths.src, '/app/index.scss')
    ], { read: false });

    var injectOptions = {
        transform: function(filePath) {
            filePath = filePath.replace(conf.paths.src + '/app/', '');
            return '@import "' + filePath + '";';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };


    return gulp.src([
        path.join(conf.paths.src, '/app/index.scss')
    ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer({
        browsers: support_browsers
    })).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};
