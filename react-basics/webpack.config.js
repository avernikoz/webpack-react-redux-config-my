const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        home: [
            './src/js/index.jsx',
            './src/scss/style.scss'
        ]
    },
    mode: 'development',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'js/bundle.js'
    },
    devServer: {
        port: 8080
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: [
            '.js',
            '.jsx'
        ]
    },
    module: {
        rules: [
            {
                test: [/.js$|.jsx$/],
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: false
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false
                            }
                        }]
                })
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: 'index.html',
        //     inject: 'body'
        // }),
        new CopyWebpackPlugin([
            {
                from: 'src/img/',
                to: 'img/',
                toType: 'dir'
            }
        ]),
        new ExtractTextPlugin('css/bundle.min.css')
    ]
};



//Just for my memorization
// module: {
//     rules: [
//         {
//             test: /.jsx?$/,
//             loader: 'babel-loader'
//         },
// {
//     test: /.scss$/,
//     use: [
//         {
//             loader: 'style-loader' // creates style nodes from JS strings
//         },
//         {
//             loader: 'css-loader' // translates CSS into CommonJS
//         },
//         {
//             loader: 'sass-loader' // compiles Sass to CSS
//         }
//     ]
// }

// {
//     test: /\.scss$/,
//         use: ExtractTextPlugin.extract({
//     fallback: 'style-loader',
//     use: ['css-loader', 'sass-loader']
// })
// }
