"use client";

import { Globe } from "@/components/magicui/globe";
import { LoginButton } from "@/components/loginButton";
import { useAppDispatch } from "@/redux/store";
import { setLoginState } from "@/redux/slices/uiSlice";
import { Newspaper, Sparkles, BookmarkCheck, Radio, Home } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const features = [
  { icon: Newspaper, label: "Breaking news, curated for you" },
  { icon: Sparkles, label: "AI-powered summaries & audio" },
  { icon: BookmarkCheck, label: "Bookmark articles to read later" },
  { icon: Radio, label: "Live global coverage, every minute" },
];


const AuthWall = () => {

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-1 overflow-hidden">

      {/* Globe */}
      <div className="hidden lg:flex relative w-1/2 items-center justify-center overflow-hidden bg-project/5">

        {/* Soft glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_55%,color-mix(in_srgb,var(--color-project)_10%,transparent),transparent)]" />

        {/* Globe */}
        <div className="relative w-[520px] h-[520px]">
          <Globe className="relative! inset-auto! w-full! max-w-full!" />
        </div>

        {/* Caption */}
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted-foreground/50 tracking-widest uppercase whitespace-nowrap">
          Real-time global coverage
        </p>

      </div>


      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 sm:px-14 py-12 relative">

        {/* Top gradient */}
        <div className="pointer-events-none absolute top-0 inset-x-0 h-36 bg-linear-to-b from-project/5 to-transparent" />

        <motion.div
          className="w-full max-w-sm flex flex-col gap-7"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >

          {/* Badge */}
          <span className="self-start text-[10px] font-bold uppercase tracking-widest text-project bg-project/10 px-2.5 py-1 rounded-full">
            Members only
          </span>

          {/* Headline */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Sign in to unlock<br />
              <span className="text-project">the full experience</span>
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free to join. Read smarter with AI summaries, save articles, and stay on top of the world.
            </p>
          </div>

          {/* Feature list */}
          <ul className="flex flex-col gap-2.5">
            {features.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                className="flex items-center gap-3 text-sm text-foreground/80"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.12 + i * 0.07, ease: "easeOut" }}
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-project/10 shrink-0">
                  <Icon className="w-3.5 h-3.5 text-project" />
                </span>
                {label}
              </motion.li>
            ))}
          </ul>

          {/* Actions */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <LoginButton
              className="w-full py-2.5 text-sm"
              onClick={() => dispatch(setLoginState(true))}
            />

            <Button variant="ghost" size="sm" asChild className="w-full text-muted-foreground hover:text-foreground gap-2">
              <Link href="/">
                <Home className="w-3.5 h-3.5" />
                Back to Home
              </Link>
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              No credit card required · Free forever
            </p>
          </motion.div>

        </motion.div>

      </div>

    </div>
  );
};

export default AuthWall;
