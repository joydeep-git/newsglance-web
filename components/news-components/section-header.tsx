"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
}

export function SectionHeader({ title, viewAllHref }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        {/* Red accent bar */}
        <span className="block w-1 h-5 rounded-full bg-project" />
        <h2 className="text-base font-bold tracking-tight text-foreground">{title}</h2>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-project transition-colors duration-200"
        >
          View all
          <ArrowUpRight size={13} />
        </Link>
      )}
    </div>
  );
}
