const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compilar scss a css

function style(){
    // 1. donde esta mi archivo scss
    return gulp.src('./css/**/*.scss')
        //2. pasar el archivo por el compilador sass
        .pipe(sass().on('error',sass.logError))
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


exports.style = style;
exports.watch = watch;
exports.default = gulp.parallel(watch, style);
