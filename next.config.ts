import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  basePath:
    process.env.NODE_ENV === "production" ? "/~dante.kirsman/cpsc383" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withContentCollections(nextConfig);
