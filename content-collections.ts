import { rehypeSlug } from "@/lib/rehype-slug";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

const prettyCodeOptions: Options = {
  theme: {
    dark: "tokyo-night",
    light: "catppuccin-latte",
  },
};

const tutorials = defineCollection({
  name: "Tutorials",
  directory: "content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    tutorial: z.number().min(1).max(2),
    disabled: z.boolean(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
    });
    return {
      ...document,
      mdx,
      slug: document._meta.path,
      week: document._meta.path.split("/")[0],
    };
  },
});

export default defineConfig({
  collections: [tutorials],
});
