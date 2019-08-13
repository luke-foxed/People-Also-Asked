module.exports = {
  entry: ['./src/Index.jsx'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },

      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    path: __dirname + '/static',
    filename: 'bundle.js'
  }
};
