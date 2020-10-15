const path = require('path')

module.exports = {
	entry: {
		index: './src/index.js',
		header: './src/header.js',
	},
	output: {
		path: path.resolve(__dirname, 'public'),
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			}, {
				test: /\.(png|jpe?g|ttf)$/i,
				loader: 'file-loader',
			}, {
				test: /\.styl$/i,
				use: ['style-loader', 'css-loader', 'stylus-loader'],
			  },
		],
	},
	resolve: {
		alias: {
			'/assets/font.ttf': path.resolve(
				__dirname,
				'src/font.ttf'
			),
			'/assets/bg.jpg': path.resolve(
				__dirname,
				'src/bg.jpg'
			),
		},
	},
}