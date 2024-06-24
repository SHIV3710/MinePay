/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/client/login',
          permanent: false,
        },
      ];
    },
    async headers() {
      return [
        {
          // Apply these headers to all API routes
          source: '/api/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Credentials', value: "true"
            },
            {
              key: 'Access-Control-Allow-Origin',
              value: 'https://minepay-git-master-shiv3710s-projects.vercel.app', // Specify your allowed origin
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,POST,PUT,DELETE,OPTIONS',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value:  "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;