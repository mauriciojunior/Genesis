var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    jeet = require('jeet'),
    koutoSwiss = require('kouto-swiss'),
    prefixer = require('autoprefixer-stylus'),
    browserSync = require('browser-sync'),
    jade = require('gulp-jade'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat')
    rupture = require('rupture');

gulp.task('browser-sync', function() {
  var files = [
    'build/css/main.css',
    'build/css/main.js',
    'build/index.html'
  ];
  return browserSync.init(files, {
    server: {
      baseDir: './build/'
    }
  });
});

gulp.task('jade', function() {
  return gulp.src('index.jade')
    .pipe(jade({
      pretty: false
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('stylus', function() {
  return gulp.src('src/styl/main.styl')
    .pipe(stylus({
      use: [jeet(), rupture(), prefixer(), koutoSwiss()],
      compress: false
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('imagemin', function() {
  return gulp.src( './src/img/**/*.{jpg, png, gif}' )
  .pipe( imagemin( {
      progressive: true,
      interlaced: true
  }))
  .pipe( gulp.dest( './build/img' ) );
});

gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js/'))
});

gulp.task( 'watch', function() {
  gulp.watch( 'src/styl/**/*.styl', [ 'stylus' ] );
  gulp.watch( 'src/js/**/*.js', [ 'js' ] );
  gulp.watch( 'index.jade', [ 'jade' ] );
  gulp.watch( 'src/img/**/*.{jpg, png, gif}', [ 'imgmin' ] );
});

gulp.task( 'default', [ 'stylus', 'jade', 'imagemin', 'js', 'browser-sync', 'watch' ] );
