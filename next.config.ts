import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [ // accept every single domain
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ]
  }
};

export default nextConfig;
