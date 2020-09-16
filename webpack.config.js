const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDEV = process.env.NODE_ENV === 'development';
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.js",
  mode: isDEV ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-react"] }
      },
      {
        test: /\.css$/,
        use: [ 
            isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
           "css-loader"
        ]
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]'
            },
          }
        ]
      },
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    host: process.env.HOST,
    port: 3000,
    hotOnly: true,
    overlay: true,
    stats: "errors-only",
    open: true
  },
  plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new HtmlWebpackPlugin({
            title: "Title",
        }),
        new Dotenv()
  ]
};