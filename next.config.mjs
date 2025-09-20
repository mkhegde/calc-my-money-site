// next.config.mjs
import createMDX from "@next/mdx";

/** Enable MDX (.mdx files) in the App Router */
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  experimental: {
    typedRoutes: false, // keep this disabled for simpler <Link> typing
  },
};

export default withMDX(nextConfig);
