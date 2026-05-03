import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookOpenText } from "lucide-react";
import { appName } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    links: [
      {
        type: "icon",
        label: "葡萄城学堂",
        icon: <BookOpenText />,
        text: "葡萄城学堂",
        url: "https://learn.grapecity.com.cn/home",
      },
    ],
  };
}
