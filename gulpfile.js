/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */
// Load plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
critical = require('critical').stream;

// Styles
gulp.task('styles', function() {
return gulp.src('src/*.html')
        .pipe(critical({base: 'src/', inline: true, minify: true, css: ['src/css/normalize.min.css', 'src/css/bulma.min.css', 'src/css/main.css']}))
        .pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean
gulp.task('clean', function() {
return del(['dist/styles', 'dist/scripts', 'dist/images']);
});
// Default task
gulp.task('default', ['clean'], function() {
gulp.start('styles', 'scripts');
});
// Watch
gulp.task('watch', function() {
// Watch .scss files
gulp.watch('src/css/*.css', ['styles']);
// Watch .js files
gulp.watch('src/js/*.js', ['scripts']);
// Create LiveReload server
livereload.listen();
// Watch any files in dist/, reload on change
gulp.watch(['dist/**']).on('change', livereload.changed);
});