import React, { useState } from 'react'
import ProfileMenu from '../Sidebar/ProfileMenu'
import { useTrans } from '@/Hooks/useTrans';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
  const { t } = useTrans();
  const { cart_count } = usePage().props;

  return (
    <nav className="max-md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 h-auto sticky top-0 z-30">
      {/* Cart Icon with Badge */}
      <Link
        href={route('cart.index')}
        className="relative inline-flex items-center px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
      >
        <i className="fa-solid fa-shopping-cart text-xl"></i>
        {/* Badge - Show only if cart has items */}
        {cart_count > 0 && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
            {cart_count > 9 ? '9+' : cart_count}
          </span>
        )}
      </Link>

      <ProfileMenu position="navbar" />
    </nav>
  )
}
