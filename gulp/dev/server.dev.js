/**服务器设置
 * 开发*/

var gulp = require('gulp'),

    connect = require('gulp-connect'),

    option = require('../config.js').serverDev;//服务器

var browserSync = require('browser-sync').get("My Server");


function devServer() {
    //
    //connect.server(option);

    browserSync.init({

        server: {

            baseDir: './build/',//目录

            index: "html/jdshop_homepage/main.html"

        },

        reloadDebounce: 500,

    });





    /* browserSync.init({
     proxy: 'http://localhost:3000',
     browser: 'chrome',
     port: 7000*/

}

module.exports = devServer;