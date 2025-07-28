// src/components/Navbar.jsx
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: 'Início' },
    { href: '/estoque', label: 'Estoque' },
    { href: '/vender', label: 'Venda seu veículo' },
    { href: '/financiamento', label: 'Financiamento' },
    { href: '/quemsomos', label: 'Quem Somos' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <nav className="bg-neutral-900 shadow-md border-b border-brand-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="text-white text-2xl font-bold">União Motos</Link>
        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <ul className={`md:flex md:items-center md:space-x-6 ${
          open ? 'block' : 'hidden'
        }`}>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}
                 className="block py-2 md:py-0 text-neutral-300 hover:text-white font-medium">
                  {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/dashboard"
               className="inline-block mt-2 md:mt-0 px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600 transition">
                Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
