import Link from "next/link";
import { NavigationMenu } from "radix-ui";

export default function NavigationBar () {
  return (
    <NavigationMenu.Root className="flex gap-5">
      {/* <NavigationMenu.Link asChild active={pathname.startsWith("/purveyors")}> */}
      <NavigationMenu.Link asChild>
        <Link href="/purveyors">Purveyors</Link>
      </NavigationMenu.Link>
      {/* <NavigationMenu.Link asChild active={pathname === "/documents"}> */}
      <NavigationMenu.Link asChild>
        <Link href="/offerings">Offerings</Link>
      </NavigationMenu.Link>
    </NavigationMenu.Root>
  );
}
