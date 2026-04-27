import { docs } from "collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { openapiPlugin, openapiSource } from "fumadocs-openapi/server";
import { openapi } from "./openapi";
import { docsContentRoute, docsImageRoute, docsRoute } from "./shared";

// OpenAPI 页面在侧边栏中的目录前缀
const openapiBaseDir = "api";

export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: await openapiSource(openapi, {
      baseDir: openapiBaseDir,
    }),
  },
  {
    baseUrl: docsRoute,
    plugins: [lucideIconsPlugin(), openapiPlugin()],
  }
);

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join("/")}`,
  };
}

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  // OpenAPI 页面：返回序列化的 schema 内容
  if (page.type === "openapi") {
    return JSON.stringify(page.data.getSchema().bundled, null, 2);
  }

  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
