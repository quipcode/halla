const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies
module.exports = {
    output: {
        publicPath: "http://localhost:3000/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 3000,
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
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "cairn",
            filename: "remoteEntry.js",
            remotes: {
                "nodus": "nodus@http://localhost:3001/remoteEntry.js",
            },
            exposes: {},
            shared:{ ...dependencies,}
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
        }),
    ],
};