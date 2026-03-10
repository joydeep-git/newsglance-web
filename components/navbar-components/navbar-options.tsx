import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { newsCategories } from "@/utils/constants";
import { Label } from "../ui/label";


const NavbarOptions = () => {

  const addToUrl = (val: string) => {

    

  }

  return (
    <div className="bg-project w-full py-1">

      <MaxWidthWrapper>

        <div className="flex items-center justify-between overflow-y-auto gap-2 text-sm">

          {
            Object.entries(newsCategories).map(([key, val]) => {
              return <Label key={key} className="text-white hover:underline cursor-pointer">{val.toUpperCase()}</Label>
            })
          }

        </div>

      </MaxWidthWrapper>
    </div>
  )
}

export default NavbarOptions;