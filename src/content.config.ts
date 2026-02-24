import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { blogSchema } from "starlight-blog/schema";

// WITH BLOG
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: (context) => blogSchema(context),
    }),
  }),
};

// WITHOUT BLOG
// export const collections = {
// 	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
// };
