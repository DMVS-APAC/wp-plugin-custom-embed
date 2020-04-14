const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DelWebpackPlugin = require('del-webpack-plugin');

module.exports = (env, options) => {
    const dotenv = new Dotenv();
    const isProd = options.mode === 'production';

    return {
        entry: {
            "dm-ce": "./src/entries/dm-embed.ts"
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? '[name].min.js' : '[name].js',
            chunkFilename: isProd ? '[id].min.chunk.js' : '[id].chunk.js',
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                    'postcss-loader',   
                    ],
                },
            ]
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Dailymotion Video Embed',
                template: 'src/entries/index.html',
                filename: 'index.html',
                chunks: ['dm-ce'],
                showErrors : isProd ? false : true,
                minify: isProd ? {
                    html5                          : true,
                    collapseWhitespace             : true,
                    minifyCSS                      : true,
                    minifyJS                       : true,
                    minifyURLs                     : false,
                    removeAttributeQuotes          : true,
                    removeComments                 : true,
                    removeEmptyAttributes          : true,
                    removeOptionalTags             : true,
                    removeRedundantAttributes      : true,
                    removeScriptTypeAttributes     : true,
                    removeStyleLinkTypeAttributese : true,
                    useShortDoctype                : true
                } : false,
                hash: false
            }),
            // new DelWebpackPlugin({
            //     include: ['**'],
            //     exclude: [],
            //     info: true,
            //     keepGeneratedAssets: true,
            //     allowExternal: false
            // }),
            dotenv
        ]
    }
}