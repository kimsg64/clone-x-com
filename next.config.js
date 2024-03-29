/** @type {import('next').NextConfig} */

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/upload/:slug',
                destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`,
            },
        ];
    },
};

module.exports = withVanillaExtract(nextConfig);
