const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const dotenv = require('dotenv');


const devMode = process.env.NODE_ENV !== 'production'

const dotEnvConfig = new webpack.DefinePlugin({
       'process.env': JSON.stringify(dotenv.config().parsed) 
    })


const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
});
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
});

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },

            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                    
                ]
            },

            {
                test: /\.(svg|eot|woff|woff2|ttf|jpe?g|png|gif)$/i,
                use: ['file-loader']
            },


        ]
    },
    plugins: [dotEnvConfig, htmlWebpackPlugin, miniCssExtractPlugin,],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',

    devServer: {
        compress: true,
        historyApiFallback: true,
        open: true,
        overlay: true,
        inline: true,
        hot: true,
        port: '3000',
    }
};