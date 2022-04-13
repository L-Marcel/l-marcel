module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        }]
      }
    ]
  },
  webpack: (config) => {
    /*config.module.rules.push({
      test: /\.md$/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]',
      },
    });*/
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  images: {
    domains: [
      "github-readme-stats.vercel.app",
      "img.shields.io",
    ]
  },
  i18n: {
    locales: ['en-US', 'pt-BR'],
    defaultLocale: 'en-US',
  }
}
