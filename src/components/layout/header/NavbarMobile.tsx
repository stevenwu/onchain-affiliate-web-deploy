import { useCallback, useState } from 'react';
import {
  ChevronDownIcon,
  Cross1Icon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import AccountConnect from './AccountConnect';
import { NavbarTitle } from './Navbar';

export default function NavbarMobile() {
  return (
    <nav
      className={[
        'flex flex-1 flex-grow items-center justify-between text-gray-700',
        'backdrop-blur-2xl',
      ].join(' ')}
    >
      <div className="flex h-8 grow items-center justify-between gap-4">
        <NavbarTitle />
        <AccountConnect />
      </div>
    </nav>
  );
}
