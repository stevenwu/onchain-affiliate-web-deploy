'use client';

import NextLink from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full text-base-blue">
      <div className="container p-4">
      <NextLink
        href="/"
        passHref
        className="text-center font-mono text-lg font-medium tracking-tight no-underline align-middle"
      >
        © 2024 ONCHAIN AFFILLIATE
      </NextLink>

      </div>
    </footer>
  );
}
