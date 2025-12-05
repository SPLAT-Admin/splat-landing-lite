'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  DollarSign,
  Users,
  Mail,
  Tag,
  ShoppingBag,
  LayoutDashboard,
  GitBranch,
} from 'lucide-react';

const links = [
  { name: 'Dashboard', href: '/landingadmin/dashboard', icon: LayoutDashboard },
  { name: 'Releases', href: '/landingadmin/releases', icon: GitBranch },
  { name: 'Sales', href: '/landingadmin/sales', icon: DollarSign },
  { name: 'Analytics', href: '/landingadmin/analytics', icon: BarChart3 },
  { name: 'Customers', href: '/landingadmin/customers', icon: Users },
  { name: 'Emails', href: '/landingadmin/emails', icon: Mail },
  { name: 'Promos', href: '/landingadmin/promos', icon: Tag },
  { name: 'Merch', href: '/landingadmin/merch', icon: ShoppingBag },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='w-64 bg-jet-black border-r border-acid-white/10 text-acid-white flex flex-col'>
      <div className='p-6 border-b border-acid-white/10'>
        <h1 className='text-2xl font-bold text-deep-crimson tracking-tight'>SPL@T</h1>
        <p className='text-xs opacity-70 mt-1'>Campaign Command</p>
      </div>
      <nav className='flex-1 overflow-y-auto py-4'>
        {links.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-5 py-3 transition-all
                ${
                  active
                    ? 'bg-deep-crimson text-acid-white font-semibold'
                    : 'text-acid-white/70 hover:text-acid-white hover:bg-deep-crimson/20'
                }
              `}
            >
              <Icon className='w-5 h-5' />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
      <div className='p-4 text-xs text-acid-white/40 border-t border-acid-white/10'>
        © SPL@T 2025
      </div>
    </aside>
  );
}
