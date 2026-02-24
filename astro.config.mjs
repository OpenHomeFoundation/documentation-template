// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import starlightBlog from "starlight-blog";
import { remarkAlert } from "remark-github-blockquote-alert";

import { siteConfig } from "./src/site.config.ts";

// Netlify specific
const isProduction =
  process.env.CONTEXT === "production" || !process.env.CONTEXT;

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  markdown: {
    remarkPlugins: [remarkAlert],
  },
  integrations: [
    starlight({
      title: siteConfig.title,
      description: siteConfig.description,
      titleDelimiter: "-",
      editLink: isProduction
        ? {
            baseUrl: `${siteConfig.github}/edit/main/`,
          }
        : {},
      logo: {
        light: "./src/assets/logo--dark.svg",
        dark: "./src/assets/logo--light.svg",
        replacesTitle: true,
      },
      favicon: "/favicon.svg",
      pagination: siteConfig.pagination,
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: siteConfig.github,
        },
      ],
      head: [
        {
          tag: "meta",
          attrs: {
            name: "robots",
            content: isProduction ? "index, follow" : "noindex, nofollow",
          },
        },
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          content: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Open Home Foundation",
            url: "https://www.openhomefoundation.org",
            description:
              "The Open Home Foundation fights for the fundamental principles of privacy, choice, and sustainability for smart homes.",
            sameAs: ["https://github.com/OpenHomeFoundation"],
          }),
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.svg",
          },
        },
        {
          tag: "script",
          content: `document.addEventListener('keydown', function(e) {
						if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
							e.preventDefault();
							document.querySelector('button[data-open-modal]')?.click();
						}
					});`,
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: `${siteConfig.site}/assets/banner.png`,
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:image",
            content: `${siteConfig.site}/assets/banner.png`,
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:card",
            content: "summary_large_image",
          },
        },
      ],
      plugins: [
        starlightBlog({
          title: "Blog",
          prefix: "blog",
          postCount: 10,
          recentPostCount: 5,
          authors: {
            "author_name (key)": {
              name: "xxx (Full name - appears on blog posts)",
              title: "xxx (Role)",
              picture:
                "https://avatars.githubusercontent.com/[GITHUB_USERNAME]?size=64",
              url: "https://github.com/OpenHomeFoundation (GitHub profile URL)",
            },
          },
        }),
      ],
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      components: {
        Head: "./src/components/Head.astro",
      },
    }),
  ],
});
