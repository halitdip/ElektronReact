const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'electron-renderer',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.js',
    publicPath: isProd ? './' : '/',
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
        generator: {
          filename: 'assets/[name][ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      publicPath: isProd ? './' : '/',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/fonts', to: 'fonts' }, 
      ],
    }),
  ],
  devServer: {
    static: false,
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true,
    client: {
      logging: 'warn',
      overlay: false,
    },
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "connect-src 'self' ws://localhost:8080 http://localhost:8080 http://10.7.2.21:8039"
      ].join('; ')
    },
  },
};
