const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'web',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    filename: 'renderer.js',
    publicPath: isProd ? './' : '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {},
  },
  module: {
    rules: [
      // TypeScript
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // JavaScript
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // CSS Modules
      {
        test: /\.module\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]', // Geliştirici dostu className üretimi
              },
            },
          },
        ],
      },
      // Global CSS
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i, // .module.css'leri dışarıda bırak
        use: ['style-loader', 'css-loader'],
      },
      // Assets
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
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
    }
  },
};
