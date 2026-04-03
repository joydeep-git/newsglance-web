import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Heart } from 'lucide-react';
import MaxWidthWrapper from '../maxWidthWrapper';
import NewsletterInput from './newsletterInput';
import TitleStarter from '../titleStarter';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300">

      <MaxWidthWrapper className='mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8'>


        <div className='flex flex-col lg:flex-row w-full items-start justify-between'>


          {/* newsletter section */}
          <div className='flex flex-col mx-auto lg:mx-0 w-full md:max-w-1/2 lg:max-w-1/3'>

            <div className="flex items-start gap-2 mb-6">
              <TitleStarter />
              <h3 className="text-lg font-semibold text-white">Subscribe to NewsFlash</h3>
            </div>


            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Stay updated on the latest happenings in the INDIA. Whether it&apos;s business, news, politics, fashion, tech or finance, we deliver it in a flash—straight to your inbox.
            </p>


            <div className="flex flex-col gap-4">

              <NewsletterInput />

              <p className="text-xs text-gray-500 leading-relaxed">
                We don&apos;t spam, promised. Only two emails every month, you can opt out anytime with just one click.
              </p>

            </div>

          </div>


          {/* links section */}
          <div className="grid grid-cols-2 md:flex flex-wrap items-start justify-around md:justify-between gap-8 lg:gap-12 mx-auto lg:mx-0 w-full md:max-w-1/2 lg:max-w-1/2 mt-8 lg:mt-0">


            {/* Company Section */}
            <div>

              <div className="flex items-start gap-2 mb-6">
                <TitleStarter />
                <h3 className="text-lg font-semibold text-white">Company</h3>
              </div>

              <div className="space-y-4">
                <Link href="/" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  About
                </Link>
                <Link href="/" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Careers
                </Link>
                <Link href="/" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Authors
                </Link>
                <Link href="/" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Advertise
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Contact
                </Link>
              </div>

            </div>

            

            {/* Categories Section */}
            <div>

              <div className="flex items-start gap-2 mb-6">
                <TitleStarter />
                <h3 className="text-lg font-semibold text-white">Categories</h3>
              </div>


              <div className="gap-x-6">
                <div className="space-y-4">
                  <Link href="/business" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Business
                  </Link>
                  <Link href="/health" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Health
                  </Link>
                  <Link href="/fashion" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Fashion
                  </Link>
                  <Link href="/travel" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Travel
                  </Link>
                  <Link href="/sports" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Sports
                  </Link>

                  <Link href="/finance" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Finance
                  </Link>
                  <Link href="/politics" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Politics
                  </Link>
                  <Link href="/real-estate" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Real Estate
                  </Link>
                  <Link href="/entertainment" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Entertainment
                  </Link>
                  <Link href="/tech" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Tech
                  </Link>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div>

              <div className="flex items-start gap-2 mb-6">
                <TitleStarter />
                <h3 className="text-lg font-semibold text-white">Social Media</h3>
              </div>

              <div className="space-y-4">
                <Link href="https://twitter.com" target="_blank" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  <Twitter className="w-5 h-5" />
                  Twitter
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </Link>
              </div>

            </div>

          </div>


        </div>



        {/* Footer Bottom */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Copyright © {currentYear} • All Rights Reserved
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-project fill-current" /> by <Link target='_blank' href="https://www.github.com/joydeep-git" className='text-project'>Joydeep Das</Link>
            </p>
          </div>
        </div>

      </MaxWidthWrapper>

    </footer>
  );
};

export default Footer;