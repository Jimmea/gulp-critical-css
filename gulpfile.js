var gulp = require('gulp');
var sass = require('gulp-sass');
let penthouse = require('penthouse-pages');
var browserSync = require('browser-sync').create();


gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('hello', function() {
  console.log('Hello Zell');
});

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('app/css'));
    // .pipe(browserSync.reload({
    //   stream: true
    // }))
});


gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass'])
  // Other watchers
  
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/*.js', browserSync.reload); 
})

gulp.task('critical-css', ['sass'], () => {
    return penthouse({
        // penthouse-page options
        pages: [
             {
                name: 'index',
                url: '',
            },
            'about',
            'contact'
        ],
        baseUrl: 'http://localhost:9001/',
        dest: './dest/',
        // penthouse options
        css: 'app/css/styles.css',
        width: 1300,
        height: 900,
        strict: true,
    });
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})