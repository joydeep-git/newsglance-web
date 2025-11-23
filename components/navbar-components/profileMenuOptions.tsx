"use client";

import { UserDataType } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowUpCircle, Bookmark, Bug, CreditCard, Crown, FileText, HelpCircle, History, LogOut, Mail, Settings, Sparkles, User } from "lucide-react";
import MenuRow from "./menuRow";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useSignOut } from "@/hooks/authHooks";
import { useAppDispatch } from "@/redux/store";
import { setLogout } from "@/redux/slices/authSlice";


const ProfileMenuOptions = ({ data }: { data: UserDataType }) => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [openSection, setOpenSection] = useState<string | null>(null);

  const { refetch } = useSignOut();


  // Toggle dropdowns
  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };


  const handleSignOut = () => {
    refetch();
    router.replace("/");
    dispatch(setLogout());
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="h-9 w-9 ring-2 ring-offset-2 ring-transparent hover:ring-primary transition-all">
          <AvatarImage src={data.avatarId ?? "https://github.com/shadcn.png"} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
            {data.name.charAt(0).toUpperCase()}
          </AvatarFallback>
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
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                <Crown className="h-3 w-3" />
                <span>Gold</span>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{data.email}</p>
        </div>

        <div className="border-t" />

        <div className="py-1">
          {/* Account */}
          <MenuRow
            icon={<User className="h-4 w-4" />}
            label="Profile"
            onClick={() => router.push("/profile")}
          />

          <MenuRow
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
            onClick={() => router.push("/settings")}
          />

          <MenuRow
            icon={<Bookmark className="h-4 w-4" />}
            label="Saved Articles"
            onClick={() => router.push("/saved")}
          />

          <MenuRow
            icon={<Sparkles className="h-4 w-4 text-purple-600" />}
            label="AI Insights"
            onClick={() => router.push("/ai-chat")}
          />

          {/* Membership */}
          <Collapsible
            open={openSection === "membership"}
            onOpenChange={() => toggleSection("membership")}
          >
            <CollapsibleTrigger className="w-full">
              <MenuRow
                icon={
                  <Crown
                    className={`h-4 w-4 ${data.isPremium ? "text-yellow-500" : "text-muted-foreground"}`}
                  />
                }
                label="Membership"
                chevron
                isOpen={openSection === "membership"}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pl-8 pr-4 pb-2 space-y-1.5 overflow-hidden transition-all duration-500 ease-in-out">

              <MenuRow
                icon={<CreditCard className="h-4 w-4" />}
                label="Billing & Payments"
                onClick={() => router.push("/billing")}
              />

              <MenuRow
                icon={<History className="h-4 w-4" />}
                label="Payment History"
                onClick={() => router.push("/payments")}
              />

              {!data.isPremium && (
                <MenuRow
                  icon={<ArrowUpCircle className="h-4 w-4 text-green-600" />}
                  label="Upgrade to Gold"
                  onClick={() => router.push("/pricing")}
                  className="text-green-600 font-medium"
                />
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Help & Support */}
          <Collapsible
            open={openSection === "support"}
            onOpenChange={() => toggleSection("support")}
          >
            <CollapsibleTrigger className="w-full">
              <MenuRow
                icon={<HelpCircle className="h-4 w-4" />}
                label="Help & Support"
                chevron
                isOpen={openSection === "support"}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pl-8 pr-4 pb-2 space-y-1.5 overflow-hidden transition-all duration-500 ease-in-out">
              <MenuRow
                icon={<FileText className="h-4 w-4" />}
                label="Documentation"
                onClick={() => window.open("/docs", "_blank")}
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
                  window.open("https://github.com/joydeep-git/newsglance-web/issues", "_blank")
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