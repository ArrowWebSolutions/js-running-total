var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var karma = require('gulp-karma');

var paths = {
  "scripts": "src/*.js"
};

var testFiles = [
  "src/*.js",
  "tests/*.js"
];

gulp.task('js', function(){
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('js-running-total.min.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('test', function(){
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err){
      throw err;
    });
});

gulp.task('build', ['test', 'js']);