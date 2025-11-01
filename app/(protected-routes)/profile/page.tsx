"use client";

import MaxWidthWrapper from "@/components/maxWidthWrapper";
import Link from "next/link";

const ProfilePage = () => {

  return (
    <MaxWidthWrapper>
      Profile Page

      <Link href="/">home</Link>
    </MaxWidthWrapper>
  )
}

export default ProfilePage;