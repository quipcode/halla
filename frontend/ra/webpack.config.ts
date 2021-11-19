const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const  ModuleFederationPlugin  = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

const htmlWebPackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html')
})

// const moduleFederationPlugin = new ModuleFederationPlugin({
//     name: "adminApp",
//     library: { type: "var", name: "adminApp" },
//     filename: "remoteEntry.js",
//     exposes: {
//         // expose each component
//         "./Header": "./src/Header"
//     },
//     shared: ["react", "react-dom"],
// })

// new ModuleFederationPlugin({
//     name: "react-example",
//     remotes: {
//         "mf-components-library": "componentsLibrary@http://localhost:8080/remoteEntry.js",
//     },
//     shared: {
//         ...dependencies,
//         react: {
//             singleton: true,
//             requiredVersion: dependencies.react,
//         },
//         "react-dom": {
//             singleton: true,
//             requiredVersion: dependencies["react-dom"],
//         },
//     },
// })

const moduleFederationPlugin = new ModuleFederationPlugin({
    name: "adminApp",
    library: { type: "var", name: "adminApp" },
    filename: "remoteEntry.js",
    exposes: {
        // expose each component
        "./Header": "./src/Header"
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
    mode: 'development',
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx')
    },
    target: 'web',
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
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
    // output: {
    //     filename: '[name].js',
    //     path: path.resolve(__dirname, 'dist')
    // },
    output: {
        publicPath: 'http://localhost:3001/',
    },
    plugins: [htmlWebPackPlugin, moduleFederationPlugin],
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 3001,
    },
}
