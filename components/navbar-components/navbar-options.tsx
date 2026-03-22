"use client";

import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { newsCategories } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Globe, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Suspense, useState, useEffect } from "react";
import { SearchModal } from "./searchModal";
import Link from "next/link";
import userLocationService from "@/services/userLocationService";


// Number of categories to show inline on mobile
const MOBILE_VISIBLE_COUNT = 4;

const categoryEntries = Object.entries(newsCategories);
const mobileVisible = categoryEntries.slice(0, MOBILE_VISIBLE_COUNT);
const mobileHidden = categoryEntries.slice(MOBILE_VISIBLE_COUNT);


const NavbarOptionsInner = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [searchOpen, setSearchOpen] = useState(false);
  const [countryName, setCountryName] = useState<string | null>(null);
  const [countrySlug, setCountrySlug] = useState<string | null>(null);

  const validKeys = Object.keys(newsCategories);

  // Fetch user country asynchronously on mount
  useEffect(() => {
    userLocationService.getLocationData().then((loc) => {
      if (!loc) return;
      // Convert country code IN to "India"
      try {
        const displayName = new Intl.DisplayNames(["en"], { type: "region" }).of(loc.countryCode);
        setCountryName(displayName ?? loc.city);
        setCountrySlug((displayName ?? loc.city).toLowerCase());
      } catch {
        setCountryName(loc.city);
        setCountrySlug(loc.city.toLowerCase());
      }
    });
  }, []);

  const addToUrl = (key: string) => {
    if (!validKeys.includes(key)) {
      router.push("/");
      return;
    }
    router.push(`/?category=${key}`);
  };


  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className="bg-project w-full py-1">

        <MaxWidthWrapper>

          <div className="flex items-center gap-2 text-sm">

            {/* Desktop — show all categories */}
            <div className="hidden sm:flex items-center gap-0 flex-1">

              <Link href="/" className="whitespace-nowrap text-xs font-medium px-3 py-1 cursor-pointer transition-colors text-white">Home</Link>

              {/* Separator after HOME */}
              <span className="text-white/30 text-[10px] select-none">|</span>

              {categoryEntries.map(([key, val], i) => (
                <span key={key} className="flex items-center">
                  <button
                    onClick={() => addToUrl(key)}
                    className={`whitespace-nowrap text-xs font-medium px-3 py-1 cursor-pointer transition-colors
                      ${activeCategory === key
                        ? "text-white underline underline-offset-4 decoration-white"
                        : "text-white/85 hover:text-white"
                      }`}
                  >
                    {val}
                  </button>
                  {i < categoryEntries.length - 1 && (
                    <span className="text-white/30 text-[10px] select-none">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Mobile — first N visible + More dropdown */}
            <div className="flex sm:hidden items-center gap-0 flex-1 overflow-hidden">
              {mobileVisible.map(([key, val], i) => (
                <span key={key} className="flex items-center">
                  <button
                    onClick={() => addToUrl(key)}
                    className={`whitespace-nowrap text-xs font-medium px-2.5 py-1 cursor-pointer transition-colors
                      ${activeCategory === key
                        ? "text-white underline underline-offset-4 decoration-white"
                        : "text-white/85 hover:text-white"
                      }`}
                  >
                    {val}
                  </button>
                  {i < mobileVisible.length - 1 && (
                    <span className="text-white/30 text-[10px] select-none">|</span>
                  )}
                </span>
              ))}

              {mobileHidden.length > 0 && (
                <>
                  <span className="text-white/30 text-[10px] select-none">|</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-0.5 text-xs font-medium text-white/85 hover:text-white px-2.5 py-1 transition-colors whitespace-nowrap outline-none">
                        More <ChevronDown className="h-3 w-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-[140px]">
                      {mobileHidden.map(([key, val]) => (
                        <DropdownMenuItem
                          key={key}
                          onClick={() => addToUrl(key)}
                          className={`text-xs font-medium cursor-pointer ${activeCategory === key ? "text-project font-bold" : ""}`}
                        >
                          {val}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>

            {/* Right side — country name + search icon */}
            <div className="flex items-center gap-1 ml-auto shrink-0">

              {/* Country link — only shows once location is resolved */}
              {countryName && countrySlug && (
                <button
                  onClick={() => router.push(`/?country=${countrySlug}`)}
                  className="hidden sm:flex items-center gap-1 text-xs font-medium text-white/85 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
                >
                  <Globe className="h-3 w-3" />
                  {countryName}
                </button>
              )}

              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 transition-colors"
              >
                <Search className="h-3.5 w-3.5 text-white" />
              </button>

            </div>

          </div>

        </MaxWidthWrapper>
      </div>
    </>
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