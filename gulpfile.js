'use strict'

const gulp = require('gulp')
const stylus = require('gulp-stylus')
const jeet = require('jeet')
const koutoSwiss = require('kouto-swiss')
const prefixer = require('autoprefixer-stylus')
const browserSync = require('browser-sync')
const jade = require('gulp-jade')
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const rupture = require('rupture')

gulp.task('browser-sync', () => {
  const files = [
    'build/css/main.css',
    'build/css/main.js',
    'build/index.html'
  ]
  return browserSync.init(files, {
    server: {
      baseDir: './build/'
    }
  })
})

gulp.task('jade', () => {
  return gulp.src('index.jade')
    .pipe(jade({
      pretty: false
    }))
    .pipe(gulp.dest('./build/'))
})

gulp.task('stylus', () => {
  return gulp.src('src/styl/main.styl')
    .pipe(stylus({
      use: [jeet(), rupture(), prefixer(), koutoSwiss()],
      compress: false
    }))
    .pipe(gulp.dest('./build/css'))
})

gulp.task('imagemin', () => {
  return gulp.src('./src/img/**/*.{jpg,png,gif}')
  .pipe( imagemin({
      progressive: true,
      interlaced: true
  }))
  .pipe(gulp.dest('./build/img'))
})

gulp.task('js', () => {
	return gulp.src('src/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js/'))
})

gulp.task( 'watch', () => {
  gulp.watch( 'src/styl/**/*.styl', [ 'stylus' ] )
  gulp.watch( 'src/js/**/*.js', [ 'js' ] )
  gulp.watch( 'index.jade', [ 'jade' ] )
  gulp.watch( 'src/img/**/*.{jpg, png, gif}', [ 'imgmin' ] )
})

gulp.task( 'default', [ 'stylus', 'jade', 'imagemin', 'js', 'browser-sync', 'watch' ] )
