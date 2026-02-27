"use client";


import React from 'react';
import { User, Mail, Calendar, Globe, Crown, Headphones, Newspaper, Settings, CreditCard } from 'lucide-react';
import dateUtility from '@/utils/dateUtility';
import { countryMap, defaultValues } from '@/utils/constants';
import { useAppSelector } from '@/redux/store';
import ProfileLoadingPage from '@/components/profileLoadingPage';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import ProfileAvatarDropdown from '@/components/profile-components/profileAvatarDropdown';



const ProfilePage = () => {

  const { user: userData } = useAppSelector(state => state.auth);

  const getCountryName = (code: string) => {
    return countryMap[code] || code;
  };


  return (

    !userData

      ? <ProfileLoadingPage />

      : <div className="w-full space-y-6">

        {/* Profile Header Card */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">

              <div className="relative group">
                <Image
                  src={userData.avatar?.url || defaultValues?.avatar}
                  width={120}
                  height={120}
                  alt={userData.name}
                  className="w-28 h-28 rounded-lg border-2 border-slate-200 object-cover bg-white"
                />

                {userData.isPremium && (
                  <div className="absolute -top-2 -right-2 bg-slate-900 p-1.5 rounded-full shadow-md">
                    <Crown size={14} className="text-yellow-400" />
                  </div>
                )}

                <div className="absolute inset-0 flex items-start justify-end h-full" >
                  <ProfileAvatarDropdown />
                </div>

              </div>



              <div className="flex-1 md:ml-2">

                <h1 className="text-2xl font-semibold text-slate-900">{userData.name}</h1>

                <p className="text-sm text-slate-500 mt-1">@{userData.username}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <Link
                    href="/settings?active=profile"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <Settings size={16} />
                    Edit Profile
                  </Link>

                  <Link
                    href="/settings?active=subscription"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <CreditCard size={16} />
                    Manage Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-5">
              <User className="text-slate-700" size={20} />
              <h2 className="text-base font-semibold text-slate-900">Account Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">Email Address</p>
                <div className="flex items-center gap-2 text-slate-900">
                  <Mail size={14} className="text-slate-400 shrink-0" />
                  <p className="text-sm break-all">{userData.email}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">Default Country</p>
                <div className="flex items-center gap-2 text-slate-900">
                  <Globe size={14} className="text-slate-400 shrink-0" />
                  <p className="text-sm">{getCountryName(userData.defaultCountry!)}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">Member Since</p>
                <div className="flex items-center gap-2 text-slate-900">
                  <Calendar size={14} className="text-slate-400 shrink-0" />
                  <p className="text-sm">{dateUtility.formatDate(userData.createdAt)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">Last Updated</p>
                <div className="flex items-center gap-2 text-slate-900">
                  <Calendar size={14} className="text-slate-400 shrink-0" />
                  <p className="text-sm">{dateUtility.formatDate(userData.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plan & Subscription */}
          <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 text-white">
            <div className="flex items-center gap-2 mb-5">
              <Crown size={20} />
              <h2 className="text-base font-semibold">Current Plan</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-2">Membership Status</p>
                <div className="flex items-center gap-2">
                  {userData.isPremium ? (
                    <>
                      <Crown size={18} />
                      <p className="text-xl font-semibold">Premium</p>
                    </>
                  ) : (
                    <>
                      <User size={18} />
                      <p className="text-xl font-semibold">Free Plan</p>
                    </>
                  )}
                </div>
              </div>

              {userData.isPremium && userData.planExpiryDate && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-2">Plan Expires</p>
                  <p className="text-base font-semibold">{dateUtility.formatDate(userData.planExpiryDate)}</p>
                </div>
              )}

              {!userData.isPremium && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <p className="text-xs text-white/80 mb-3">Upgrade to unlock premium features and get unlimited access</p>
                  <Link
                    href="/pricing"
                    className="inline-block px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold hover:bg-slate-100 transition-colors"
                  >
                    View Plans
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Usage Balance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-900 rounded-lg">
                  <Newspaper size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">News Credits</p>
                  <p className="text-2xl font-semibold text-slate-900">{userData.newsBalance}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-900 rounded-lg">
                  <Headphones size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Audio Credits</p>
                  <p className="text-2xl font-semibold text-slate-900">{userData.audioBalance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProfilePage;