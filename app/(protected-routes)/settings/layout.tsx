import MaxWidthWrapper from "@/components/maxWidthWrapper"
import { ReactNode } from "react";
import Link from "next/link";
import { User, Shield, CreditCard, Receipt } from "lucide-react";

const settingsNavItems = [
  { label: "Profile", href: "/settings/profile", icon: User },
  { label: "Account", href: "/settings/account", icon: Shield },
  { label: "Subscription", href: "/settings/subscription", icon: Receipt },
  { label: "Billing", href: "/settings/billing", icon: CreditCard },
  // { label: "Notifications", href: "/settings/notifications", icon: Bell },
];

const SettingsLayout = ({ children }: { children: ReactNode }) => {

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col md:flex-row gap-8 py-8">
        <nav className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
            Settings
          </h2>
          <ul className="space-y-0.5">
            {settingsNavItems.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </MaxWidthWrapper>
  );
};

export default SettingsLayout;