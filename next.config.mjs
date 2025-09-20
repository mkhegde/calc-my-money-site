// next.config.mjs
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ["mdx", "tsx", "ts", "jsx", "js"], // ← add MDX to page extensions
  experimental: {
    typedRoutes: false,
  },
};

export default withMDX(nextConfig);
