const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebPackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html')
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

        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        })
    ],
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
    },
}
