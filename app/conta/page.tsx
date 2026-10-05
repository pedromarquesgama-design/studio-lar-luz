'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Package, MapPin, LogOut, Truck, Clock } from 'lucide-react';
import { formatBRL } from '@/lib/utils/format';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-charcoal/10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-olive font-bold">
              Minha Conta
            </span>
            <h1 className="text-3xl font-serif text-charcoal font-normal tracking-tight mt-1">
              Olá, Mariana Guimarães
            </h1>
            <p className="text-xs text-charcoal-muted mt-1">
              mariana@email.com • Membro desde Setembro de 2026
            </p>
          </div>

          <button
            onClick={() => alert('Sessão encerrada com segurança.')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-muted hover:text-red-600 transition-colors self-start sm:self-center"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-charcoal/10 mb-8 overflow-x-auto pb-1 text-xs sm:text-sm font-semibold text-charcoal">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-terracotta text-terracotta'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Meus Pedidos (1)</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'addresses'
                ? 'border-terracotta text-terracotta'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Endereços Salvos</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-terracotta text-terracotta'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Meus Dados</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-cream-50 p-6 rounded-2xl border border-charcoal/10 shadow-soft-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-charcoal/10 gap-2">
                <div>
                  <span className="text-xs font-bold text-charcoal">Pedido #LL1042</span>
                  <p className="text-xs text-charcoal-muted">Realizado em 30 de Setembro de 2026</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-olive px-3 py-1 rounded-full bg-olive/15 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Em Trânsito</span>
                  </span>
                  <Link
                    href="/rastreio?codigo=LL1042"
                    className="text-xs font-semibold text-terracotta hover:underline flex items-center gap-1"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Rastrear</span>
                  </Link>
                </div>
              </div>

              {/* Items summary */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span>1x Caçarola Holandesa em Ferro Fundido Esmaltado 4.2L (Verde Oliva)</span>
                  <strong className="text-charcoal">{formatBRL(389.00)}</strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>1x Jogo de 4 Copos Térmicos em Vidro Duplo 350ml</span>
                  <strong className="text-charcoal">{formatBRL(139.00)}</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-charcoal/10 flex justify-between text-sm font-bold text-charcoal">
                <span>Total Pago (Pix com 5% OFF)</span>
                <span>{formatBRL(501.60)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-cream-50 p-6 rounded-2xl border border-charcoal/10 shadow-soft-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-olive px-2.5 py-0.5 rounded-full bg-olive/15">
                Principal
              </span>
              <h3 className="text-sm font-bold text-charcoal pt-1">Casa Mariana</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Alameda dos Jacarandás, 120 - Apto 42<br />
                Jardins, São Paulo - SP<br />
                CEP: 01402-000
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === 'profile' && (
          <div className="bg-cream-50 p-6 rounded-2xl border border-charcoal/10 shadow-soft-sm max-w-xl space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Nome Completo</label>
              <input
                type="text"
                defaultValue="Mariana Guimarães"
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-charcoal/20 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">E-mail</label>
              <input
                type="email"
                defaultValue="mariana@email.com"
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-charcoal/20 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Telefone Celular</label>
              <input
                type="tel"
                defaultValue="(11) 98765-4321"
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-charcoal/20 bg-white"
              />
            </div>
            <button
              onClick={() => alert('Dados atualizados!')}
              className="px-6 py-2.5 rounded-full bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta-hover transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
