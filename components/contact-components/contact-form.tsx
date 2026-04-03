"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { User, Mail, MessageSquare, SendHorizonal } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";


const ContactForm = () => {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative rounded-3xl border border-border bg-card p-6 sm:p-8 overflow-hidden"
    >
      <BorderBeam size={120} duration={8} colorFrom="#CC0000" colorTo="#9c40ff" />

      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-1">Send a Message</h3>
        <p className="text-sm text-muted-foreground">
          Fill in the form and I&apos;ll get back to you soon.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3 h-3" /> Name
            </ Label>
            <Input
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-project/30 focus:border-project/50 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3 h-3" /> Email
            </Label>
            <Input
              type="email"
              required
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-project/30 focus:border-project/50 transition-all"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-3 h-3" /> Subject
          </Label>
          <Input
            type="text"
            required
            placeholder="How can I help?"
            value={formData.subject}
            onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-project/30 focus:border-project/50 transition-all"
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5">

          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Message
          </Label>

          <Textarea
            required
            rows={5}
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-project/30 focus:border-project/50 transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <Button>Submit <SendHorizonal className="h-4 w-4" /> </Button>

        <p className="text-xs text-center text-muted-foreground/70">
          I typically respond within 24–48 hours.
        </p>

      </form>
    </motion.div>
  );
}


export default ContactForm;