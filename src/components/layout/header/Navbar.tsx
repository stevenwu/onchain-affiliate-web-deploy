import { clsx } from 'clsx';
import NextLink from 'next/link';
import AccountConnect from './AccountConnect';

export function NavbarLink({
  href,
  children,
  target,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  ariaLabel?: string;
}) {
  return (
    <NextLink
      href={href}
      className="font-sans px-0 text-center text-base font-normal text-base-blue no-underline"
      target={target}
      aria-label={ariaLabel}
    >
      {children}
    </NextLink>
  );
}

export function NavbarTitle() {
  return (
    <div className="flex h-8 items-center justify-start gap-4">
      <NextLink
        href="/"
        passHref
        className="text-lg font-medium text-base-blue no-underline tracking-tighter font-mono"
        aria-label="Onchain Affiliate"
      >
        ONCHAIN AFFILIATE
      </NextLink>
    </div>
  );
}

function Navbar() {
  return (
    <nav
      className={clsx(
        'container mx-auto flex flex-1 flex-grow items-center justify-between',
      )}
    >
      <div className="flex h-8 grow items-center justify-between gap-4">
        <NavbarTitle />
        <div className="flex items-center justify-start gap-8">
          <AccountConnect />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
