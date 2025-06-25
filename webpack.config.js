const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'electron-renderer',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.js',
    // Use absolute path in dev server and relative path in production so
    // packaged builds load assets correctly from the filesystem
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.js', '.jsx'],      
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    // Let webpack-dev-server serve files from memory only. The template
    // is handled by HtmlWebpackPlugin, so serving the public folder is
    // unnecessary and can cause duplicate responses.
    static: false,
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true,
    client: {
      logging: 'warn',
      overlay: false,
    },
  },
};
