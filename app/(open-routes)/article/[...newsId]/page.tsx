"use client";

import { use } from "react";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import ArticleView from "./articleView";



const Page = ({ params }: { params: Promise<{ newsId: string[] }> }) => {

  const { newsId: segments } = use(params);

  const newsId = segments.join("/");

  return (
    <MaxWidthWrapper>
      <ArticleView newsId={newsId} />
    </MaxWidthWrapper>
  );
}


export default Page;