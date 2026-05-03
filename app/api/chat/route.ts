import { createDeepSeek } from "@ai-sdk/deepseek";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { Document, type DocumentData } from "flexsearch";
import { z } from "zod";
import { source } from "@/lib/source";

interface CustomDocument extends DocumentData {
  content: string;
  description: string;
  title: string;
  url: string;
}

export type ChatUIMessage = UIMessage<
  never,
  {
    client: {
      location: string;
    };
  }
>;

const searchServer = createSearchServer();

async function createSearchServer() {
  const search = new Document<CustomDocument>({
    document: {
      id: "url",
      index: ["title", "description", "content"],
      store: true,
    },
  });

  const docs = await chunkedAll(
    source.getPages().map(async (page) => {
      if (!("getText" in page.data)) {
        return null;
      }

      return {
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        content: await page.data.getText("processed"),
      } as CustomDocument;
    })
  );

  for (const doc of docs) {
    if (doc) {
      search.add(doc);
    }
  }

  return search;
}

async function chunkedAll<O>(promises: Promise<O>[]): Promise<O[]> {
  const SIZE = 50;
  const out: O[] = [];
  for (let i = 0; i < promises.length; i += SIZE) {
    out.push(...(await Promise.all(promises.slice(i, i + SIZE))));
  }
  return out;
}

const provider = createDeepSeek({
  apiKey: process.env.AI_API_KEY,
});

/** System prompt, you can update it to provide more specific information */
const systemPrompt = [
  "你是一个文档站点的 AI 助手，请使用中文回答问题。",
  "回答前使用 `search` 工具检索相关文档内容。",
  "`search` 工具返回文档的原始 JSON 结果，请基于搜索结果回答，并用文档的 `url` 字段以 Markdown 链接形式引用来源。",
  "如果在搜索结果中找不到答案，请说明并提供更好的搜索建议。",
].join("\n");

export async function POST(req: Request, _ctx: RouteContext<"/api/chat">) {
  const reqJson = await req.json();

  const result = streamText({
    model: provider.chat(process.env.AI_MODEL ?? "deepseek-chat"),
    stopWhen: stepCountIs(5),
    tools: {
      search: searchTool,
    },
    messages: [
      { role: "system", content: systemPrompt },
      ...(await convertToModelMessages<ChatUIMessage>(reqJson.messages ?? [], {
        convertDataPart(part) {
          if (part.type === "data-client") {
            return {
              type: "text",
              text: `[Client Context: ${JSON.stringify(part.data)}]`,
            };
          }
        },
      })),
    ],
    toolChoice: "auto",
  });

  return result.toUIMessageStreamResponse();
}

export type SearchTool = typeof searchTool;

const searchTool = tool({
  description: "Search the docs content and return raw JSON results.",
  inputSchema: z.object({
    query: z.string(),
    limit: z.number().int().min(1).max(100).default(10),
  }),
  async execute({ query, limit }) {
    const search = await searchServer;
    return await search.searchAsync(query, {
      limit,
      merge: true,
      enrich: true,
    });
  },
});
