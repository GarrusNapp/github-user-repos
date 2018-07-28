var path = require("path");

module.exports = {
  entry:["babel-polyfill", "./js/components/App.js"],
  output: { filename: "./build/out.js"},
  mode: "development", watch: true,
  devtool:"#eval-source-map",
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["es2015", "stage-2", "react"]
        }
      }
    }]
  },
  devServer: {
    inline: true,
    contentBase: "./",
    port: 3001
  }
}
