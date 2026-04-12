import { Image } from "fumadocs-core/framework";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

// 表格相关组件 - OpenAI 风格简洁表格（无圆角、无网格竖线、仅水平分隔线）
function Table({
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-auto">
      <table className="mt-0 w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  );
}

function Thead({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props}>{children}</thead>;
}

function Th({
  children,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="border-table-border border-s-0 border-b bg-transparent px-4 py-2.5 text-left font-semibold"
      {...props}
    >
      {children}
    </th>
  );
}

function Tbody({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props}>{children}</tbody>;
}

function Tr({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props}>{children}</tr>;
}

function Td({
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className="border-table-border-subtle border-s-0 border-b px-4 py-2.5"
      {...props}
    >
      {children}
    </td>
  );
}

// 图片组件 - 添加 priority 消除 LCP 警告
function Img(props: React.ComponentPropsWithoutRef<"img">) {
  const { className, src, alt, ...rest } = props;
  return (
    <Image
      {...rest}
      alt={alt}
      className={cn("rounded-lg", className)}
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
      src={src as string | undefined}
    />
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    table: Table,
    thead: Thead,
    tbody: Tbody,
    tr: Tr,
    th: Th,
    td: Td,
    img: Img,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
