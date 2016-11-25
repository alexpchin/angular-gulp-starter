const gulp = require('gulp');

const defaultTask = () => {
  return gulp.start(['serve-dev', 'watch']);
};

gulp.task('default', ['build-app'], defaultTask);
module.exports = defaultTask;
