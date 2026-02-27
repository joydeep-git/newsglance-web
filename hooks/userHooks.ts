import userService from "@/services/userService";
import { UpdateUserBodyType } from "@/types/globalTypes";
import { useMutation } from "@tanstack/react-query";


export const useUpdateImage = () => useMutation({
  mutationFn: (file: File) => userService.updateImage(file),
})


export const useDeleteImage = () => useMutation({
  mutationFn: () => userService.deleteImage(),
})

export const useUpdateUser = () => useMutation({
  mutationFn: (data: UpdateUserBodyType) => userService.updateUser(data),
})
