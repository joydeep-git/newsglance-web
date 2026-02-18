"use client";

import { Button } from "@/components/ui/button";
import { useUpdateImage } from "@/hooks/userHooks";
import { Loader, Upload } from "lucide-react";
import { Input } from "../ui/input";
import { useRef } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/store";
import { setUser } from "@/redux/slices/authSlice";


const UpdateProfilePicture = () => {

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();


  const { mutate, isPending } = useUpdateImage();


  const handleButtonClick = () => {
    inputRef.current?.click();
  };


  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (file) {

      mutate(file, {
        onSuccess: (res) => {
          dispatch(setUser(res.data));
        },
        onError: (err) => toast.error(err.message || "Image upload failed!"),
      });

    } else {
      toast.error("No file selected");
    }

    e.target.files = null;
  };


  return (
    <>

      <Button variant="ghost" type="button" size="sm" disabled={isPending} onClick={handleButtonClick}>
        {isPending
          ? <>
            <Loader size={36} className="animate-spin" />
            <span>Uploading...</span>
          </>
          : <>
            <Upload size={28} />
            <span>Upload</span>
          </>
        }
      </Button>


      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={(e) => handleUploadFile(e)}
      />

    </>
  )
}

export default UpdateProfilePicture;