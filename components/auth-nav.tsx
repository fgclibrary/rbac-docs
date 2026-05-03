"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  Show,
  SignInButton,
  SignUpButton,
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
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
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
