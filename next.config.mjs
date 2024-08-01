/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co'
            },
            {
                protocol: 'https',
                hostname: 'media.licdn.com'
            }
        ]
    },
    publicRuntimeConfig: {
        AUTH_URL: process.env.NODE_ENV === 'development' ? process.env.AUTH_URL : process.env.PUBLIC_AUTH_URL,
        API_SERVER_URL: process.env.NODE_ENV === 'development' ? process.env.API_SERVER_URL : process.env.PUBLIC_API_SERVER_URL,
    },
};

export default nextConfig;
