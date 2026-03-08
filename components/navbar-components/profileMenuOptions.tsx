"use client";

import { UserDataType } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Bug, ChevronDown, ChevronUp, CreditCard, Crown, FileText, HelpCircle, LogOut, Mail, ReceiptIndianRupee, Settings, Sparkles, User } from "lucide-react";
import MenuRow from "./menuRow";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useSignOut } from "@/hooks/authHooks";
import { useAppDispatch } from "@/redux/store";
import { setLogout } from "@/redux/slices/authSlice";
import { useState } from "react";
import { defaultValues } from "@/utils/constants";


const ProfileMenuOptions = ({ data }: { data: UserDataType }) => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { refetch } = useSignOut();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuOptions: Record<string, { url: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
    "Profile": {
      url: "/profile",
      icon: User,
    },
    "Settings": {
      url: "/settings?active=profile",
      icon: Settings,
    },
    // "Saved News": {
    //   url: "/saved-news",
    //   icon: Bookmark,
    // },
    // "Chat": {
    //   url: "/chat",
    //   icon: Sparkles,
    // },
    "Pricing": {
      url: "/pricing",
      icon: ReceiptIndianRupee,
    },
    "Billing & Payments": {
      url: "/settings?active=billing",
      icon: CreditCard,
    },
  }


  const handleSignOut = () => {
    dispatch(setLogout());
    refetch();
    router.replace("/");
  }


  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild className="cursor-pointer">

        <Avatar className="h-9 w-9 ring-2 ring-offset-2 ring-transparent hover:ring-primary transition-all">

          <AvatarImage src={data?.avatarId ? data?.avatar?.url : defaultValues.avatar} />

        </Avatar>

      </DropdownMenuTrigger>



      <DropdownMenuContent
        className="w-screen max-w-[320px] p-0 rounded-t-2xl shadow-xl"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-2">

          <div className="flex items-center gap-2">

            <p className={`text-sm font-semibold ${data.isPremium ? "text-yellow-500" : "text-foreground"}`}>
              {data.name}
            </p>

            {data.isPremium && (
              <div className="flex items-center gap-1 bg-linear-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                <Crown className="h-3 w-3" />
                <span>Plus+</span>
              </div>
            )}

          </div>


          <p className="text-xs text-muted-foreground mt-0.5">{data.email}</p>

        </div>

        <div className="border-t" />

        <div className="py-1">

          {
            Object.entries(menuOptions).map(([label, { icon: ItemIcon, url }]) => (
              <MenuRow
                key={label}
                icon={<ItemIcon className="h-4 w-4" />}
                label={label}
                onClick={() => router.push(url)}
              />
            ))
          }


          {/* Help & Support */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>

            <CollapsibleTrigger className="w-full cursor-pointer flex justify-between items-center pr-4 hover:bg-accent/50" >
              <MenuRow
                icon={<HelpCircle className="h-4 w-4" />}
                label="Help & Support"
              />
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>

            <CollapsibleContent className="pl-8 pr-4 pb-2 space-y-1.5 overflow-hidden transition-all duration-500 ease-in-out">
              <MenuRow
                icon={<FileText className="h-4 w-4" />}
                label="Documentation"
                onClick={() => window.open(defaultValues.frontendReadme, "_blank")}
              />

              <MenuRow
                icon={<Mail className="h-4 w-4" />}
                label="Contact Us"
                onClick={() => router.push("/contact")}
              />

              <MenuRow
                icon={<Bug className="h-4 w-4" />}
                label="Report a Bug"
                onClick={() =>
                  window.open(defaultValues.frontendIssues, "_blank")
                }
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Log Out */}
          <MenuRow
            icon={<LogOut className="h-4 w-4" />}
            label="Log out"
            onClick={() => handleSignOut()}
            className="text-red-600"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export default ProfileMenuOptions;