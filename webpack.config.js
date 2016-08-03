var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		'webpack-hot-middleware/client?http://localhost:3000//__webpack_hmr&reload=true',
		'./public/js/index'
	],
	output: {
		path: path.join(__dirname, 'public/static'),
		filename: 'bundle.js',
		publicPath: 'http://localhost:3000/public/static'
	},
	resolve: {
		extensions: ['', '.js']
	},
	devtool: 'eval-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: 'babel',
				include: path.join(__dirname, 'public/js'),
				exclude: path.join(__dirname, 'node_modules'),
				query: {
					cacheDirectory: true,
					plugins: ['transform-runtime'],
					presets: ['es2015', 'react', 'stage-0']
				}
			}, {
				test: /\.css?$/,
				loader: 'style-loader!css-loader',
				include: [
					path.join(__dirname, 'public')
				]
			}
		]
	}
};
