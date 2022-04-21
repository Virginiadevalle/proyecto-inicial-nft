const browserSync = require("browser-sync").create();
const gulp = require("gulp")
const nunjucks = require("gulp-nunjucks")
const plumber = require("gulp-plumber")
const concatCss =require("gulp-concat-css")
const cleanCss = require("gulp-clean-css")


function reload(cd) {
    browserSync.reload();
    cd();
    
}

function liveReaload() {
    browserSync.init({
        server:{
            baseDir: "./dist"
        }
    })
}


function compliarTemplates(cb) {
    gulp.src("src/html/*.njk")
    .pipe(plumber())
    .pipe(nunjucks.compile())
    .pipe(gulp.dest("dist"))
    cb();
}

 function concatenarCss(cb) {
     gulp.src("src/css/*.css")
     .pipe(plumber())
     .pipe(concatCss("main.css"))
     .pipe(cleanCss())
     .pipe(gulp.dest("dist/css"))
     cb();
 }

 function defaulTalk() {
     liveReaload()
     gulp.watch("src/html/**/*.njk", gulp.series([compliarTemplates, reload]))
     gulp.watch("src/css/**/*.css", gulp.series([concatenarCss, reload]))
    
 }

exports.css = concatenarCss
exports.compilar = compliarTemplates
exports.default = defaulTalk