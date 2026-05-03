import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Bot } from "lucide-react";
import {
  AISearch,
  AISearchPanel,
  AISearchTrigger,
} from "@/components/ai/search";
import { ThemeSwitchWithAuth } from "@/components/theme-switch-with-auth";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      slots={{
        themeSwitch: ThemeSwitchWithAuth,
      }}
      tabs={{
        transform(option, node) {
          const meta = source.getNodeMeta(node);
          if (!(meta && node.icon)) {
            return option;
          }

          return {
            ...option,
            icon: (
              <div className="size-full rounded-lg max-md:border max-md:p-1.5 [&_svg]:size-full">
                {node.icon}
              </div>
            ),
          };
        },
      }}
    >
      <AISearch>
        <AISearchPanel />
        <AISearchTrigger
          className={cn(
            buttonVariants({
              variant: "secondary",
              className: "rounded-2xl text-fd-muted-foreground",
            })
          )}
          position="float"
        >
          <Bot className="size-4.5" />
          AI 助手
        </AISearchTrigger>
      </AISearch>

      {children}
    </DocsLayout>
  );
}
