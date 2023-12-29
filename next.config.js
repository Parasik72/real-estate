/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
    API_ROOT: `${__dirname}/server`
  },
}

module.exports = nextConfig
