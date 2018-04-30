const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
 

gulp.task('sass', () =>
   gulp.src('js/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('babel', () =>
   gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
);

gulp.task('default', () =>
  gulp.start('sass', 'babel')
);

