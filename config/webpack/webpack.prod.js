/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Mauricio Aguilar [18/03/2022]
 * @updated: -
 * @description: Webpack Production Configuration.
 **/

 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const { merge } = require('webpack-merge');
 const common = require('./webpack.common');
 const Dotenv = require('dotenv-webpack');
 const path = require('path');
 
 const prodConfig = {
     mode: 'production',
     devtool: false,
     devServer: {
         contentBase: '../../build'
     },
     module: {
         rules: [
             {
                 test: /\.(css|scss|sass)$/,
                 use: [MiniCssExtractPlugin.loader, 'css-loader']
             }
         ]
     },
     plugins: [
         new MiniCssExtractPlugin(),
         new Dotenv({
             path: path.resolve(__dirname, '../.env')
         })
     ]
 };
 
 module.exports = merge(common, prodConfig);
 