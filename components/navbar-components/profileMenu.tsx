"use client";

import { LoginButton } from "../loginButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { setLoginState } from "@/redux/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { UserDataType } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Lucide icons
import {
  User,
  Settings,
  Crown,
  HelpCircle,
  LogOut,
  ChevronDown,
  FileText,
  Mail,
  Bug,
  ChevronRight,
  History,
  Bookmark,
} from "lucide-react";

const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.auth);

  return isAuth ? (
    <ProfileMenuOptions data={user!} />
  ) : (
    <LoginButton onClick={() => dispatch(setLoginState(true))}>
      Login
    </LoginButton>
  );
};

export default ProfileMenu;

/* --------------------------------------------------------------- */
/*  Mobile-first sliding menu – only ONE section open at a time   */
/* --------------------------------------------------------------- */
const ProfileMenuOptions = ({ data }: { data: UserDataType }) => {
  const router = useRouter();

  // Track which section is open (null = none)
  const [openSection, setOpenSection] = useState<string | null>(null);

  const isPremium = data.isPremium;
  
  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

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
        className="w-screen max-w-[320px] p-0 shadow-xl"
        align="end"
        side="bottom"
        sideOffset={8} >


        <div className="px-4 pt-4 pb-2">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-xs text-muted-foreground">{data.email}</p>
        </div>

        <div className="border-t" />


        <div className="py-1">

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
            icon={<Settings className="h-4 w-4" />}
            label="Pricing"
            onClick={() => router.push("/pricing")}
          />


          <MenuRow
            icon={<Bookmark className="h-4 w-4" />}
            label="Saved"
            onClick={() => router.push("/saved")}
          />


          <Collapsible
            open={openSection === "membership"}
            onOpenChange={() => toggleSection("membership")}
          >
            <CollapsibleTrigger className="w-full transition-all ">
              <MenuRow
                icon={
                  <Crown
                    className={`h-4 w-4 ${isPremium ? "text-yellow-500" : "text-muted-foreground"
                      }`}
                  />
                }
                label="Membership"
                chevron
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pl-8 pr-4 pb-1 space-y-1 overflow-hidden transition-all duration-500">
              <MenuRow
                icon={<History />}
                label="Payment History"
              />
              <MenuRow
                icon={""}
                label="Plan Details"
              />
            </CollapsibleContent>
          </Collapsible>


          <Collapsible
            open={openSection === "support"}
            onOpenChange={() => toggleSection("support")}
          >
            <CollapsibleTrigger className="w-full">
              <MenuRow
                icon={<HelpCircle className="h-4 w-4" />}
                label="Help & Support"
                chevron
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pl-8 pr-4 pb-1 space-y-1 overflow-hidden transition-all duration-500">
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

          {/* Log out */}
          <MenuRow
            icon={<LogOut className="h-4 w-4" />}
            label="Log out"
            onClick={() => { }}
            className="text-red-600"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};



type MenuRowProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  chevron?: boolean;
  className?: string;
  isOpen?: boolean;
};

const MenuRow = ({
  icon,
  label,
  onClick,
  chevron,
  isOpen = false,
  className = "",
}: MenuRowProps) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-4 h-11 cursor-pointer hover:bg-accent/50 ${className}`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>

    <div className="flex items-center gap-2">
      {chevron && (isOpen ? <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200" /> : <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />)}
    </div>
  </div>
);