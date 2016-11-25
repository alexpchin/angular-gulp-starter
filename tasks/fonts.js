const gulp             = require('gulp');
const clean            = require('gulp-clean');
const eventStream      = require('event-stream');
const browserSync      = require('browser-sync').create();
const config           = require('../package').gulp;

const cleanFonts = () => {
  return gulp.src(config.dest.fonts, { read: false })
    .pipe(clean());
};

const copyFonts = () => {
  return gulp.src(`${config.src.fonts}${config.selectors.fonts}`)
    .pipe(gulp.dest(config.dest.fonts));
};

const buildFonts = () => {
  return eventStream.merge(
    cleanFonts(),
    copyFonts()
  )
  .pipe(browserSync.stream());
};

gulp.task('build-fonts', buildFonts);
module.exports = buildFonts;
