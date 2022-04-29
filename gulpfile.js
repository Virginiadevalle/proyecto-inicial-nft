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
    .pipe(nunjucks.compile({
        cars:[
            "Domain Names",
            "Trading Cards",
            "Collectibeles",
            "Virtual Worlds",
            "Domain Names",
            "Trading Cards",
            "Collectibeles",
            "Virtual Worlds",
        ],
        sellers: [
            {
              items: 62,
              name: "James Tonny"
            },
            {
              items: 129,
              name: "Buri maa"
            },
            {
              items: 28,
              name: "James unny"
            },
            {
              items: 23,
              name: "James tonny"
            },
            {
              items: 15,
              name: "Jimmy choe"
            },
            {
              items: 33,
              name: "Stave Bamer"
            },
        ]
    }))
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