"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { CONTACT_INFO } from "./contact-info";

const ContactProfileCard = () => {


  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="relative rounded-3xl border border-border bg-card p-6 overflow-hidden"
    >
      <BorderBeam size={100} duration={7} colorFrom="#CC0000" colorTo="#ff9999" />

      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-14 h-14 rounded-2xl bg-project/10 flex items-center justify-center text-2xl font-black text-project shrink-0">
          JD
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">{CONTACT_INFO.name}</h2>
          <p className="text-sm text-muted-foreground">{CONTACT_INFO.tagline}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <MapPin className="w-3.5 h-3.5 text-project shrink-0" />
        {CONTACT_INFO.location}
      </div>
    </motion.div>
  );
}

export default ContactProfileCard;