"use client";

import NewsglanceLogo from "@/public/assets/icons/newsglance";
import MaxWidthWrapper from "../maxWidthWrapper";
import ProfileMenu from "@/components/navbar-components/profileMenu";
import Link from "next/link";
import dateUtlity from "@/utils/dateUtility";


const Navbar = () => {

  const dateStr = dateUtlity.formatDateLong(new Date());

  return (
    <div className={`absolute w-full top-0 right-0 left-0`}>

      <MaxWidthWrapper>

        <nav className="flex items-center justify-between w-full mx-auto py-1.5">

          {/* Left — Date */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs text-muted-foreground font-medium hidden sm:block truncate">
              {dateStr}
            </span>

            {/* Mobile fallback — short date */}
            <span className="text-xs text-muted-foreground font-medium sm:hidden">
              {dateUtlity.formatDateOnly(new Date())}
            </span>
          </div>

          {/* Center — Logo */}
          <Link href={"/"} className="absolute left-1/2 transform -translate-x-1/2">
            <NewsglanceLogo color="#000000" size={5} />
          </Link>

          {/* Right — Location + Profile */}
          <ProfileMenu />

        </nav>

      </MaxWidthWrapper>

    </div>
  )
}

export default Navbar;