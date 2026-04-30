import { createOpenAPI } from "fumadocs-openapi/server";

export const openapi = createOpenAPI({
  input: ["./openapi.json"],
});

export const tokenEndpoint = createOpenAPI({
  input: ["./auth-openapi.json"],
});
