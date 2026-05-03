# rbac-docs

基于 Next.js 16 + Fumadocs 的 RBAC 文档站点，使用 MDX 编写内容，集成 AI 聊天搜索（DeepSeek/OpenRouter），并提供 LLM 友好文本端点。

## 开发

```bash
pnpm dev              # 启动开发服务器
pnpm build            # 生产构建
pnpm lint             # 代码检查（Biome）
```

## 技术栈

- Next.js 16 (App Router) + Fumadocs
- MDX 内容（`content/docs/`）
- Tailwind CSS v4
- Clerk 认证
- AI SDK + DeepSeek/OpenRouter
- Biome（lint & 格式化）
