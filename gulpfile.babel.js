import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

gulp.task(`build:css`, () => {
  return gulp.src(`./css/src/framework.sass`, { since: gulp.lastRun(`build:css`) })
    .pipe(sourcemaps.init())
    .pipe(sass().on(`error`, sass.logError))
    .pipe(sourcemaps.write(`./maps`))
    .pipe(gulp.dest(`./css/build`));
});

gulp.task(`watch:css`, () => {
  gulp.watch(`./css/src/*.sass`, gulp.series(`build:css`));
});
