const composePlugins = require("next-compose-plugins");

const dev = !(process.env.NODE_ENV
  ? process.env.NODE_ENV.indexOf(`production`) + 1
  : false);

const root = '';

let nextEnv = process.env.NEXT_ENV;
for (let argument of process.argv) {
  if (argument.indexOf(`--next-env=`) > -1) {
    nextEnv = argument.split(`=`)[1];
  }
}
const nextConfig = {
  distDir: `dist`,
  // Will only be available on the server side
  serverRuntimeConfig: {
    devProxy: process.env.APP_DEV_PROXY,
    nextEnv,
    pxy: process.env.APP_HTTP_PROXY
  },
  // Will be available on both server and client.
  publicRuntimeConfig: {
    graphql_url: process.env.GRAPHQL_URL,
    prod: !dev,
    root
  },
  // Use a consistent build id for deployments in multiple locations:
  // See: https://github.com/zeit/next.js#configuring-the-build-id
  generateBuildId: async () => {
    return packageJson.version;
  }
};

module.exports = composePlugins([], nextConfig);
