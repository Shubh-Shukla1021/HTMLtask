const gulp = require("gulp");
const GSM = require("gulp-sourcemaps");
const del = require("del");
const cssnano = require("cssnano");
const PCS = require("gulp-postcss");
const AP = require("autoprefixer");
const BS = require("browser-sync");
const autoprefixer = require("autoprefixer");
const img = require("gulp-imagemin");

const style = () =>
    gulp.src("./src/css/*.css")
        .pipe(GSM.init())
        .pipe(PCS([autoprefixer(),cssnano()]))
        .pipe(GSM.write("."))
        .pipe(gulp.dest("./cist/css"))


const html = ()=>
    gulp.src("./src/*.html")
    .pipe(gulp.dest("./cist/"))

/*
const image = ()=>
    gulp.src("./src/image")
    .pipe(img())
    .pipe(gulp.dest("./cist/image"))

*/
const clean = ()=>{
    return del(["./cist"])
}


function watchfiles(){
    BS.init({
        server:"./cist"
    });

    gulp.watch("./src/css/*.css",style).on("change",BS.reload)
    gulp.watch("./src/*.html",html).on("change",BS.reload)
    //gulp.watch("./src/image/*",image).on("change",BS.reload)
}

const watch = gulp.series(clean,style,html,watchfiles);

exports.watch = watch;
exports.style = style;
exports.html = html;
//exports.image = image;