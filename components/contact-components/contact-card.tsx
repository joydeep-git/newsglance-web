"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Copy, Check } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { ContactCardProps } from "@/types/globalTypes";



const ContactCard = ({ icon: Icon, label, value, href, copyable, delay = 0, }: ContactCardProps) => {


  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Content = (
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-project/10 flex items-center justify-center mt-0.5">
        <Icon className="w-5 h-5 text-project" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground truncate">{value}</p>
      </div>
      {copyable && (
        <button
          onClick={(e) => {
            e.preventDefault();
            handleCopy();
          }}
          className="shrink-0 w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </button>
      )}
      {href && !copyable && (
        <ExternalLink className="shrink-0 w-4 h-4 text-muted-foreground mt-1" />
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="block relative rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:border-project/40 hover:bg-project/5 hover:shadow-lg hover:shadow-project/10 group overflow-hidden"
        >
          <BorderBeam
            size={80}
            duration={6}
            colorFrom="#CC0000"
            colorTo="#ff6666"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
          {Content}
        </a>
      ) : (
        <div className="relative rounded-2xl border border-border bg-card p-4">
          {Content}
        </div>
      )}
    </motion.div>
  );
}


export default ContactCard;