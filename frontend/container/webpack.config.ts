const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

const htmlWebPackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html')
})
const moduleFederationPlugin = new ModuleFederationPlugin({
    name: "container",
    library: { type: "var", name: "container" },
    // remotes: {
    //     "react-admin": "componentsLibrary@http://localhost:8080/remoteEntry.js",
    // },
    filename: "remoteEntry.js",
    remotes: {  
        "adminApp": "adminApp@http://localhost:3001/remoteEntry.js",
        "rimaApp": "rimaApp@http://localhost:3002/remoteEntry.js",
        MFE1:'MFE1@https://rany.tk/mfe/mfe1/dist/2021Feb27/remoteEntry.js',
    },
    shared: {
        ...dependencies,
        react: {
            singleton: true,
            requiredVersion: dependencies.react,
            eager: true
        },
        "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
            eager: true
        },
    },
})

// new ModuleFederationPlugin({
//     name: "container",
//     filename: "remoteEntry.js",
//     remotes: {
//         "adminApp": "adminApp@http://localhost:/remoteEntry.js",
//     },
//     exposes: {},
//     shared: {
//         ...deps,
//         react: {
//             singleton: true,
//             requiredVersion: deps.react,
//         },
//         "react-dom": {
//             singleton: true,
//             requiredVersion: deps["react-dom"],
//         },
//     },
// }),

// const moduleFederationPlugin = new ModuleFederationPlugin({
//     name: "home",
//     filename: "remoteEntry.js",
//     remotes: {
//         "mf-nav": "nav@http://localhost:3001/remoteEntry.js",
//     },
//     exposes: {},
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
                test: /\.(ts|tsx|js|jsx)$/,
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
    plugins: [htmlWebPackPlugin, moduleFederationPlugin],
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
    },
}
