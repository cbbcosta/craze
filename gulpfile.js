var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

var paths = {
  styles: [
    'src/sass/**/*.scss',
    '!src/sass/variables.scss'
  ],
  js: [
    'src/js/**/*.js',
    '!src/js/bundle.js',
    '!src/js/bundle-min.js'
  ]
};

gulp.task('styles', function () {
  gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer(
      {
        browsers: [
          '> 1%',
          'last 2 versions',
          'Firefox ESR'
        ]
      }
    ))
    .pipe(gulp.dest('src/css'));
});

gulp.task('pack-js', function () {
  return gulp.src([
    // 'src/js/main.js',
    'src/js/components/*.js'
  ])
  .pipe(concat('bundle.js'))
  .pipe(babel())
  .pipe(minify())
  .pipe(gulp.dest('src/js/'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('watch', [
  'styles',
  'pack-js'
], function () {
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.js, ['pack-js']);
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  })
})

gulp.task('default', ['serve', 'watch']);
