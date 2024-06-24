const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/client/login",
                permanent:false,
            }
        ]
    }
}

export default nextConfig;