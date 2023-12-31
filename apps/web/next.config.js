/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@radix-ui/react-icons'],
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
