import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { navigationMenu } from "@/lib/constant";

export function MenuBar() {
  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {navigationMenu.map((item) => (
            <NavigationMenuItem key={item.label}>
              {item.subMenu ? (
                <>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {/* First item gets special styling */}
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.subMenu[0].url}
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-primary-foreground">
                              {item.subMenu[0].label}
                            </div>
                            <p className="text-sm leading-tight text-primary-foreground/90">
                              {item.subMenu[0].description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {/* Remaining submenu items */}
                      {item.subMenu.slice(1).map((subItem) => (
                        <li key={subItem.label}>
                          <NavigationMenuLink asChild>
                            <Link
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href={subItem.url}
                            >
                              <div className="text-sm font-medium leading-none">
                                {subItem.label}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subItem.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link href={item.url}>{item.label}</Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 py-4">
            {navigationMenu.map((item, index) => (
              <React.Fragment key={item.label}>
                <Link
                  href={item.url || ""}
                  className="ml-4 text-md font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
                {index < navigationMenu.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
