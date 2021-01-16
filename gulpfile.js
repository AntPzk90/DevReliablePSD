const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const del = require('del');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
var plumber = require("gulp-plumber");
var imagemin = require("gulp-image");
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');

const styleFiles = [
  './src/sass/main.scss'
];
const scriptFiles = [
  './src/js/jquery-3.5.1.min.js',
  './src/js/script.js'
];

gulp.task('styles', () => {
  return gulp.src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(csscomb())
    .pipe(gulp.dest('./src/css'))
    // .pipe(cleanCSS({
    //   level: 2
    // }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp.src(scriptFiles)
    // .pipe(concat('script.js'))
    // .pipe(uglify({
    //   toplevel: false
    // }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});
gulp.task('del', () => {
  return del(['build/*'], { dryRun: true })
});
gulp.task('image-compress', function () {
  return gulp.src('./src/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img'))
});
gulp.task('minifyHTML', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(gulp.dest('./build'));
});
gulp.task("copy", function () {
  return gulp.src([
    'src/fonts/**/*',
    'src/select2/**/*',
    'src/slick/**/*',
    'src/js/**/*',
  ], {
    base: "src"
  })
    .pipe(gulp.dest("build"));
});
gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch('./src/sass/**/*.scss', gulp.series('styles'))
  gulp.watch('./src/img/**', gulp.series('image-compress'))
  gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
  gulp.watch('./src/*.html', gulp.series('minifyHTML'))
  gulp.watch("./build/*.html").on('change', browserSync.reload);
});
gulp.task('start', gulp.series('del', gulp.parallel('styles', 'image-compress', 'scripts', 'minifyHTML'), 'watch'));
gulp.task('build', gulp.series('del', gulp.parallel('styles', 'image-compress', 'scripts', 'minifyHTML'), 'copy'));
