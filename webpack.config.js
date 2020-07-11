const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
        // указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш
        },
module: {
    rules: [{ // тут описываются правила
        test: /\.js$/, // регулярное выражениеZ, которое ищет все js файлы
        use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
        exclude: /node_modules/ // исключает папку node_modules
      }, // Добавьте ещё одно правило:
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', 
            options: { importLoaders: 2}
          },
           'postcss-loader'] // к этим файлам нужно применить пакеты, которые мы уже установили
      }
        
    
     ]
    },
plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
          }),
        new WebpackMd5Hash()
    ]
}; 