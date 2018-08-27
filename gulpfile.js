var gulp            = require("gulp"),
    sass            = require("gulp-sass"),
    autoprefixer    = require("gulp-autoprefixer"),
    ts              = require("gulp-typescript"),
    uglify          = require("gulp-uglify"),
    pump            = require("pump")


// Compile SCSS files to CSS
gulp.task("scss", function (cb) {
    pump([
        gulp.src("src/scss/**/*.scss"),
        sass({outputStyle : "compressed"}),
        autoprefixer({browsers : ["last 20 versions"]}),
        gulp.dest("static/css")
    ],
    cb
)})

// Compile TypeScript to Javascript
gulp.task("ts", function (cb) {
    pump([
        gulp.src("src/ts/**/*.ts"),
        ts({noImplicitAny: true}),
        uglify(),
        gulp.dest("static/js")
    ],
    cb 
)})


// Watch asset folder for changes
gulp.task("watch", function() {
    gulp.watch("src/scss/**/*", gulp.series("scss"))
    gulp.watch("src/ts/**/*", gulp.series("ts"))
})