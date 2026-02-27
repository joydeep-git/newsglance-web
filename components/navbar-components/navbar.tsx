"use client";

import NewsglanceLogo from "@/public/assets/icons/newsglance";
import MaxWidthWrapper from "../maxWidthWrapper";
import ProfileMenu from "@/components/navbar-components/profileMenu";
import Link from "next/link";


const Navbar = () => {


  return (
    <div className={`absolute w-full top-0 right-0 left-0`}>

      <MaxWidthWrapper>

        <nav className="flex items-center justify-between w-full mx-auto py-1.5 sm:py-1 mt-1">

          <Link href="weather" className="flex flex-col text-xs text-muted-foreground hover:underline hover:text-project">
            <span>Kolkata, WB</span>
            <span>25.2°C</span>
          </Link>

          {/* Center - Logo */}
          <Link href={"/"} className="absolute left-1/2 transform -translate-x-1/2">
            <NewsglanceLogo color="#000000" size={5} />
          </Link>

          <ProfileMenu />

        </nav>

      </MaxWidthWrapper>

    </div>
  )
}

export default Navbar;