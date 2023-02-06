import gulp from 'gulp';
import babel from 'gulp-babel';
import postcss from 'gulp-postcss';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import imageminWebp from 'imagemin-webp';
import pimport from 'postcss-import';
import minmax from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import sync from 'browser-sync';

// HTML
export const html = () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

// Styles
export const styles = () => {
    return gulp.src('src/styles/index.css')
        .pipe(postcss([
            pimport,
            minmax,
            autoprefixer,
            csso,
        ]))
        .pipe(replace(/\.\.\//g, ''))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

// Scripts
export const scripts = () => {
    return gulp.src('src/scripts/**/*.js')
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

// Copy
export const images = () => {
    return gulp.src('src/images/**/*.{png,svg}', { base: 'src'})
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.src('src/images/**/*.{png,svg}', { base: 'src'}))
        .pipe(webp())
        .pipe(imagemin([
            imageminWebp({quality: 50})
        ]))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.src('src/images/**/*.ico', { base: 'src'}))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream({
            once: true
        }));
};

// Paths
export const paths = () => {
    return gulp.src('dist/*.html')
        .pipe(replace(
            /(<link rel="stylesheet" href=")styles\/(index.css">)/, '$1$2'
        ))
        .pipe(replace(
            /(<script )(src=")scripts\/(index.js">)/, '$1defer $2$3'
        ))
        .pipe(gulp.dest('dist'));
};

// Server
export const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dist'
        }
    });
};

// Watch
export const watch = () => {
    gulp.watch('src/*.html', gulp.series(html, paths));
    gulp.watch('src/styles/**/*.css', gulp.series(styles));
    gulp.watch('src/scripts/**/*.js', gulp.series(scripts));
    gulp.watch('src/images/**/*', gulp.series(images));
};

// Default
export default gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        images,
    ),
    paths,
    gulp.parallel(
        watch,
        server,
    ),
);
