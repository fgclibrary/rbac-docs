import { createAPIPage } from "fumadocs-openapi/ui";
import { openapi, tokenEndpoint } from "@/lib/openapi";

export const APIPage = createAPIPage(openapi);
export const AuthAPIPage = createAPIPage(tokenEndpoint);
