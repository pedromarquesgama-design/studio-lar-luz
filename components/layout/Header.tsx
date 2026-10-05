'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import { StudioLogo } from '../common/StudioLogo';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { SearchModal } from './SearchModal';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-cream-50/95 backdrop-blur-md shadow-soft-sm py-2.5'
            : 'bg-cream-100 py-4'
        } border-b border-charcoal/10`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile hamburger & Desktop Nav */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-charcoal hover:text-terracotta transition-colors"
                aria-label="Abrir menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wider uppercase text-charcoal font-times">
                <Link
                  href="/"
                  className="hover:text-terracotta transition-colors"
                >
                  HOME
                </Link>
                {/* Collections Mega Menu Trigger */}
                <div
                  className="relative group py-2"
                  onMouseEnter={() => setShopDropdownOpen(true)}
                  onMouseLeave={() => setShopDropdownOpen(false)}
                >
                  <Link
                    href="/colecoes"
                    className="flex items-center gap-1 hover:text-terracotta transition-colors"
                  >
                    <span>COLEÇÕES</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {shopDropdownOpen && (
                    <div className="absolute top-full left-0 w-64 bg-cream-50 rounded-b-xl shadow-soft-lg border border-charcoal/10 py-3 px-2 animate-fade-in">
                      <Link
                        href="/colecoes/cozinha"
                        className="block px-3 py-2 text-xs font-normal text-charcoal hover:bg-paper-light hover:text-terracotta rounded transition-colors"
                      >
                        Cozinha & Utensílios
                      </Link>
                      <Link
                        href="/colecoes/mesa-posta"
                        className="block px-3 py-2 text-xs font-normal text-charcoal hover:bg-paper-light hover:text-terracotta rounded transition-colors"
                      >
                        Mesa Posta & Faqueiros
                      </Link>
                      <Link
                        href="/colecoes/cafes-e-copos"
                        className="block px-3 py-2 text-xs font-normal text-charcoal hover:bg-paper-light hover:text-terracotta rounded transition-colors"
                      >
                        Xícaras & Copos
                      </Link>
                      <Link
                        href="/colecoes/panelas"
                        className="block px-3 py-2 text-xs font-normal text-charcoal hover:bg-paper-light hover:text-terracotta rounded transition-colors"
                      >
                        Panelas & Ferro Fundido
                      </Link>
                      <Link
                        href="/colecoes/marmitas"
                        className="block px-3 py-2 text-xs font-normal text-charcoal hover:bg-paper-light hover:text-terracotta rounded transition-colors"
                      >
                        Marmitas Herméticas Inox
                      </Link>
                      <Link
                        href="/colecoes/banho"
                        className="block px-3 py-2 text-xs font-normal text-charcoal hover:bg-paper-light hover:text-terracotta rounded transition-colors"
                      >
                        Banho & Algodão Egípcio
                      </Link>
                      <Link
                        href="/colecoes/lar-e-decoracao"
                        className="block px-3 py-2 text-xs font-normal text-charcoal hover:bg-paper-light hover:text-terracotta rounded transition-colors"
                      >
                        Lar & Detalhes
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  href="/colecoes?filtro=ofertas"
                  className="text-terracotta font-semibold hover:text-terracotta-hover transition-colors"
                >
                  OFERTAS
                </Link>
                <Link
                  href="/journal"
                  className="hover:text-terracotta transition-colors"
                >
                  JOURNAL
                </Link>
              </nav>
            </div>

            {/* Center: Brand Logo — absolutely centered so left/right widths don't shift it.
                Out of flow, so enlarging the logo doesn't change navbar height. */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
              <StudioLogo priority />
            </div>

            {/* Right: Search, Account, Wishlist, Cart */}
            <div className="flex items-center gap-3 sm:gap-4 text-charcoal">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:text-terracotta transition-colors rounded-full hover:bg-paper-light"
                aria-label="Buscar produtos"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account Link */}
              <Link
                href="/conta"
                className="p-2 hover:text-terracotta transition-colors rounded-full hover:bg-paper-light hidden sm:inline-flex"
                aria-label="Minha Conta"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist Link */}
              <Link
                href="/lista-de-desejos"
                className="relative p-2 hover:text-terracotta transition-colors rounded-full hover:bg-paper-light"
                aria-label="Lista de desejos"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative p-2 text-charcoal hover:text-terracotta transition-colors rounded-full hover:bg-paper-light"
                aria-label="Abrir carrinho"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-subtle">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer — anchored to header bottom so it tracks the sticky navbar */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute inset-x-0 top-full max-h-[calc(100vh-120px)] overflow-y-auto bg-cream-50 border-t border-charcoal/10 shadow-soft-lg px-6 py-8">
            <div className="flex flex-col gap-6 text-base font-medium tracking-wide uppercase text-charcoal font-times">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-terracotta transition-colors"
              >
                Home
              </Link>
              <Link
                href="/colecoes"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-terracotta transition-colors"
              >
                Todas as Coleções
              </Link>
              <div className="pl-4 border-l-2 border-gold flex flex-col gap-3 text-sm normal-case text-charcoal-muted">
                <Link
                  href="/colecoes/cozinha"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-terracotta"
                >
                  Cozinha & Utensílios
                </Link>
                <Link
                  href="/colecoes/mesa-posta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-terracotta"
                >
                  Mesa Posta & Faqueiros
                </Link>
                <Link
                  href="/colecoes/cafes-e-copos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-terracotta"
                >
                  Xícaras & Copos
                </Link>
                <Link
                  href="/colecoes/panelas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-terracotta"
                >
                  Panelas & Ferro Fundido
                </Link>
                <Link
                  href="/colecoes/marmitas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-terracotta"
                >
                  Marmitas Herméticas Inox
                </Link>
                <Link
                  href="/colecoes/banho"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-terracotta"
                >
                  Banho & Toalhas Waffle
                </Link>
              </div>

              <Link
                href="/colecoes?filtro=ofertas"
                onClick={() => setMobileMenuOpen(false)}
                className="text-terracotta font-semibold hover:text-terracotta-hover transition-colors"
              >
                Ofertas da Estação
              </Link>
              <Link
                href="/journal"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-terracotta transition-colors"
              >
                Journal & Inspiração
              </Link>
              <Link
                href="/rastreio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-normal text-olive hover:underline"
              >
                Rastrear Meu Pedido
              </Link>
              <Link
                href="/sobre"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-normal text-charcoal-muted hover:underline"
              >
                Sobre a Studio Lar & Luz
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
