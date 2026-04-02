"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const NotFoundPage = () => {

  const router = useRouter();

  function getHome() {
    router.push("/");
  }

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <Particles
        className="absolute inset-0"
        quantity={80}
        ease={80}
        color="#000000"
        staticity={50}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-project/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-2xl mx-auto">

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-28 h-28 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-project" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-project rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">!</span>
            </div>
          </div>
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-[8rem] sm:text-[12rem] font-black leading-none tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-foreground via-foreground/50 to-transparent">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-10 -mt-4"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Oops! The page you&apos;re looking for seems to have wandered off into the news feed. Let&apos;s get you back to something real.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button onClick={getHome} className="group flex items-center gap-2 px-8 py-3.5 bg-project text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-project/90 hover:scale-105 hover:shadow-lg hover:shadow-project/25">
            <Home className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            Back to Home
          </Button>
        </motion.div>

        {/* Divider + Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-xs text-muted-foreground/60"
        >
          Error Code: 404 &bull; Page does not exist
        </motion.p>

      </div>
    </div>
  );
}

export default NotFoundPage;