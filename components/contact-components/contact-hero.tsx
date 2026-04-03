"use client";

import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

const ContactHero = () => {


  return (
    <div className="text-center mb-14">

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-project/30 bg-project/5 text-project text-xs font-semibold uppercase tracking-widest"
      >
        <Mail className="w-3.5 h-3.5" />
        Get In Touch
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
      >
        Contact{" "}
        <AnimatedGradientText
          colorFrom="#CC0000"
          colorTo="#ff6666"
          speed={1.5}
          className="font-black"
        >
          Joydeep
        </AnimatedGradientText>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
      >
        Have a project idea, collaboration, or just want to say hi?
        I&apos;m always open to interesting conversations.
      </motion.p>

    </div>
  );
}



export default ContactHero;