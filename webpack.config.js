const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackCdnPlugin = require("webpack-cdn-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  entry: path.join(__dirname, "/src/index.tsx"),
  devtool: "source-map",
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My Awesome Title",
      template: "index.html"
    }),
    new WebpackCdnPlugin({
      modules: [
        {
          name: "react",
          var: "React",
          path: "umd/react.production.min.js"
        },
        {
          name: "react-dom",
          var: "ReactDOM",
          path: "umd/react-dom.production.min.js"
        }
      ],
      publicPath: "/node_modules"
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
module.exports = (env, argv) => {

  if (argv.mode === "production") {
    config.plugins.unshift(new CleanWebpackPlugin());
    config.externals = {
      ...config.externals,
      "react": "React",
      "react-dom": "ReactDOM"
    };
  }

  return config;
};
