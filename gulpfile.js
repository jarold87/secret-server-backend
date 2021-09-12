const gulp = require('gulp');
const ts = require('gulp-typescript');

const JSON_FILES = ['src/**/*.json'];

const tsProject = ts.createProject('tsconfig.json');

async function scripts() {
    return await gulp.src(['src/**/*.ts'], {read: true})
        .pipe(tsProject())
        .pipe(gulp.dest('dist'));
}

async function assets() {
    return await gulp.src(JSON_FILES, {read: true})
        .pipe(gulp.dest('dist'));
}

exports.default = gulp.series(scripts, assets);
