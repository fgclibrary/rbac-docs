"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export function AuthNav() {
  return (
    <div className="flex items-center gap-2">
      <ClerkLoading>
        <Loader2 className="size-4 animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <Show when="signed-out">
          <SignInButton mode="modal" withSignUp={false}>
            <span className="cursor-pointer rounded-md bg-fd-primary px-2.5 py-1.5 font-medium text-fd-primary-foreground text-xs transition-colors hover:bg-fd-primary/90">
              登录
            </span>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "1.5rem",
                  height: "1.5rem",
                },
              },
            }}
          />
        </Show>
      </ClerkLoaded>
    </div>
  );
}
