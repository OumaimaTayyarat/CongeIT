"use client";

import { Icons } from "@/components/Other/icons";
import { Button } from "@/components/ui/button";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";  // Assure-toi que useRouter est importé

export function AuthForm() {
  const [providers, setProviders] = useState<
    Record<string, ClientSafeProvider>
  >({});

  useEffect(() => {
    async function obtenirLesProviders() {
      const p = await getProviders();
      setProviders(p as Record<string, ClientSafeProvider>);
    }
    obtenirLesProviders();
  }, []);

  return (
    <div className="grid gap-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Continuer avec
          </span>
        </div>
      </div>

      {providers &&
        !!Object.keys(providers).length &&
        Object.values(providers!).map((provider) => (
          <Button
            key={provider.name}
            variant="outline"
            type="button"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/portal",
                redirect: false
              })
            }
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        ))}
    </div>
  );
}
