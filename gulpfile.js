const gulp = require('gulp');

//Other
const sourcemaps = require('gulp-sourcemaps');

//CSS
const csslint = require('gulp-csslint'); // Проверяем на валидность
const concatCss = require('gulp-concat-css'); // Сливаем все стили в 1 файл
const cleanCSS = require('gulp-clean-css'); // Минифицируем

// JS
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jslint = require('gulp-jslint');

// Babel
const babel = require('gulp-babel');


//WTF???
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const glob = require('glob');

//BrowserSync
// const browserSync = require('browser-sync').create();
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const nodemon = require('gulp-nodemon');


// Устанавливаем сборку для продакшена
gulp.task('apply-prod-environment', function() {
    process.env.NODE_ENV = 'production';
});


gulp.task('default', ['js-bundle', 'watch', 'browserSync']);


gulp.task('js-bundle', () => {
    let testFiles = glob.sync('./src/js/**/*.js');
    const b = browserify({
        entries: testFiles,
        transform: babelify,
        debug: true
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('build'))
        .pipe(reload({stream: true}));

});


gulp.task('html', function(){
    gulp.src('index.html')
        .pipe(reload({stream:true}));
});

gulp.task('css-reload', function(){
    gulp.src('index.html')
        .pipe(reload({stream:true}));
});


//Browser sync
// gulp.task('browserSync', function() {
//     browserSync({
//         server: {
//             baseDir: "./",
//             index: "index.html"
//         },
//         browser: 'Google Chrome Canary',
//         port: 3000,
//         open: true,
//         notify: false
//
//     });
// });

gulp.task('nodemon', function (cb) {

    let started = false;

    return nodemon({
        script: 'server.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('browserSync',['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3001",
        browser: "Google Chrome Canary",
        port: 7000,
        baseDir: "./",
        index: "index.html",
        open: true
    });
});





//Следим за изменениями:
gulp.task('watch', function () {
    gulp.watch('src/js/**/*.js', ['js-bundle']);
    gulp.watch('src/css/**/*.css', ['css-reload']);
    gulp.watch('index.html', ['html']);
});