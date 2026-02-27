"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProfileSettings, AccountSettings, SubscriptionSettings, BillingSettings } from "@/components/settings";


const SETTINGS_MAP = {
  profile: ProfileSettings,
  account: AccountSettings,
  subscription: SubscriptionSettings,
  billing: BillingSettings,
} as const;

const VALID_ACTIVE = Object.keys(SETTINGS_MAP) as (keyof typeof SETTINGS_MAP)[];

const Settings = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const active = (searchParams.get("active") ?? "profile") as keyof typeof SETTINGS_MAP;

  useEffect(() => {
    if (!searchParams.get("active")) {
      router.replace("/settings?active=profile");
    }
  }, [searchParams, router]);

  const Content = VALID_ACTIVE.includes(active) ? SETTINGS_MAP[active] : SETTINGS_MAP.profile;

  return <Content />;
};

export default Settings;
