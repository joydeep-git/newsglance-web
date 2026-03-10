"use client";

import { MenuRowProps } from "@/types/authTypes";


const MenuRow = ({ icon, label, onClick, className = "", isAuthRequired = false }: MenuRowProps) => (

  <div onClick={isAuthRequired ? onClick : undefined} className={`flex items-center justify-between px-4 h-11 cursor-pointer hover:bg-accent/50 transition-colors ${className} ${isAuthRequired && "hidden"}`}>

    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>

  </div>

);

export default MenuRow;