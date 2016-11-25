const gulp             = require('gulp');
const nodemon          = require('gulp-nodemon');
const browserSync      = require('browser-sync').create();
const config           = require('../package').gulp;

const serveDev = () => {
  let started = false;

  nodemon({
    script: config.main.server,
    watch: [config.main.server, config.main.gulpfile, config.main.packageJson],
    env: { NODE_ENV: 'development' }
  })
  .on('start', (cb) => {
    if (!started) {
      cb();
      started = true;
    }
  })
  .on('restart', () => console.log('[nodemon] restarted dev server.'));

  return browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*'],
    browser: 'google chrome',
    port: 7000
  });
};

gulp.task('serve-dev', serveDev);
module.exports = serveDev;
