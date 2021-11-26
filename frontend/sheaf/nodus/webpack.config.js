const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies
const Dotenv = require('dotenv-webpack');
const path = require("path");
const webpack = require('webpack');
const dotenv = require('dotenv').config({
    path: path.join(__dirname, '.env')
});

module.exports = {
    output: {
        publicPath: "http://localhost:3001/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
        fallback: {
            "fs": false,
            "os": false,
            "path": false,
            // "tls": false,
            // "net": false,
            
            // "zlib": false,
            // "http": false,
            // "https": false,
            // "stream": false,
            // "crypto": false,
            
            // "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
        }
    },

    devServer: {
        port: 3001,
    },
    target: 'web',


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
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            // {
            //     test: /\.ts$/,
            //     use: 'ts-loader',
            //     exclude: /node-modules/,
            // },
        ],
    },

    plugins: [
        // new ModuleFederationPlugin({
        //     name: "nodus",
        //     filename: "remoteEntry.js",
        //     remotes: {},
        //     exposes: {
        //         "./Header": "./src/Header",
        //     },
        //     shared: { ...dependencies}
        // }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
        }),
        new Dotenv(),
        // new webpack.DefinePlugin({
        //     "process.env": dotenv.parsed
        // }),
    ],
};