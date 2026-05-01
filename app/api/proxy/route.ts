import { openapi } from "@/lib/openapi";

const proxy = openapi.createProxy({
  allowedOrigins: ["https://hzg.orb.local"],
});

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
