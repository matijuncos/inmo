/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {

        esmExternals: "loose", // <-- add this
        serverComponentsExternalPackages: ["mongoose"] // <-- and this
      },
    images: {
        remotePatterns : [
        {
            protocol: 'https',
            hostname: 'img.freepik.com',
            port: '',
            pathname: '/fotos-premium/**'
        }
    ]},
    webpack: (config) => {
        config.experiments = {
            layers: true,
          topLevelAwait: true
        };
        return config;
      },
};

export default nextConfig;
