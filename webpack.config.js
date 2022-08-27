const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  entry: "./assets/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test:/\.jpeg/,
        type:"assets/resource"
      }
      
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns:[
        {
          from:path.resolve(__dirname,'assets','icons'),
          to:"assets/icons"
        }
      ]
    }),
    new CopyPlugin({
      patterns:[
        {
          from:path.resolve(__dirname,'assets','images'),
          to:"assets/images"
        }
      ]
    }),
    new CopyPlugin({
      patterns:[
        {
          from:path.resolve(__dirname,'assets','fonts'),
          to:"assets/fonts"
        }
      ]
    })
  ],
  optimization:{
    minimize:true,
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
};
