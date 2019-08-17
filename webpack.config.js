module.exports = {
  entry: ["./src/Index.jsx"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },

      {
        test: /\.css/,
        loaders: ["style-loader", "css-loader"]
      },

      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader"
          }
        ]
      }
    ]
  },
  output: {
    path: __dirname + "/static",
    filename: "bundle.js"
  }
};
