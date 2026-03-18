//@ts-check
const { composePlugins, withNx } = require('@nx/next');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} **/
const nextConfig = {
  nx: {},
  turbopack: {
    // Keep Turbopack aligned with Nx's tracing root for monorepo builds.
    root: __dirname,
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
