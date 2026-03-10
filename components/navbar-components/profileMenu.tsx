"use client";

import { LoginButton } from "../loginButton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { CreditCard, Crown, LogOut, Menu, ReceiptIndianRupee, Settings, User } from "lucide-react";
import MenuRow from "./menuRow";
import { useSignOut } from "@/hooks/authHooks";
import { setLogout } from "@/redux/slices/authSlice";
import { defaultValues } from "@/utils/constants";
import HelpAndSupport from "./helpSupport";
import { setLoginState } from "@/redux/slices/uiSlice";


// Items only visible when logged IN
const authMenuOptions: Record<string, { url: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
  "Profile": { url: "/profile", icon: User },
  "Settings": { url: "/settings?active=profile", icon: Settings },
  "Billing & Payments": { url: "/settings?active=billing", icon: CreditCard },
};

// Items visible to guests only
const guestMenuOptions: Record<string, { url: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
  "Pricing": { url: "/pricing", icon: ReceiptIndianRupee },
};


const ProfileMenu = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { refetch } = useSignOut();

  const { isAuth, user } = useAppSelector((state) => state.auth);


  const handleSignOut = () => {
    dispatch(setLogout());
    refetch();
    router.replace("/");
  };


  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild className="cursor-pointer outline-none">
        {
          user && isAuth
            ? (
              <Avatar className="h-9 w-9 ring-2 ring-offset-2 ring-transparent hover:ring-primary transition-all">
                <AvatarImage src={user?.avatarId ? user?.avatar?.url : defaultValues.avatar} />
              </Avatar>
            )
            : (
              <button className="p-1 rounded-md hover:bg-accent/50 transition-colors outline-none">
                <Menu className="h-5 w-5" />
              </button>
            )
        }
      </DropdownMenuTrigger>


      <DropdownMenuContent
        className="w-screen max-w-[320px] p-0 rounded-t-2xl shadow-xl"
        align="end"
        side="bottom"
        sideOffset={8}
      >

        {/* ── AUTH: name/email header ── */}
        {isAuth && user && (
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <p className={`text-sm font-semibold ${user.isPremium ? "text-yellow-500" : "text-foreground"}`}>
                {user.name}
              </p>
              {user.isPremium && (
                <div className="flex items-center gap-1 bg-linear-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                  <Crown className="h-3 w-3" />
                  <span>Plus+</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
          </div>
        )}

        {/* ── GUEST: animated login button ── */}
        {!isAuth && !user && (
          <div className="px-4 pt-4 pb-2">
            <LoginButton
              className="w-full"
              onClick={() => dispatch(setLoginState(true))}
            />
          </div>
        )}

        <div className="border-t" />

        <div className="py-1">

          {/* Auth-only items: Profile, Settings, Billing */}
          {isAuth && user && (
            Object.entries(authMenuOptions).map(([label, { icon: ItemIcon, url }]) => (
              <MenuRow
                key={label}
                icon={<ItemIcon className="h-4 w-4" />}
                label={label}
                onClick={() => router.push(url)}
              />
            ))
          )}

          {/* Guest-only items: Pricing */}
          {!isAuth && !user && (
            Object.entries(guestMenuOptions).map(([label, { icon: ItemIcon, url }]) => (
              <MenuRow
                key={label}
                icon={<ItemIcon className="h-4 w-4" />}
                label={label}
                onClick={() => router.push(url)}
              />
            ))
          )}

          {/* Help & Support — shown to everyone */}
          <HelpAndSupport />

          {/* Log Out — auth only */}
          {isAuth && user && (
            <MenuRow
              icon={<LogOut className="h-4 w-4" />}
              label="Log out"
              onClick={() => handleSignOut()}
              className="text-red-600"
            />
          )}

        </div>
      </DropdownMenuContent>

    </DropdownMenu>
  );
};

export default ProfileMenu;
