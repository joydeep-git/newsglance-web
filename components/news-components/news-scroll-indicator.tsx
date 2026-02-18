import { ReactNode } from "react";
import { motion, useScroll } from "motion/react";

const NewsScrollIndicator = ({ children }: { children: ReactNode; }) => {

  const { scrollYProgress } = useScroll();

  return <motion.div style={{ scaleX: scrollYProgress }}>{children}</motion.div>

}

export default NewsScrollIndicator;
