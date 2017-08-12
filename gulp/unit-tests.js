'use strict';

const path = require('path');
const gulp = require('gulp');
const conf = require('./conf');

const karma = require('karma');

const pathSrcHtml = [
    path.join(conf.paths.src, '/**/*.html')
];

const pathSrcJs = [
    path.join(conf.paths.tmp, '/serve/app/app.module.js')
];

function runTests (singleRun, done) {
    let reporters = ['progress'];
    let preprocessors = {};

    pathSrcHtml.forEach((path) => {
        preprocessors[path] = ['ng-html2js'];
    });

    if (singleRun) {
        pathSrcJs.forEach((path) => {
            preprocessors[path] = ['coverage'];
        });
        reporters.push('coverage');
    }

    const localConfig = {
        configFile: path.join(__dirname, '/../karma.conf.js'),
        singleRun: singleRun,
        autoWatch: !singleRun,
        reporters: reporters,
        preprocessors: preprocessors
    };

    const server = new karma.Server(localConfig, (failCount) => {
        done(failCount ? new Error("Failed " + failCount + " tests.") : null);
    });
    server.start();
}

gulp.task('test', ['scripts:test'], (done) => {
    runTests(true, done);
});

gulp.task('test:auto', ['scripts:test-watch'], (done) => {
    runTests(false, done);
});
