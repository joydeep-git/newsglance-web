"use client";

import { LoginButton } from "../loginButton";
import { setLoginState } from "@/redux/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { UserDataType } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { CreditCard, Crown, LogOut, Menu, ReceiptIndianRupee, Settings, User } from "lucide-react";
import MenuRow from "./menuRow";
import { useSignOut } from "@/hooks/authHooks";
import { setLogout } from "@/redux/slices/authSlice";
import { defaultValues } from "@/utils/constants";
import HelpAndSupport from "./helpSupport";


const ProfileMenu = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { refetch } = useSignOut();

  const { isAuth, user } = useAppSelector((state) => state.auth);


  const menuOptions: Record<string, { url: string; isAuth: boolean; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
    "Profile": {
      url: "/profile",
      icon: User,
      isAuth: true,
    },
    "Settings": {
      url: "/settings?active=profile",
      icon: Settings,
      isAuth: true,
    },
    "Pricing": {
      url: "/pricing",
      icon: ReceiptIndianRupee,
      isAuth: false,
    },
    "Billing & Payments": {
      url: "/settings?active=billing",
      icon: CreditCard,
      isAuth: false,
    },
    // "Saved News": {
    //   url: "/saved-news",
    //   icon: Bookmark,
    //   isAuth: true,
    // },
    // "Chat": {
    //   url: "/chat",
    //   icon: Sparkles,
    //   isAuth: true,
    // },
  }


  const handleSignOut = () => {
    dispatch(setLogout());
    refetch();
    router.replace("/");
  }



  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild className="cursor-pointer">
        {
          user && isAuth
            ? (
              <Avatar className="h-9 w-9 ring-2 ring-offset-2 ring-transparent hover:ring-primary transition-all">

                <AvatarImage src={user?.avatarId ? user?.avatar?.url : defaultValues.avatar} />

              </Avatar>
            )
            : <Menu />
        }
      </DropdownMenuTrigger>



      <DropdownMenuContent
        className="w-screen max-w-[320px] p-0 rounded-t-2xl shadow-xl"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        {/* Header */}
        {
          isAuth && user && (
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
          )
        }

        {
          !user && !isAuth && <LoginButton />
        }

        <div className="border-t" />


        <div className="py-1">

          {
            Object.entries(menuOptions).map(([label, { icon: ItemIcon, url, isAuth }]) => (
              <MenuRow
                key={label}
                icon={<ItemIcon className="h-4 w-4" />}
                label={label}
                onClick={() => router.push(url)}
                isAuthRequired={isAuth}
              />
            ))
          }


          {/* Help & Support */}
          <HelpAndSupport />


          {/* Log Out */}
          <MenuRow
            isAuthRequired={true}
            icon={<LogOut className="h-4 w-4" />}
            label="Log out"
            onClick={() => handleSignOut()}
            className="text-red-600"
          />

        </div>
      </DropdownMenuContent>

    </DropdownMenu>
  )
};

export default ProfileMenu;









