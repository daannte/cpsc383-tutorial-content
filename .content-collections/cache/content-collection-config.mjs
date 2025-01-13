// lib/rehype-slug.ts
import { visit } from "unist-util-visit";
var rehypeSlug = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName && node.tagName.startsWith("h")) {
        const headerText = node.children.map((child) => child.type === "text" ? child.value : "").join("").split("(")[0].trim();
        const cleanSlug = headerText.toLowerCase().replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, "-");
        node.properties.id = cleanSlug;
      }
    });
  };
};

// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode from "rehype-pretty-code";
var prettyCodeOptions = {
  theme: {
    dark: "tokyo-night",
    light: "catppuccin-latte"
  }
};
var tutorials = defineCollection({
  name: "Tutorials",
  directory: "content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string()
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]]
    });
    return {
      ...document,
      mdx,
      slug: document._meta.path
    };
  }
});
var content_collections_default = defineConfig({
  collections: [tutorials]
});
export {
  content_collections_default as default
};
