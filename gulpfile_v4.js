const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const clean= require('gulp-clean');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const htmlmin = require('gulp-htmlmin');
const cleancss = require('gulp-clean-css');
const rev = require('gulp-rev');
const flatmap = require('gulp-flatmap');

// Clean assets

function clear() {
    return gulp.src('./dist/*', {
            read: false
        })
        .pipe(clean());
}

// JS function 

function js() {
    const source = './js/*.js';

    return gulp.src(source)
        .pipe(changed(source))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream());
}

// SCSS to CSS function dist files 
function css() {
    const source = './css/*.scss';

    return gulp.src(source)
        .pipe(changed(source))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
}

// Optimize images

function img() {
    return gulp.src('./images/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function copyfonts(){
    return gulp.src('./node_modules/open-iconic/font/**/*.*')
        .pipe(gulp.dest('./dist/node_modules/open-iconic/font'));
}

/*function usemin(){
    return gulp.src('./*.html')
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function(){return uglify()}],
            html: [function() {return rev()}, function(){return htmlmin()}]
        }))
        .pipe(gulp.dest("./docs"));
}*/

function usemin() {
    return gulp.src('./*.html')
        .pipe(flatmap(function(stream, file){
            return stream
            .pipe(usemin({
                css:[rev()],
                html: [function() {return htmlmin({collapseWhitespace: true})}],
                js: [ uglify(), rev()],
                inlinejs: [uglify()],
                inlinecss: [cleancss(), 'concat']
            }))
        }))
        .pipe(gulp.dest('./dist'));
  };

    

// compilar scss a css
function style(){
    // 1. donde esta mi archivo scss
    return gulp.src('./css/**/*.scss')
        //2. pasar el archivo por el compilador sass
        .pipe(sass().on('error', sass.logError))
        //3. donde guardara el archivo compilado css
        .pipe(gulp.dest('./css'))
        //4. Transmitir cambios a todos los browsers
        .pipe(browserSync.stream())
}


function watch(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./css/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);

}


//exports.style = style;
//exports.watch = watch;
exports.watch = gulp.parallel(watch, style);
exports.default = gulp.series(clear, gulp.parallel(copyfonts, img, usemin));


