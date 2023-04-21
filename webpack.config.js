'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        //с помощью регулярных выражений находим файлы .js
        exclude: /(node_modules|bower_components)/,
        //какие файлы мы должны исколючить из этой выборки
        use: {
          loader: 'babel-loader',
          //помогаем связать webpack и babel
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                corejs: 3,
                useBuiltIns: "usage"
                //с помощью библиотеки корджс а именно свойства useBuilrIns
                //она позволяет выбрать только те полифилы которые нам нужны
            }]]
            //указываем какой пресет будем использовать
          }
        }
      }
    ]
  }
  //сначало идет свойство модулей ( какие модули мы будем использвовать)
  //потом идут правила которые мы будем использовать
};
