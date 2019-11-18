'use strict'

const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清空打包目录的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html的插件
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(baseConfig, {
    output:{
        publicPath: './' //这里要放的是静态资源CDN的地址(一般只在生产环境下配置)
    },
    module: {
        // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
        rules:[
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'}
                ]
              },
              {
                test:/\.less$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'less-loader'},
                    {loader: 'postcss-loader'}
                ]
              },
              {
                test:/\.scss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'},
                    {loader: 'postcss-loader'}
                ]
              },
        ]
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'src', 'index.html'),
            filename:'index.html',
            // chunks:['index', 'common'],
            vendor: './vendor.dll.js', //与dll配置文件中output.fileName对齐
            hash:true,//防止缓存
            minify:{
                removeAttributeQuotes:true//压缩 去掉引号
            }
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, '..', 'src', 'page.html'),
        //     filename:'page.html',
        //     chunks:['page', 'common'],
        //     vendor: './vendor.dll.js',
        //     hash:true,//防止缓存
        //     minify:{
        //         removeAttributeQuotes:true//压缩 去掉引号
        //     }
        // }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '..', 'static'),
                to: path.join(__dirname,  '..', 'dist', 'static'),
                ignore: ['.*']
            }
        ]),
        new CleanWebpackPlugin({
            root: path.join(__dirname, '..'),
            cleanOnceBeforeBuildPatterns: ['index.html', '**/index*.js', '**/index*.css', 'mainifest.json'],
            verbose: true,
            dry:  false
        }),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                },
                warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
            }
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '..', 'dist', 'manifest.json')
        }),
    ],
    optimization: {
        minimizer: [new OptimizeCSSPlugin({})]
    }
})