/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@radix-ui/react-icons'],
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        remotePatterns: [
            {
                hostname: 'utfs.io',
                protocol: 'https',
            }
        ]
    },
}

module.exports = nextConfig
