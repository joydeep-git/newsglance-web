"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SquarePen } from "lucide-react";
import UpdateProfilePicture from "./updateProfilePicture";
import DeleteProfilePicture from "./deleteProfilePicture";


const ProfileAvatarDropdown = () => {

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild className="ring-0 outline-none" >
        <SquarePen size={20} strokeWidth={2} className=" cursor-pointer mx-1 my-2" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <UpdateProfilePicture />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeleteProfilePicture />
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  )
}


export default ProfileAvatarDropdown;