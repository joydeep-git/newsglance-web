"use client";

import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { newsCategories } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Suspense } from "react";


// Number of categories to show inline on mobile
const MOBILE_VISIBLE_COUNT = 4;

const categoryEntries = Object.entries(newsCategories);
const mobileVisible = categoryEntries.slice(0, MOBILE_VISIBLE_COUNT);
const mobileHidden = categoryEntries.slice(MOBILE_VISIBLE_COUNT);


const NavbarOptionsInner = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const validKeys = Object.keys(newsCategories);

  const addToUrl = (key: string) => {
    if (!validKeys.includes(key)) {
      router.push("/");
      return;
    }
    router.push(`/?category=${key}`);
  };


  return (
    <div className="bg-project w-full py-1">

      <MaxWidthWrapper>

        <div className="flex items-center gap-2 text-sm overflow-hidden">

          {/* Desktop — show all categories */}
          <div className="hidden sm:flex items-center gap-2 flex-1 overflow-x-auto no-scrollbar">
            {categoryEntries.map(([key, val]) => (
              <button
                key={key}
                onClick={() => addToUrl(key)}
                className={`whitespace-nowrap text-xs font-medium px-2 py-0.5 rounded-full cursor-pointer transition-colors
                  ${activeCategory === key
                    ? "bg-white text-project"
                    : "text-white hover:bg-white/20"
                  }`}
              >
                {val.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile — show first N categories + "More" dropdown */}
          <div className="flex sm:hidden items-center gap-1.5 flex-1 overflow-hidden">
            
            {mobileVisible.map(([key, val]) => (
              <button
                key={key}
                onClick={() => addToUrl(key)}
                className={`whitespace-nowrap text-xs font-medium px-2 py-0.5 rounded-full transition-colors
                  ${activeCategory === key
                    ? "bg-white text-project"
                    : "text-white hover:bg-white/20"
                  }`}
              >
                {val.toUpperCase()}
              </button>
            ))}

            {mobileHidden.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-0.5 text-xs font-medium text-white hover:bg-white/20 px-2 py-0.5 rounded-full transition-colors whitespace-nowrap outline-none">
                    More <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[140px]">
                  {mobileHidden.map(([key, val]) => (
                    <DropdownMenuItem
                      key={key}
                      onClick={() => addToUrl(key)}
                      className={`text-xs font-medium cursor-pointer ${activeCategory === key ? "text-project font-bold" : ""}`}
                    >
                      {val.toUpperCase()}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

        </div>

      </MaxWidthWrapper>
    </div>
  );
};


const NavbarOptions = () => (
  <Suspense fallback={
    <div className="bg-project w-full py-1">
      <MaxWidthWrapper>
        <div className="h-6" />
      </MaxWidthWrapper>
    </div>
  }>
    <NavbarOptionsInner />
  </Suspense>
);

export default NavbarOptions;