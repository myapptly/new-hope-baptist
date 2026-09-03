'use client';

import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/sermons', label: 'Sermons', icon: '🎙️' },
  { href: '/calendar', label: 'Calendar', icon: '🗓️' },
  { href: '/pictures', label: 'Pictures', icon: '📷' },
  { href: '/victory-path', label: 'Victory', icon: '🏀' },
];

export default function PublicBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith('/pastor')) return null;

  return (
    <nav className="public-bottom-nav fixed inset-x-0 bottom-0 z-[9999] mx-auto grid max-w-md grid-cols-5 border-t-2 border-[#cbb8d3] bg-white px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_32px_rgba(34,18,43,0.28)]">
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
        return (
          <a key={item.label} href={item.href} className={`flex flex-col items-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-bold transition ${active ? 'bg-[#efe4f3] text-[#4f285e]' : 'text-[#5e346e]'}`}>
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
