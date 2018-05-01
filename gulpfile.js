const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const webpack = require('webpack-stream'); 
const $ = require('gulp-load-plugins')({lazy: true});

gulp.task('babel', () =>
   gulp.src('js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('sass', () =>
   gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
);

gulp.task('scripts', () =>
    gulp.src('js/app.js')
    .pipe(webpack({
      output: {
        filename: '[name].js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env']
              }
            }
          }
        ]
      },
      devtool: '#inline-source-map'
    }))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.uglify())
    .pipe($.rename('main.min.js'))
    // Output files
    .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(gulp.dest('.tmp/scripts'))
);

gulp.task('default', () =>
  gulp.start('sass', 'scripts')
);

