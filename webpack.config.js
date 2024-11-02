const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Clean the output directory before each build
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Rule for processing CSS files
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(glb|gltf)$/, // Rule for processing GLTF and GLB files
                type: 'asset/resource', // Treat GLB and GLTF files as resources
                generator: {
                    filename: 'assets/models/[name][ext]', // Output path for models
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Template for HTML file
            inject: 'body', // Inject scripts into the body
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'), // Serve static files from the 'dist' directory
        hot: true, // Enable Hot Module Replacement
        port: 9000, // Specify port
    },
    resolve: {
        extensions: ['.js'], // Resolve JavaScript files automatically
    },
};
