"use client";

import { Phone, Mail, Globe } from "lucide-react";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import ContactBackground from "@/components/contact-components/contact-background";
import ContactHero from "@/components/contact-components/contact-hero";
import ContactProfileCard from "@/components/contact-components/contact-profile-card";
import ContactCard from "@/components/contact-components/contact-card";
import ContactSocialLinks from "@/components/contact-components/contact-social-links";
import ContactForm from "@/components/contact-components/contact-form";
import { CONTACT_INFO } from "@/components/contact-components/contact-info";


const ContactPage = () => {


  return (
    <section className="relative py-16 sm:py-20 overflow-hidden min-h-[calc(100vh-200px)]">

      {/* Animated particles + gradient blobs */}
      <ContactBackground />

      <MaxWidthWrapper>

        {/* Page heading */}
        <ContactHero />

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT column */}
          <div className="space-y-6">

            {/* Who I am */}
            <ContactProfileCard />

            {/* Contact details */}
            <div className="space-y-3">
              <ContactCard
                icon={Phone}
                label="Phone"
                value={CONTACT_INFO.phone}
                copyable
                delay={0.2}
              />
              <ContactCard
                icon={Mail}
                label="Email"
                value={CONTACT_INFO.email}
                href={`mailto:${CONTACT_INFO.email}`}
                copyable
                delay={0.25}
              />
              <ContactCard
                icon={Globe}
                label="Website"
                value={CONTACT_INFO.website.replace("https://", "")}
                href={CONTACT_INFO.website}
                delay={0.3}
              />
            </div>

            {/* GitHub + LinkedIn */}
            <ContactSocialLinks />

          </div>

          {/* RIGHT column — contact form */}
          <div>
            <ContactForm />
          </div>

        </div>
      </MaxWidthWrapper>

    </section>
  )
}


export default ContactPage;