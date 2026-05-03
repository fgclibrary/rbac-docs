import type { Document } from "fumadocs-openapi";
import { createOpenAPI } from "fumadocs-openapi/server";
import authOpenapiDoc from "../auth-openapi.json";
import openapiDoc from "../openapi.json";

// 从环境变量读取 API 服务器地址，未设置时保留 JSON 中的原始值
const apiServerUrl = process.env.OPENAPI_SERVER_URL;
const authServerUrl = process.env.AUTH_SERVER_URL;

function resolveServers(doc: Document, serverUrl?: string): Document {
  if (!serverUrl) {
    return doc;
  }
  return { ...doc, servers: [{ url: serverUrl }] };
}

export const openapi = createOpenAPI({
  input: () => ({
    default: resolveServers(openapiDoc as Document, apiServerUrl),
  }),
  proxyUrl: "/api/proxy",
});

export const tokenEndpoint = createOpenAPI({
  input: () => ({
    default: resolveServers(authOpenapiDoc as Document, authServerUrl),
  }),
  proxyUrl: "/api/proxy",
});
