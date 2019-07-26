module.exports = {
	entry: [ './src/index.jsx' ],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [ 'babel-loader' ]
			},
		
			{
				test: /\.css/,
				loaders: [ 'style-loader', 'css-loader' ],
				include: __dirname + '/src'
			}
		],
	},
	output: {
		path: __dirname + '/static',
		filename: 'bundle.js'
	}
};
