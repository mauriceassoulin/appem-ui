"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Components", href: "/components" },
  { label: "Blocks", href: "/components/blocks" },
  { label: "Tokens", href: "/tokens" },
];

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 h-14 border-b border-ink-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo.jpg"
            alt="APPEM"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="text-lg font-display font-normal text-ink-950">
            APPEM UI
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  isActive
                    ? "text-brand-700 font-medium"
                    : "text-ink-500 hover:text-ink-700"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
