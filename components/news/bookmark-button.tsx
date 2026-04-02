"use client";

import { toast } from "sonner";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { useCheckBookmark, useDeleteBookmark, useSaveBookmark } from "@/hooks/newsHooks";
import { Button } from "../ui/button";

const BookmarkButton = () => {

  const newsId = usePathname().replace("/article/", "");

  const { isAuth, user } = useAppSelector(s => s.auth);

  const { data: isSaved, isLoading, refetch: checkBookmarkStatus } = useCheckBookmark(newsId, user?.id || undefined);

  const { mutate: saveBookmark } = useSaveBookmark();
  const { mutate: deleteBookmark } = useDeleteBookmark();

  const handleBookmark = () => {

    if (isLoading) return;

    if (isSaved) {

      deleteBookmark(newsId, {
        onSuccess: () => {
          toast.success("Bookmark removed!");
          checkBookmarkStatus();
        },
        onError: (err) => toast.error(err.message),
      });

    } else {

      saveBookmark(newsId, {
        onSuccess: () => {
          toast.success("Bookmark saved!");
          checkBookmarkStatus();
        },
        onError: (err) => toast.error(err.message),
      });

    }

  };

  if (!isAuth) return null;

  return (
    <Button variant="ghost" size="sm" disabled={isLoading}
      onClick={handleBookmark} title={isSaved ? "Remove bookmark" : "Save bookmark"}
      aria-label={isSaved ? "Remove bookmark" : "Save bookmark"}
      className={` ${isSaved ? "bg-project hover:bg-project/70 text-white hover:text-white/80" : "border-green-500 text-black"}`} >
      {
        isSaved
          ? <BookmarkCheck />
          : <Bookmark />
      }
      <span>{isSaved ? "Saved" : "Save"}</span>
    </Button>
  );
};

export default BookmarkButton;
