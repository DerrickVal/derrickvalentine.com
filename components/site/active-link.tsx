"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/** A Link that applies `activeClassName` when it matches the current route. */
export function ActiveLink({
  href,
  children,
  className,
  activeClassName,
  exact = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const active = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link href={href} className={cn(className, active && activeClassName)}>
      {children}
    </Link>
  );
}
