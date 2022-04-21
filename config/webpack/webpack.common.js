/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Mauricio Aguilar [18/03/2022]
 * @updated:
 * @description: Webpack Common Configuration.
 **/

 const path = require('path');
 const deps = require("../../package.json").dependencies;
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CopyPlugin = require('copy-webpack-plugin');
 const { ModuleFederationPlugin } = require('webpack').container;
 const { InjectManifest } = require( 'workbox-webpack-plugin' );
 const { 
     npm_package_config_path, 
     npm_package_config_name,
     npm_package_config_remotes_users 
 } = process.env;

 module.exports = {
     entry: './src/index',
     output: {
         path: path.resolve(__dirname, '../../build'),
         filename: 'js/bundle.js',
         publicPath: `${npm_package_config_path}`,
         clean: true
     },
     module: {
         rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                  fullySpecified: false,
                },
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                     loader: 'babel-loader',
                     options: {
                         presets: ['@babel/preset-env', '@babel/preset-react']
                     }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                     {
                         loader: 'file-loader',
                         options: {
                             name: 'img/[name].[ext]'
                         }
                     }
                ]
            }
         ]
     },
     resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
     },
     plugins: [
        new ModuleFederationPlugin({
            name: "",
            filename: 'remoteEntry.js',
            remotes: {
            },
            exposes: {},
            shared: {
                ...deps,
                react: {
                  singleton: true,
                  requiredVersion: deps.react,
                },
                "react-dom": {
                  singleton: true,
                  requiredVersion: deps["react-dom"],
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/App/views/index.html',
            filename: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/App/views/img', to: 'img/' },
                { from: './src/App/views/img/icon.png', to: 'img/' },
                { from: './src/App/views/manifest.json', to: '' },
                { from: './src/App/views/img/icon144x144.png', to: 'img/' },
                { from: './src/App/views/img/icon512x512.png', to: 'img/' },
            ]
        }),
        new InjectManifest({
            swSrc: './config/serviceWorker/sw.js',
            swDest: 'sw.js'
        })  
     ]
 }; 