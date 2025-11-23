"use client";

import { MenuRowProps } from "@/types/authTypes";
import { ChevronDown } from "lucide-react";


const MenuRow = ({ icon, label, onClick, chevron, isOpen = false, className = "" }: MenuRowProps) => (

  <div onClick={onClick} className={`flex items-center justify-between px-4 h-11 cursor-pointer hover:bg-accent/50 transition-colors ${className}`}>

    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>

    {chevron && (
      <ChevronDown
        className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""
          }`}
      />
    )}

  </div>

);

export default MenuRow;