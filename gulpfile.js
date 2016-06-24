var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sourcemaps  = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify');

var paths = {
    sass: ['./assets/sass/**/*.sass'],
    images: ['./assets/img/**/*.{png,jpg}'],
    js: ['./assets/js/**/*.js']
};

gulp.task('default', ['watch']);

gulp.task('imagemin', function () {
    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img/'))
});

gulp.task('sass', function(done) {
    gulp.src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .on('error', sass.logError)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(concat('style.css'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./public/css/'))
        .on('end', done);
});

gulp.task('js', function () {
    gulp.src(paths.js)
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./public/js/'))
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js']);
});