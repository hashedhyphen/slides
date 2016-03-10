import gulp from 'gulp';
import sass from 'gulp-sass';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';

gulp.task(`build:css`, () => {
  return gulp.src(`./css/src/framework.sass`)
    .pipe(sourcemaps.init())
    .pipe(sass().on(`error`, sass.logError))
    .pipe(sourcemaps.write(`./maps`))
    .pipe(gulp.dest(`./css/build`));
});

gulp.task(`watch:css`, () => {
  gulp.watch(`./css/src/*.sass`, gulp.series(`build:css`));
});

gulp.task(`lint:js`, () => {
  return gulp.src([ `./js/controller.js`, `gulpfile.babel.js` ])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task(`watch:js`, () => {
  return gulp.watch(`./js/controller.js`, gulp.series(`lint:js`));
});
