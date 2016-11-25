const gulp             = require('gulp');
const gulpIf           = require('gulp-if');
const htmlhint         = require('gulp-htmlhint');
const htmlmin          = require('gulp-htmlmin');
const browserSync      = require('browser-sync').create();
const config           = require('../package').gulp;

const validatePartials = () => {
  return gulp.src([
    `!${config.main.index}`,
    `${config.srcDir}${config.selectors.html}`
  ])
  .pipe(htmlhint({'doctype-first': false}))
  .pipe(htmlhint.reporter('htmlhint-stylish'));
};

const buildPartials = () => {
  return validatePartials()
    .pipe(gulpIf(global.production, htmlmin({collapseWhitespace: true, removeComments: true})))
    .pipe(gulp.dest(config.destDir))
    .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-partials', buildPartials);
module.exports = buildPartials;
