// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/server/:path*", // proxy path
        destination: "https://blogging-website-server-rose.vercel.app", // ← backend ka URL likho yahan
      },
    ];
  },
};

export default nextConfig;
