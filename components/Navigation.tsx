'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Settings, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'ホーム', icon: Home },
    { href: '/calculate', label: 'Fee計算', icon: Calculator },
    { href: '/settings', label: '設定', icon: Settings },
  ];

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Fee Calculator
          </Link>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
