const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const clean = require('gulp-clean');

gulp.task('sass', function() {
  gulp.src('style.scss')
    .pipe(sass())
    .pipe(gulp.dest('sassed'))
});

gulp.task('style', function() {
  gulp.src('style.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch('style.scss', ['style']);
});
