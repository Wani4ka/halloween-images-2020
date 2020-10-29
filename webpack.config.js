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
				test: /\.jpg$/i,
				loader: 'file-loader',
			}, {
				test: /\.sass$/,
				use: [
					{loader: MiniCssExtractPlugin.loader, options: {publicPath: '/dist'}},
					{loader: 'css-loader'},
					{loader: 'sass-loader'},
				  ]
			  }
		],
	},
	resolve: {
		alias: {
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