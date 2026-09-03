'use client';

import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/sermons', label: 'Sermons', icon: '🎙️' },
  { href: '/calendar', label: 'Calendar', icon: '🗓️' },
  { href: '/pictures', label: 'Pictures', icon: '📷' },
  { href: '/#contact', label: 'Contact', icon: '☎' },
];

export default function PublicBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith('/pastor')) return null;

  return (
    <nav className="public-bottom-nav fixed inset-x-0 bottom-0 z-[100] mx-auto grid max-w-md grid-cols-5 border-t border-[#d9c9df] bg-[#fffafd]/98 px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_28px_rgba(47,29,58,0.14)] backdrop-blur-md">
      {items.map((item) => {
        const targetPath = item.href.split('#')[0] || '/';
        const active =
          item.label !== 'Contact' &&
          (pathname === targetPath ||
            (targetPath !== '/' && pathname.startsWith(`${targetPath}/`)));

        return (
          <a
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-bold transition ${
              active
                ? 'bg-[#efe4f3] text-[#4f285e]'
                : 'text-[#5e346e]'
            }`}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
