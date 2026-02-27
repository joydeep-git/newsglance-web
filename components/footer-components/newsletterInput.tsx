
"use client";

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';


const NewsletterInput = () => {

  const [email, setEmail] = useState<string>("");

  const handleEmailSubmit = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.length <= 0) {
      
      toast.error("Add an email ID");
      return;

    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setEmail("");
    toast.success("Newsletter Enabled!");
  }

  return (
    <div className="flex flex-col gap-3">

      <Input
        type="email"
        required
        placeholder="youremail@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
        className="w-full bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-project focus:ring-project/20 h-12"
      />

      <Button onClick={() => handleEmailSubmit()}
        className="bg-project hover:bg-project/90 text-white h-12 font-medium cursor-pointer">
        Subscribe
      </Button>

    </div>
  )
}

export default NewsletterInput;