'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profiles', label: 'Profiles' },
  { href: '/search', label: 'Search' },
  { href: '/account', label: 'Account' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16">
        <Link href="/dashboard" className="text-xl font-bold text-white mr-10">
          Insighta Labs+
        </Link>
        <div className="flex gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                pathname === link.href
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
