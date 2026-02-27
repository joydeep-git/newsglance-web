import Link from "next/link";
import MaxWidthWrapper from "../maxWidthWrapper";
import { Separator } from "../ui/separator";


const NavbarOptions = () => {

  return (
    <div className="bg-project w-full py-0.5">
      <MaxWidthWrapper>

        <div className="flex items-center overflow-y-auto gap-2 text-white text-sm">
          <Link href="/weather">Weather</Link>

          <Separator orientation="vertical" className="text-white text-4xl" />
        </div>
        
      </MaxWidthWrapper>
    </div>
  )
}

export default NavbarOptions;