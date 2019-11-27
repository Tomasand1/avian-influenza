var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');

const destPath = 'build';
const srcPath = 'src';
const paths = {
    staticResources: [
        srcPath + '/**/*.json',
        srcPath + '/**/*.html',
        srcPath + '/**/*.dat',
    ],
};

function clean() {
    return del([destPath + '/*']);
}

function copy() {
    return gulp.src(paths.staticResources).pipe(gulp.dest(destPath));
}

function compile() {
    return gulp
        .src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(
            sourcemaps.write('.', { sourceRoot: './', includeContent: false }),
        )
        .pipe(gulp.dest(destPath));
}

function watch() {
    gulp.watch('src/**/*.js', { delay: 500 }, compile);
}

function watchDiff() {
    gulp.watch('src/**/*.js').on('change', file => {
        gulp.src(file)
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(
                sourcemaps.write('.', {
                    sourceRoot: './',
                    includeContent: false,
                }),
            )
            .pipe(gulp.dest(destPath))
            .on('error', error => {
                throw new Error(error);
            });
    });
}

/*
 * Export a default task
 */
const build = gulp.series(clean, gulp.parallel(compile, copy));
gulp.task('build', build);
exports.default = build;

const diff = gulp.series(gulp.parallel(compile, copy));
gulp.task('diff', diff);
