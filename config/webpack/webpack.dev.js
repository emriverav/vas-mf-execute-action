/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Mauricio Aguilar [18/03/2022]
 * @updated:
 * @description: Webpack Development Configuration.
 **/

 const { merge } = require('webpack-merge');
 const common = require('./webpack.common');
 const Dotenv = require('dotenv-webpack');
 const path = require('path');
 const fs = require('fs');
 const { npm_package_config_port } = process.env;

 const devConfig = {
     mode: 'development',
     devServer: {
         port: npm_package_config_port,
         historyApiFallback: true,
         open: '/execute'
     },
     devtool: 'eval-source-map',
     plugins: [
         new Dotenv({
             path: fs.existsSync(path.join(__dirname, '../.env.local'))
                 ? path.resolve(__dirname, '../.env.local')
                 : path.resolve(__dirname, '../.env')
         })
     ]
 };
 
 module.exports = merge(common, devConfig);
 