"use client";

import { useDeleteImage } from "@/hooks/userHooks";
import { setUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Loader, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";


const DeleteProfilePicture = () => {

  const dispatch = useAppDispatch();

  const { user: userData } = useAppSelector((state) => state.auth);

  const { isPending, mutate } = useDeleteImage();


  const handleDelete = () => {

    mutate(undefined, {
      onSuccess: (res) => dispatch(setUser(res?.data)),
      onError: (err) => toast.error(err.message || "Image delete failed!"),
    });

  }

  return (
    <Button variant="ghost" type="button" size="sm" disabled={isPending || userData?.avatar?.isDefaultFile} onClick={handleDelete}>
      {
        isPending
          ? <>
            <Loader size={36} className="animate-spin" />
            <span>Deleting...</span>
          </>
          : <>
            <Trash2 size={28} className='text-red-500 cursor-pointer' />
            <span>Delete</span>
          </>
      }
    </Button>
  )

}

export default DeleteProfilePicture;