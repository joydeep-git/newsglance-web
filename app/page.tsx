'use client';

import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomeComponent = () => {


  return (
    <MaxWidthWrapper>
      <div>
        
      </div>

      <div>
        <Link href="/profile">profile</Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default HomeComponent;