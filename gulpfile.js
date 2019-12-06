const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const cssFiles = ['./css/style.css'];
const jsFiles = ['./script/main.js'];


function bSync () {
	browserSync.init({
		server: {
			baseDir: './'
		},
		notify: false
	})
}

function style(){
	return gulp.src(cssFiles)
	.pipe(concat('style.css'))
	.pipe(autoprefixer({
		overrideBrowserslist: ['last 2 versions'],
		cascade: false
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.reload({ stream: true }))
}

function script(){
	return gulp.src(jsFiles)
	.pipe(concat('main.js'))
	.pipe(minify())
	.pipe(gulp.dest('./build/js'))
	.pipe(browserSync.reload({ stream: true }))

}


function htmlCode() {
	return gulp.src('index.html')
	.pipe(gulp.dest('./build/'))
	.pipe(browserSync.reload({stream: true}))
}


gulp.task('html', htmlCode);
gulp.task('style', style);
gulp.task('scripts', script);
gulp.task('build', function (){
	gulp.watch('index.html', gulp.parallel('html'));
	gulp.watch('css/**/*.css', gulp.parallel('style'));
	gulp.watch('script/**/*.js', gulp.parallel('scripts'));
})
gulp.task('brSync', bSync);

gulp.task('watch',gulp.parallel('brSync', 'build'));