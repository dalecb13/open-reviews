'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { NavigationMenu } from "radix-ui";

export default function NavigationBar () {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root className="flex gap-5">
      <NavigationMenu.Link
        asChild
        active={pathname.startsWith("/purveyors")}
        className={`NavigationMenuLink hover:text-blue-500
          ${pathname.startsWith("/purveyors") ? "underline-offset-1" : ""}
        `}
      >
        <Link href="/purveyors">Purveyors</Link>
      </NavigationMenu.Link>
      <NavigationMenu.Link
        asChild
        active={pathname.startsWith("/offerings")}
        className={`NavigationMenuLink hover:text-blue-500
          ${pathname.startsWith("/offerings") ? "underline-offset-1" : ""}
        `}
      >
        <Link href="/offerings">Offerings</Link>
      </NavigationMenu.Link>
      <NavigationMenu.Link
        asChild
        active={pathname.startsWith("/reviews")}
        className={`NavigationMenuLink hover:text-blue-500
          ${pathname.startsWith("/reviews") ? "underline-offset-1" : ""}
        `}
      >
        <Link href="/reviews">Reviews</Link>
      </NavigationMenu.Link>
    </NavigationMenu.Root>
  );
}
