import { openapi } from "@/lib/openapi";

// 从环境变量读取允许的来源，多个域名以逗号分隔
const allowedOrigins = process.env.PROXY_ALLOWED_ORIGINS?.split(",")
  .map((s) => s.trim())
  .filter(Boolean) ?? ["https://your-forguncy-domain.com"];

const proxy = openapi.createProxy({ allowedOrigins });

// 包装代理处理函数，移除导致解码失败的响应头
async function handle(request: Request): Promise<Response> {
  const response = await proxy.handle(request);
  const headers = new Headers(response.headers);
  headers.delete("content-encoding");
  headers.delete("content-length");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export {
  handle as POST,
  handle as GET,
  handle as PUT,
  handle as DELETE,
  handle as PATCH,
};
