import { toast } from "sonner";
import { Button } from "../ui/button";
import { Facebook, Share2, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ShareNewsBar = ({ title, orientation = "vertical" }: { title: string; orientation: "vertical" | "horizontal"; }) => {

  const newsId = usePathname().replace("/article/", "");
  const url = window.location.href;

  const copyURL = () => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied!");
  }

  return (
    <div className={`flex ${orientation === "vertical" ? "flex-col" : "flex-row"} items-center gap-3 py-3`}>


      {/* normal share */}
      <Button
        size={"icon"}
        title="Share"
        onClick={copyURL}
        aria-label="Share"
        className="flex items-center justify-center w-8 h-8 rounded-full bg-muted transition-colors hover:bg-blue-500 text-black hover:text-white"
      >
        <Share2 className="h-3.5 w-3.5" />
      </Button>


      {/* twitter */}
      <Link
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-[#1DA1F2] hover:text-white transition-colors"
      >
        <Twitter className="h-3.5 w-3.5" />
      </Link>


      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-[#1877F2] hover:text-white transition-colors"
      >
        <Facebook className="h-3.5 w-3.5" />
      </a>


    </div>
  );
}


export default ShareNewsBar;