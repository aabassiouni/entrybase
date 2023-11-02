/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@radix-ui/react-icons'],
        // serverActions: true,
    }
}

module.exports = nextConfig
