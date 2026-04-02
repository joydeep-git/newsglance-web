"use client";

import { motion } from "motion/react";
import { Github, Linkedin } from "lucide-react";
import { CONTACT_INFO } from "./contact-info";
import { SocialLinkItemProps } from "@/types/globalTypes";



function SocialLinkItem({ icon: Icon, label, href, delay = 0 }: SocialLinkItemProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card hover:border-project/40 hover:bg-project/5 transition-all duration-300 hover:scale-105"
    >
      <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-project/10 transition-colors">
        <Icon className="w-5 h-5 group-hover:text-project transition-colors" />
      </div>
      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </motion.a>
  );
}

const ContactSocialLinks = () => {

  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4 }}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
        Find me on
      </p>
      <div className="grid grid-cols-2 gap-3">
        <SocialLinkItem
          icon={Github}
          label="GitHub"
          href={CONTACT_INFO.github}
          delay={0.4}
        />
        <SocialLinkItem
          icon={Linkedin}
          label="LinkedIn"
          href={CONTACT_INFO.linkedin}
          delay={0.45}
        />
      </div>
    </motion.div>
  );
}

export default ContactSocialLinks;