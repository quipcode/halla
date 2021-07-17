const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { optimize } = require("webpack");


const devMode = process.env.NODE_ENV !== 'production'


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
    plugins: [htmlWebpackPlugin, miniCssExtractPlugin,],
    resolve: {
        extensions: ['.js', '.jsx'],
    },

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