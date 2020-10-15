const path = require('path')

module.exports = {
    entry: {
        index: './src/index.js',
        header: './src/header.js',
        styles: './src/styles.css',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }, {
                test: /\.(png|jpe?g|ttf)$/i,
                use: ['file-loader'],
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