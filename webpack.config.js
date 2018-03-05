const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: [
    'babel-polyfill',
    './webclient/src/index.jsx',
  ],

  output: {
    path: path.join(__dirname, 'webclient/dist/'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        // Build JS and JSX with Babel
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'webclient/src')],
        query: { presets: ['env', 'react', 'stage-2'] },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        loader: 'babel-loader',
      },
      {
        // Compile SCSS into CSS and allow requiring from JS files
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'webclient/src')],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: './webclient/src/*.html', flatten: true },
    ]),
  ],
};
