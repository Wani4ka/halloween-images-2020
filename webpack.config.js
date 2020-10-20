const path = require('path'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: {
		index: './src/index.js',
		header: './src/header.js',
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
				use: [
					{loader: MiniCssExtractPlugin.loader, options: {publicPath: '/dist'}},
          			{loader: 'css-loader'},
          			{loader: 'stylus-loader'}
				]
			},
		],
	},
	resolve: {
		alias: {
			'/dist/font.ttf': path.resolve(
				__dirname,
				'src/font.ttf'
			),
			'/dist/bg.jpg': path.resolve(
				__dirname,
				'src/bg.jpg'
			),
		},
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
}