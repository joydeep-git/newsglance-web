"use client";

import MaxWidthWrapper from "@/components/maxWidthWrapper"
import { ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { User, Shield, CreditCard } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsLayout = ({ children }: { children: ReactNode }) => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("active") ?? "profile";

  const handleTabChange = (value: string) => {
    router.push(`/settings?active=${value}`);
  };


  const settingsNavItems = [
    { label: "Profile", value: "profile", icon: User },
    { label: "Account", value: "account", icon: Shield },
    { label: "Subscription & Billing", value: "subscription", icon: CreditCard },
  ];


  return (
    <MaxWidthWrapper>

      <div className="flex flex-col md:flex-row gap-8 py-8">

        <div className="md:w-56 shrink-0">

          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
            Settings
          </h2>

          {/* Mobile: Horizontal tabs */}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            orientation="horizontal"
            className="md:hidden w-full"
          >
            <TabsList
              variant="line"
              className="w-full justify-start overflow-x-auto mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {
                settingsNavItems.map(
                  ({ label, value, icon: Icon }) => (
                    <TabsTrigger key={value} value={value} className="gap-3">
                      <Icon className="size-8" />
                      <span className="whitespace-nowrap text-xl md:text-2xl">{label}</span>
                    </TabsTrigger>
                  )
                )
              }
            </TabsList>
          </Tabs>

          {/* Desktop: Vertical tabs */}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            orientation="vertical"
            className="hidden md:block w-full"
          >
            <TabsList
              variant="line"
              className="flex flex-col w-full items-start"
            >
              {settingsNavItems.map(({ label, value, icon: Icon }) => (
                <TabsTrigger key={value} value={value} className="gap-2 w-full justify-start">
                  <Icon className="h-4 w-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SettingsLayout;