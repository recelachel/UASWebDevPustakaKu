"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", label: "Beranda" },
  { href: "/buku", label: "Daftar Buku" },
  { href: "/buku/baru", label: "Tambah Buku" },
];

function aktif(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/buku") return pathname === "/buku" || /^\/buku\/\d+/.test(pathname);
  return pathname === href;
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="judul text-xl font-bold text-[var(--ink)]">
          PustakaKu
        </Link>
        <ul className="flex flex-wrap gap-1 text-sm">
          {menu.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                aria-current={aktif(pathname, m.href) ? "page" : undefined}
                className={`rounded px-3 py-1.5 ${
                  aktif(pathname, m.href)
                    ? "bg-[var(--ink)] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {m.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}