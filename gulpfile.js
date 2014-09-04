var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var paths = {
  "scripts": "src/*.js"
};

gulp.task('js', function(){
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('js-running-total.min.js'))
    .pipe(gulp.dest('.'));
});