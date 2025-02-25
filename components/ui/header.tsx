"use client";

import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { PanelLeftOpen } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarButton from "../sidebar/sidebar-button";
import { useSidebar } from "./sidebar";
import Switch from "./switch";

export default function Header() {
  const [isChecked, setIsChecked] = useState(false);
  const pathName = usePathname();
  const { setTheme, theme } = useTheme();
  const { isMobile } = useSidebar();

  useEffect(() => {
    if (theme === "dark") setIsChecked(true);
    else setIsChecked(false);
  }, [theme]);

  return (
    <header className="sticky left-0 right-0 top-0 z-10 bg-background xl:relative xl:z-0">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 py-4">
        <section className="flex items-center gap-4">
          <section className="xl:fixed xl:left-4 xl:top-4">
            <SidebarButton>
              <PanelLeftOpen size={20} />
            </SidebarButton>
          </section>
          <Link
            href="/"
            passHref
            className="flex flex-shrink-0 items-center gap-2 hover:opacity-95 hover:drop-shadow-lg xl:ml-10"
          >
            <Image
              src="/images/main-logo.png"
              alt="logo"
              height={0}
              width={0}
              className="h-7 w-full"
              sizes="28px"
            />
            <div className="hidden whitespace-nowrap text-lg font-bold text-black dark:text-white md:block">
              Codefug Blog
            </div>
          </Link>
        </section>
        <section className="flex items-center gap-4 text-sm font-semibold md:text-base">
          {!isMobile && (
            <nav className="flex items-center gap-4 text-sm font-semibold md:text-base">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  href={item.href}
                  passHref
                  key={item.label}
                  className={cn(
                    `hidden text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg hover:dark:text-white lg:block`,
                    pathName === item.href && "text-black dark:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          <Switch
            checked={isChecked}
            onCheckedChange={() =>
              theme === "light" ? setTheme("dark") : setTheme("light")
            }
          />
        </section>
      </div>
    </header>
  );
}
