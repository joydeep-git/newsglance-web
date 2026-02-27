"use client";

import { MenuRowProps } from "@/types/authTypes";


const MenuRow = ({ icon, label, onClick, className = "" }: MenuRowProps) => (

  <div onClick={onClick} className={`flex items-center justify-between px-4 h-11 cursor-pointer hover:bg-accent/50 transition-colors ${className}`}>

    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>

  </div>

);

export default MenuRow;