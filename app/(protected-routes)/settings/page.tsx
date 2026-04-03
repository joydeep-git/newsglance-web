"use client";


import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProfileSettings, AccountSettings, SubscriptionSettings } from "@/components/settings";



const Settings = () => {

  const SETTINGS_MAP = {
    profile: ProfileSettings,
    account: AccountSettings,
    subscription: SubscriptionSettings,
  } as const;


  const VALID_ACTIVE = Object.keys(SETTINGS_MAP) as (keyof typeof SETTINGS_MAP)[];


  const searchParams = useSearchParams();
  const router = useRouter();
  const rawActive = searchParams.get("active") ?? "profile";

  // Redirect legacy "billing" tab to "subscription"
  const active = (rawActive === "billing" ? "subscription" : rawActive) as keyof typeof SETTINGS_MAP;

  useEffect(() => {
    if (!searchParams.get("active")) {
      router.replace("/settings?active=profile");
    } else if (rawActive === "billing") {
      router.replace("/settings?active=subscription");
    }
  }, [searchParams, router, rawActive]);

  const Content = VALID_ACTIVE.includes(active) ? SETTINGS_MAP[active] : SETTINGS_MAP.profile;

  return <Content />;
};

export default Settings;
