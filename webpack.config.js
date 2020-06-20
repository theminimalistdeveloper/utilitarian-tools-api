const path = require('path');

const config = {
  stats: 'errors-only',
  mode: 'production',
  target: 'node',
  entry: {
    'AGCreateSuggestion/index': './src/AGCreateSuggestion/index',
  },
  optimization: {
    minimize: false,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  plugins: [],
  externals: {
    'aws-sdk': 'aws-sdk',
  },
};

module.exports = config;
