//@ts-check
const path = require('node:path');
const { composePlugins, withNx } = require('@nx/next');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} **/
const nextConfig = {
  nx: {},
  turbopack: {
    // Allow Turbopack to resolve the workspace-root Next install in this monorepo.
    root: path.join(__dirname, '../..'),
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
