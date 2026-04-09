# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

基于 Next.js 16 + Fumadocs 框架的文档站点，使用 MDX 编写内容，集成 AI 聊天搜索（OpenRouter），并生成 LLM 友好文本端点（`llms.txt`、`llms-full.txt`）。

## 常用命令

```bash
pnpm dev              # 启动开发服务器
pnpm build            # 生产构建
pnpm start            # 启动生产服务器
pnpm lint             # Biome 代码检查
pnpm format           # Biome 自动格式化
pnpm types:check      # 完整类型检查（生成 MDX 类型 → typegen → tsc）
```

## 技术栈

- **框架**: Next.js 16 (App Router) + Fumadocs (docs 框架层)
- **内容**: MDX，配置在 `source.config.ts`，内容放 `content/docs/`
- **样式**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Lint/格式化**: Biome（替代 ESLint/Prettier）
- **AI 聊天**: AI SDK + OpenRouter（模型默认 Claude 3.5 Sonnet，通过 `OPENROUTER_API_KEY` 和 `OPENROUTER_MODEL` 环境变量配置）
- **搜索**: FlexSearch
- **包管理**: pnpm

## 架构要点

### 内容管道

MDX 文件 → `source.config.ts` 定义 Zod schema → `fumadocs-mdx` 生成到 `.source/`（gitignored） → `lib/source.ts` 通过 `loader()` 统一提供页面数据、页面树、搜索索引和静态参数。postinstall 钩子自动重新生成。

### AI 聊天搜索

`app/api/chat/route.ts` 使用 AI SDK `streamText` + OpenRouter，内置 `search` 工具查询 FlexSearch 文档索引，支持多步推理（`stepCountIs(5)`）。客户端组件在 `components/ai/search.tsx`，通过 `data-client` parts 传递当前页面 URL 上下文。

### LLM 文本端点

三个路由提供 LLM 友好内容：
- `/llms.txt` — 文档索引
- `/llms-full.txt` — 完整内容拼接
- `/llms.mdx/docs/[...slug]` — 单页 Markdown

### 路径别名

- `@/*` → 项目根目录
- `collections/*` → `.source/*`（生成的文件）

### 关键文件

- `lib/source.ts` — Fumadocs source loader，所有页面数据的核心入口
- `lib/shared.ts` — 应用常量（路由、GitHub 配置）
- `lib/layout.shared.tsx` — 共享布局选项
- `components/markdown.tsx` — 客户端 Markdown 渲染器（remark/rehype 管线，带逐词动画）
- `components/ai/search.tsx` — AI 聊天面板 UI
