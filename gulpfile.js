"use strict";

const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cp = require("child_process");
const cssnano = require("cssnano");
// const del = require("del");
// const eslint = require("gulp-eslint");
const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
// const pug = require("gulp-pug");
// const pugbem = require("gulp-pugbem");
const replace = require("gulp-replace");
const rename = require("gulp-rename");
// const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const svgstore = require("gulp-svgstore");
const cheerio = require('gulp-cheerio');
const sass = require('gulp-sass')(require('sass'));
const globImporter = require("node-sass-glob-importer");
const sourcemaps = require("gulp-sourcemaps");
const path = require("path");
const webpack = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");

const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

//PATH
const folder = {
  src: "./_src/",
  dest: "./",
};

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./",
      directory: true,
    },
    // files: ["./html/*.html", "./css/*.css", "./js/*.js", "./img/**/*"],
    // proxy: "http://",

    // serveStatic: ["./theme/"],
    // files: ["theme/**", "view/**"],
    // rewriteRules: [
    //   {
    //     match: new RegExp("/theme/_dest/js/main.js"),
    //     fn: function () {
    //       return "./theme/_dest/js/main.js";
    //     },
    //   },
    //   {
    //     match: new RegExp("/theme/_dest/css/common.css"),
    //     fn: function () {
    //       return "./theme/_dest/css/common.css";
    //     },
    //   },
    // ],
    port: 3000,
    notify: false,
    open: false,
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// CSS
function css() {
  return (
    gulp
      .src(folder.src + "sass/*.{sass,scss}")
      .pipe(sourcemaps.init())
      .pipe(
        sass.sync({
          importer: globImporter(),
          // outputStyle: "nested", // nested, expanded, compact, compressed
          precision: 5,
          includePaths: ["node_modules"],
        }).on("error", sass.logError)
      )
      .pipe(replace("@/", "../"))
      .pipe(postcss([autoprefixer, cssnano]))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(folder.dest + "css/"))
      .pipe(browsersync.stream())
  );
}

function html() {
  return gulp
    .src(folder.src + "tpl/*.html")
    .pipe(plumber())
    .pipe(nunjucksRender({ path: "./_src/tpl" }))
    .pipe(replace("@/", "../"))
    .pipe(gulp.dest(folder.dest + 'html'));
  // .src([folder.src + "tpl/*.html"])
  // .pipe(newer("./html/*.html"))
  // .pipe(gulp.dest("./html/"))
}

function sprite() {
  return gulp
    .src(folder.src + "sprite/**/*.svg")
    .pipe(cheerio({
            run: ($) => {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
    .pipe(svgstore())
    .pipe(gulp.dest(folder.dest + "img/"));
}

// JS
function scripts() {
  return (
    gulp
      .src([folder.src + "js/**/*.js"])
      .pipe(webpackstream(webpackconfig, webpack))
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest(folder.dest + "js"))
      .pipe(browsersync.stream())
  );
}

// Watch files
function watchFiles() {
  gulp.watch(folder.src + "sass/**/*", css);
  gulp.watch(folder.src + "js/**/*", gulp.series(scripts));
  gulp.watch(folder.src + "tpl/**/*.html", gulp.series(html));
  gulp.watch(folder.src + "sprite/*.svg", gulp.series(sprite));
  gulp.watch("./html/*.html").on("change", browsersync.reload);
}

// define complex tasks
const js = gulp.series(scripts);
const build = gulp.parallel(css, js, html, sprite);
const watch = gulp.parallel(build, watchFiles, browserSync);

// export tasks
exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch;
