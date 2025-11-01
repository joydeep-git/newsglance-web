import { cn } from '@/lib/utils';
import { MaxWidthWrapperProps } from '@/types/globalTypes';


const MaxWidthWrapper = ({ children, className = "", as: Component = "div" }: MaxWidthWrapperProps) => {

  return (
    <Component className={cn("w-full max-w-full mx-auto px-4 sm:max-w-2xl sm:px-6 md:max-w-4xl md:px-8 lg:max-w-6xl lg:px-10 xl:max-w-[1680px] xl:px-12", "2xl:px-16", className )}>
      {children}
    </Component>
  );
};

export default MaxWidthWrapper;