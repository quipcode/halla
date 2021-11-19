const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

const htmlWebPackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html')
})

const moduleFederationPlugin = new ModuleFederationPlugin({
    name: "rimaApp",
    library: { type: "var", name: "rimaApp" },
    filename: "remoteEntry.js",
    exposes: {
        // expose each component
        "./Button": "./src/Button"
    },
    remotes: {},
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

        ],
    },
    output: {
        publicPath: 'http://localhost:3002/',
    },
    // output: {
    //     filename: '[name].js',
    //     path: path.resolve(__dirname, 'dist')
    // },
    plugins: [htmlWebPackPlugin, moduleFederationPlugin],
    
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 3002,
    },
}
