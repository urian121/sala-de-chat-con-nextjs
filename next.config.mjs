/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "default",
    path: "/_next/image",
    domains: ["s3-us-west-2.amazonaws.com", "www.urianviera.com"],
  },
};

export default nextConfig;
