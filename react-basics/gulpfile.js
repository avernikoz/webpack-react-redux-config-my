const gulp = require('gulp');

//Other
const sourcemaps = require('gulp-sourcemaps');

//CSS
const csslint = require('gulp-csslint'); // Проверяем на валидность
const concatCss = require('gulp-concat-css'); // Сливаем все стили в 1 файл
const cleanCSS = require('gulp-clean-css'); // Минифицируем
const rename = require('gulp-rename');

//SCSS
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');


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

//for default css
// gulp.task('default', ['js-bundle','css-bundle','fonts', 'watch', 'browserSync']);
//for scss css
gulp.task('default', ['js-bundle','scss-bundle','fonts', 'watch', 'browserSync']);


// Собираем все стили в один, минифицируем, добавляем префиксы и переименовываем
gulp.task('css-bundle', function() {
    return gulp.src([
        'src/css/**/*.css',
    ])
        .pipe(csslint({ "order-alphabetical": false }))
        .pipe(concatCss("bundle.css", { rebaseUrls: false }))
        .pipe(gulp.dest('build/css/'))
        .pipe(cleanCSS({ compatibility: 'ie8', level: 2 }))
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('build/css/'))
        .pipe(reload({stream:true}));
});


////////// SCSS
// Собираем все scss-стили в один, минифицируем, добавляем префиксы и переименовываем
gulp.task('scss-bundle', function() {
    return gulp.src([
        'src/scss/**/*.scss',
    ])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("bundle.css", { rebaseUrls: false }))
        .pipe(gulp.dest('build/css/'))
        .pipe(cleanCSS({ compatibility: 'ie8', level: 2 }))
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('build/css/'))
        .pipe(reload({stream:true}));
});


// Fonts
gulp.task('fonts', function() {
    return gulp.src([
        'src/webfonts/**/*.*'])
        .pipe(gulp.dest('build/webfonts/'));
});


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
        .pipe(gulp.dest('build/js'))
        .pipe(reload({stream: true}));

});


gulp.task('html', function(){
    gulp.src('index.html')
        .pipe(reload({stream:true}));
});


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
        proxy: "http://localhost:3000",
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
    // gulp.watch('src/css/**/*.css', ['css-bundle']);
    gulp.watch('src/scss/**/*.scss', ['scss-bundle']);
    gulp.watch('index.html', ['html']);
});