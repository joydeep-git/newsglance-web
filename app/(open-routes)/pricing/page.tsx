"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, Mic, MessageCircle, Ban, Crown, Zap, Headphones, FileText, Mail, Star, BadgeCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PricingPageFeatureRow from "@/components/pricing-components/pricingPageFeaturedRow";
import { useAppSelector } from "@/redux/store";


const PricingPage = () => {


  const { isAuth, user } = useAppSelector((state) => state.auth);



  // animation opacity control
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };



  // all plan data
  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Get started and explore NewsGlance",
      price: "₹ 0 / Lifetime",
      period: "",
      cta: isAuth ? "Continue with Free" : "Signup for free",
      ctaHref: "/settings/subscription",
      currentLabel: null,
      icon: Zap,
      features: [
        { text: "2 article summarizations per day", icon: FileText, included: true },
        { text: "2 audio generations per day", icon: Mic, included: true },
        { text: "Limited AI chats per day", icon: MessageCircle, included: true },
        { text: "Watch ads", icon: Sparkles, included: true },
        { text: "Ad-supported experience", icon: Headphones, included: true },
        { text: "No ads", icon: Ban, included: false },
        { text: "Unlimited usage", icon: Zap, included: false },
        { text: "Priority support", icon: Mail, included: false },
        { text: "Export summaries", icon: FileText, included: false },
      ],
      highlighted: false,
    },
    {
      id: "premium",
      name: "Premium",
      description: "Unlimited access for serious readers",
      price: "₹ 119 / month",
      period: "",
      cta: isAuth ? user?.isPremium ? "Manage Subscription" : "Upgrade to Premium" : "Signup for Premium",
      ctaHref: "/settings/subscription",
      currentLabel: "Best value",
      icon: Crown,
      features: [
        { text: "Unlimited article summarizations", icon: FileText, included: true },
        { text: "Unlimited audio generations", icon: Mic, included: true },
        { text: "Unlimited AI chats", icon: MessageCircle, included: true },
        { text: "No ads — distraction-free", icon: Ban, included: true },
        { text: "Priority email support", icon: Mail, included: true },
        { text: "Export summaries (PDF, share)", icon: FileText, included: true },
        { text: "High-quality audio", icon: Headphones, included: true },
        { text: "Early access to new features", icon: Star, included: true },
        { text: "Verified Premium badge", icon: BadgeCheck, included: true },
      ],
      highlighted: true,
    },
  ];



  // animation position control
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };


  return (
    <div className="py-10 md:py-16 px-4">


      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg">
          Start free. Upgrade when you need unlimited summaries, audio, and AI
          chats without ads.
        </p>
      </motion.div>

      
      {/* Plans */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-2 md:gap-6 lg:gap-8 max-w-5xl mx-auto"
      >
        {plans.map((plan) => {

          const Icon = plan.icon;

          return (
            <motion.div
              key={plan.id}
              variants={item}
              whileHover={{ y: plan.highlighted ? -4 : -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >

              <Card
                className={cn(
                  "relative h-full flex flex-col overflow-hidden transition-shadow duration-300",
                  plan.highlighted
                    ? "border-2 border-project/50 shadow-lg shadow-project/5 dark:shadow-project/10"
                    : "border border-border hover:shadow-md"
                )}
              >
                {plan.currentLabel && (
                  <div className="absolute top-0 right-0 rounded-bl-lg bg-project px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {plan.currentLabel}
                  </div>
                )}

                <CardHeader className="pb-4">

                  <div className="flex items-center gap-2">

                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        plan.highlighted
                          ? "bg-project/10 text-project"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <CardTitle className="text-xl">{plan.name}</CardTitle>

                  </div>


                  <CardDescription className="text-sm">
                    {plan.description}
                  </CardDescription>



                  <div className="flex items-baseline gap-1 pt-2">

                    <span className="text-3xl font-bold tracking-tight text-foreground">
                      {plan.price}
                    </span>

                    <span className="text-muted-foreground text-sm">
                      {plan.period}
                    </span>

                  </div>

                </CardHeader>


                <CardContent className="flex-1 pb-6">

                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <PricingPageFeatureRow
                        key={f.text}
                        text={f.text}
                        included={f.included}
                      />
                    ))}
                  </ul>

                </CardContent>



                <CardFooter className="pt-0">
                  <Link
                    href={plan.ctaHref}
                    className={cn(
                      "w-full justify-center",
                      plan.highlighted
                        ? buttonVariants({ size: "lg" })
                        : buttonVariants({ variant: "outline", size: "lg" })
                    )}
                  >
                    {plan.cta}
                  </Link>
                </CardFooter>


              </Card>
            </motion.div>
          );
        })}
      </motion.div>


      {/* FAQ or extra note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="text-center text-sm text-muted-foreground mt-10"
      >
        Cancel anytime. No hidden fees. Secure payment via Dodopay.
      </motion.p>
    </div>
  );
}


export default PricingPage;