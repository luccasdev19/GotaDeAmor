'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Gota de Amor
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/sobre" className="text-gray-700 hover:text-blue-600 transition">
              Sobre
            </Link>
            <Link href="/acolhimento" className="text-gray-700 hover:text-blue-600 transition">
              Acolhimento
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition">
              Blog
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-blue-600 transition">
              Contato
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700">
              <Link href="/doacoes">Doar</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Início
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-blue-600">
              Sobre
            </Link>
            <Link href="/acolhimento" className="text-gray-700 hover:text-blue-600">
              Acolhimento
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600">
              Blog
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-blue-600">
              Contato
            </Link>
            <Button asChild variant="default" className="bg-pink-600 hover:bg-pink-700 w-full">
              <Link href="/doacoes">Doar</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
