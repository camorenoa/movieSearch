'use strict';

var conf = require('./gulp.config.js');

var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var replace = require('gulp-replace');


/* Build */
gulp.task('build', ['build:css']);

/** Build LESS, put extra css into vendor.css */
gulp.task('build:css', function(){
  gulp.src( conf.mainLessFile )
    // .pipe(size())
    .pipe(less())
    .pipe(rename(function(path){
      path.basename = 'styles';
    }))
    .pipe(gulp.dest(conf.cssBuildDir));
});

/* Watch */
gulp.task('watch', ['build'], function(){
  livereload.listen();
  gulp.watch(conf.lessFiles, ['build:css']).on('change', livereload.changed);
});