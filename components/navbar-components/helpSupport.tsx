import { useState } from "react";
import MenuRow from "./menuRow";
import { useRouter } from "next/navigation";
import { Bug, ChevronDown, ChevronUp, FileText, HelpCircle, Mail } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { defaultValues } from "@/utils/constants";


const HelpAndSupport = () => {


  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);


  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>

      <CollapsibleTrigger className="w-full cursor-pointer flex justify-between items-center pr-4 hover:bg-accent/50" >
        <MenuRow
          icon={<HelpCircle className="h-4 w-4" />}
          label="Help & Support"
          isAuthRequired={false}
        />
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </CollapsibleTrigger>

      <CollapsibleContent className="pl-8 pr-4 pb-2 space-y-1.5 overflow-hidden transition-all duration-500 ease-in-out">
        <MenuRow
          icon={<FileText className="h-4 w-4" />}
          label="Documentation"
          onClick={() => window.open(defaultValues.frontendReadme, "_blank")}
          isAuthRequired={false}
        />

        <MenuRow
          icon={<Mail className="h-4 w-4" />}
          label="Contact Us"
          onClick={() => router.push("/contact")}
          isAuthRequired={false}
        />

        <MenuRow
          icon={<Bug className="h-4 w-4" />}
          label="Report a Bug"
          isAuthRequired={false}
          onClick={() =>
            window.open(defaultValues.frontendIssues, "_blank")
          }
        />
      </CollapsibleContent>
    </Collapsible>
  )

}

export default HelpAndSupport;