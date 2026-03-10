//@ts-check
const { composePlugins, withNx } = require('@nx/next');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} **/
const nextConfig = {
  nx: {},
  output: 'export', // generates static HTML/CSS/JS
  trailingSlash: true,
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
