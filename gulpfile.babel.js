import gulp from 'gulp';

import postcss from 'gulp-postcss';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

import eslint from 'gulp-eslint';

gulp.task(`build:css`, () => {
  return gulp.src(`./css/src/framework.css`)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      atImport,
      autoprefixer({
        browsers: [ `last 2 versions` ]
      })
    ]))
    .pipe(sourcemaps.write(`./maps`))
    .pipe(gulp.dest(`./css/build`));
});

gulp.task(`watch:css`, () => {
  gulp.watch(`./css/src/*.css`, gulp.series(`build:css`));
});

gulp.task(`lint:js`, () => {
  return gulp.src([ `./js/controller.js`, `gulpfile.babel.js` ])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task(`watch:js`, () => {
  return gulp.watch(`./js/controller.js`, gulp.series(`lint:js`));
});
