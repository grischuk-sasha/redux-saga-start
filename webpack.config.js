const path = require('path');
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const webpack = require( 'webpack' );

const srcDIr = path.resolve('src');

module.exports = {
    context: __dirname,
    entry: path.join(srcDIr, 'app.js') ,
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
           template: path.join(srcDIr, 'index.html'),
        }),
        new webpack.ProvidePlugin({
            // required by some @atlaskit components, but Webpack5 does not provide node.js polyfills anymore
            process: 'process/browser',
        }),
    ]
};