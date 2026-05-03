import { HomeLayout } from "fumadocs-ui/layouts/home";
import { AuthNav } from "@/components/auth-nav";
import { baseOptions } from "@/lib/layout.shared";

const options = baseOptions();

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      {...options}
      links={[
        ...(options.links ?? []),
        {
          type: "custom" as const,
          secondary: true,
          children: <AuthNav />,
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
