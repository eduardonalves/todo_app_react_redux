const webpack = require('webpack')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')

module.exports = {
    entry: './public/src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './app.js'
    },
    devServer: {
        port: 3000,
        contentBase: './public',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    plugins: [ 
        new MiniCssExtractPlugin({
            filename: 'app.css',
          })
    ],
    module: {
        rules: [{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-object-rest-spread']
            }
        },{ 
            test: /\.css$/, 
            loader: "style-loader!css-loader" 
          },
          {
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'url-loader?limit=10000',
          },
          {
            test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
            use: 'file-loader',
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              'file-loader?name=images/[name].[ext]',
              'image-webpack-loader?bypassOnDebug'
            ]
          }]
    }
}