'use client';

import GuardLink from "@/components/auth-components/guardLink";
import MaxWidthWrapper from "@/components/maxWidthWrapper";

const HomeComponent = () => {


  return (
    <MaxWidthWrapper>

      <GuardLink href="/profile">profile</GuardLink>

    </MaxWidthWrapper>
  );
};

export default HomeComponent;