const gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  render = require('./render.js'),
  watch = require('gulp-watch'),
  mainBowerFiles = require('main-bower-files'),
  runSequence = require('run-sequence');



gulp.task('serve', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      //open: true
    }));
});

gulp.task('render', function() {
  gulp.src('examples/*.js')
    .pipe(render())
    .pipe(gulp.dest('dist/examples'));
});

gulp.task('watch', function() {
    gulp.src('examples/*.js')
      .pipe(watch(['examples/*.js', './*.js']))
      .pipe(render())
      .pipe(gulp.dest('dist/examples'));
  })

gulp.task('bower', function() {
  gulp.src([
      'bower_components/three.js/build/three.js',
      'bower_components/threestrap/build/threestrap.js',
      'bower_components/underscore/underscore-min.js',
      'src/renderShape.js'
    ])
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('run', function(){
  runSequence(['serve', 'watch'])
})
