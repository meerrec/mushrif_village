'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var srcPath = "src/",
    buildPath = "build/",
    themePath = "assets/";

var path = {
    build: {
        html: buildPath,
        js: buildPath+themePath+'js/',
        css: buildPath+themePath+'css/',
        cssimg: buildPath+themePath+'images/',
        img: buildPath+'images/',
        fonts: buildPath+themePath+'fonts/'
    },
    src: {
        html: srcPath+'*.html',
        js: srcPath+themePath+'js/**/*.*',
        style: srcPath+themePath+'less/style.less',
        css: srcPath+themePath+'css/**/*.*',
        cssimg: srcPath+themePath+'images/**/*.*',
        img: srcPath+'images/**/*.*',
        fonts: srcPath+themePath+'fonts/**/*.*'
    },
    watch: {
        html: srcPath+'/**/*.html',
        js: srcPath+themePath+'js/**/*.js',
        css: srcPath+themePath+'css/**/*.css',
        style: srcPath+themePath+'less/**/*.less',
        cssimg: srcPath+themePath+'images/**/*.*',
        img: srcPath+'images/**/*.*',
        fonts: srcPath+themePath+'fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: ""
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .on('end', browserSync.reload);
    // .pipe(reload({stream: true}));
});

gulp.task('js:copy', function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
        .on('end', browserSync.reload);
    // .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer())
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest(path.build.css))
        .on('end', browserSync.reload);
    // .pipe(reload({stream: true}));
});
gulp.task('bootstrap:build', function () {
    gulp.src(path.src.bootstrap)
        .pipe(less())
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
        .on('end', browserSync.reload);
    // .pipe(reload({stream: true}));
});

gulp.task('css:copy', function () {
    gulp.src(path.src.css)
        .pipe(gulp.dest(path.build.css))
        .on('end', browserSync.reload);
    // .pipe(reload({stream: true}));
});


gulp.task('img:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .on('end', browserSync.reload);
    // .pipe(reload({stream: true}));
});

gulp.task('cssimg:build', function () {
    gulp.src(path.src.cssimg)
        .pipe(gulp.dest(path.build.cssimg))
        .on('end', browserSync.reload);
    // .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('flags:build', function() {
    gulp.src(path.src.flags)
        .pipe(gulp.dest(path.build.flags))
});

gulp.task('build', [
    'html:build',
    'js:copy',
    'style:build',
    'css:copy',
    'fonts:build',
    'cssimg:build',
    'img:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:copy');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:copy');
    });
    watch([path.watch.cssimg], function(event, cb) {
        gulp.start('cssimg:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);