const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

const htmlWebPackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html')
})
const moduleFederationPlugin = new ModuleFederationPlugin({
    name: "react-admin-app",
    shared: {
        ...dependencies,
        react: {
            singleton: true,
            requiredVersion: dependencies.react,
        },
        "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
        },
    },
})

module.exports = {
    mode: 'none',
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx')
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"

                ]
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf|jpe?g|png|gif)$/i,
                use: ['file-loader']
            },

        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [htmlWebPackPlugin],
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
    },
}
