var gulp = require('gulp')
  , pg = require('gulp-load-plugins')();

var cssMinify = function(files, name) {
  return gulp.src(files)
    .pipe(pg.concat(name + '.min.css'))
    .pipe(pg.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(pg.csso())
    .pipe(gulp.dest('./dist/css'))
};

var css = function (files, name) {

  cssMinify(files, name);

  return gulp.src(files)
    .pipe(pg.sourcemaps.init())
    .pipe(pg.concat(name + '.css'))
    .pipe(pg.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(pg.autoprefixer())
    .pipe(pg.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
};

gulp.task('styles', function () {
  return css([
    './src/scss/code-icons.scss'
  ], 'code-icons')
    .pipe(pg.size({
      title: 'styles'
    }));
});

gulp.task('watch', ['default'], function () {
  gulp.watch('./src/scss/*', ['styles']);
});

gulp.task('default', ['styles']);