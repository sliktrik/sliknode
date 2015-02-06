var gulp = require('gulp'),
    server = require('gulp-express'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css');

gulp.task('js', function() {
    return gulp.src(['front_end/src/js/lib/angular/angular.min.js',
                     'front_end/src/js/lib/angular/angular-route.min.js', 
                     'front_end/src/js/app.js',
                     'front_end/src/js/controllers/*.js',
                     'front_end/src/js/utils/*.js'])
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('front_end/build/js'))
        .pipe(server.notify())
        .pipe(notify({
            message: 'Finished minifying JavaScript'
        }));
});

gulp.task('css', function() {
    return gulp.src('front_end/src/sass/**/*.scss')
        .pipe(sass())
        .pipe(minifycss())
        .pipe(gulp.dest('front_end/build/css/'))
        .pipe(server.notify())
        .pipe(notify({
            message: 'Finished minifying SASS'
        }));
});

gulp.task('html', function() {
    gulp.src('front_end/build/**/*.html')
    .pipe(server.notify());
});

gulp.task('watch', function() {
    gulp.watch('front_end/src/js/**/*', ['js']);
    gulp.watch('front_end/src/sass/**/*.scss', ['css']);
    gulp.watch(['front_end/build/*.html', 'front_end/build/views/*.html'], ['html']);
});

gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run({
        file: 'bin/www'
    });
    
    gulp.watch(['app.js', 'routes/**/*.js'], [server.notify]);
});

gulp.task('default', ['html', 'js', 'css', 'watch', 'server']);