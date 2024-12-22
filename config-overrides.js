const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

function extractNamespaceAndLocale(absoluteFilename) {
  const normalizedPath = path.normalize(absoluteFilename);
  const localesIndex = normalizedPath.indexOf('/locales/');

  const componentPath = normalizedPath.slice(0, localesIndex);
  const namespace = componentPath.split(/[\\/]/).pop();

  const localePath = normalizedPath.slice(localesIndex + '/locales/'.length);
  const locale = localePath.split(/[\\/]/)[0];

  return { namespace, locale };
}

module.exports = function override(config) {
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/**/locales/*/strings.json'),
          to: ({ absoluteFilename }) => {
            const { namespace, locale } = extractNamespaceAndLocale(absoluteFilename);
            return `component-locales/${namespace}/${locale}/strings.json`
          },
          context: path.resolve(__dirname, 'src'),
        },
      ],
    })
  );

  return config;
};
