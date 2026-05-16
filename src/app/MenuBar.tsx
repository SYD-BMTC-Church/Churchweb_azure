import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navigationMenu } from "@/lib/constant";
import { ChevronDown, Music } from "lucide-react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import LucidIcon from "@/lib/icon";

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
                      {item.subMenu.map((subItem) =>
                        subItem.special ? (
                          <li key={subItem.label} className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                href={subItem.url}
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                              >
                                <div className="mt-4 mb-2 text-lg font-medium text-primary-foreground">
                                  {subItem.label}
                                </div>
                                {subItem.description != undefined && (
                                  <p className="text-sm leading-tight text-primary-foreground/90">
                                    {subItem.description}
                                  </p>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ) : (
                          <li key={subItem.label}>
                            <NavigationMenuLink asChild>
                              <Link
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href={subItem.url}
                              >
                                <div className="text-sm font-medium leading-none flex items-center gap-2">
                                  {subItem.icon && (
                                    <LucidIcon name={subItem.icon} />
                                  )}
                                  {subItem.label}
                                </div>
                                {subItem.description != undefined && (
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ),
                      )}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  key={item.label}
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  {item?.render != undefined ? (
                    item.render()
                  ) : (
                    <Link href={item.url || ""}>{item.label}</Link>
                  )}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      {/* Mobile Navigation - Sidebar */}
      <SidebarProvider className="w-auto min-h-auto md:hidden">
        <SidebarTrigger />
        <Sidebar side="right">
          <SidebarContent className="p-8">
            {navigationMenu.map((item, index) => (
              <SidebarMenu key={index}>
                {item.subMenu ? (
                  <Collapsible className="group/collapsible">
                    <SidebarGroup>
                      <SidebarGroupLabel asChild>
                        <CollapsibleTrigger className="h-12 text-base font-medium hover:bg-primary content-center text-sidebar-accent-foreground">
                          {item.label}
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                      </SidebarGroupLabel>
                      <CollapsibleContent>
                        <SidebarMenu>
                          {item.subMenu.map((subItem) => (
                            <SidebarMenuItem key={subItem.label}>
                              <SidebarMenuButton asChild>
                                <a href={subItem.url}>
                                  {subItem.icon && (
                                    <LucidIcon name={subItem.icon} />
                                  )}
                                  {subItem.label}
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </SidebarGroup>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="h-12 px-4 text-base font-medium hover:bg-primary/10"
                    >
                      {item?.render !== undefined ? (
                        item.render()
                      ) : (
                        <Link href={item.url || ""} className="w-full">
                          {item.label}
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            ))}
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </>
  );
}
