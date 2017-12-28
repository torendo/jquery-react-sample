var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var paths = {
  src: 'src',
  dist: 'dist'
};
var packageJson = require('./package.json');
var dependencies = Object.keys(packageJson.dependencies);

gulp.task('html', function () {
  return gulp.src([
    paths.src + '/**/*.html'
  ])
    .pipe(gulp.dest(paths.dist));
});
gulp.task('react', function () {
  var appBundler = browserify({
    entries: paths.src + '/index.js',
    debug: true
  });
  dependencies.forEach(function (dep) {
    appBundler.external(dep);
  });
  return appBundler
    .transform(babelify.configure({
      presets: ['env', 'react'],
      plugins: ['transform-object-rest-spread']
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('react:libs', function () {
  return browserify({debug: false})
    .require(dependencies)
    .bundle()
    .pipe(source('libs.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['html', 'react', 'react:libs']);

gulp.task('watch', function () {
  gulp.watch([paths.src + '/**/*.html'], function () {
    console.log('---------HTML WATCHER---------');
    gulp.start('html');
  });
  gulp.watch([paths.src + '/**/*.js'], function () {
    console.log('---------REACT WATCHER---------');
    gulp.start('react');
  });
  gulp.watch('./package.json', function () {
    console.log('---------REACT LIBS WATCHER---------');
    gulp.start('react:libs');
  });
});