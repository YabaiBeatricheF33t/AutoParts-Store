"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wrench, Users, ShoppingCart, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';
import { useAuth, Role } from '@/lib/auth';

export function Navigation() {
  const pathname = usePathname();
  const { role, setRole } = useAuth();
  
  const navItems = [
    { href: '/', label: 'Витрина запчастей', icon: Wrench, requireAdmin: false },
    { href: '/cart', label: 'Корзина', icon: ShoppingCart, requireAdmin: false },
    { href: '/users', label: 'Пользователи (Админ)', icon: Users, requireAdmin: true },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600 flex items-center gap-2">
                <Wrench className="w-6 h-6" />
                AutoParts
              </span>
            </div>
            <div className="ml-6 flex items-center space-x-8">
              {navItems.map((item) => {
                if (item.requireAdmin && role !== 'admin') return null;

                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full',
                      isActive 
                        ? 'border-blue-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
              <ShieldAlert className="w-4 h-4 text-gray-500 ml-2 mr-1" />
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="bg-transparent text-sm font-medium text-gray-700 py-1 pr-2 pl-1 focus:outline-none"
                title="Управление доступом (симуляция)"
              >
                <option value="guest">Гость</option>
                <option value="customer">Покупатель</option>
                <option value="admin">Администратор</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
