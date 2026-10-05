import React from 'react';
import Link from 'next/link';
import { StudioLogo } from '../common/StudioLogo';
import { ShieldCheck, Mail, Phone } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../common/SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#201F1E] text-cream-200 text-xs border-t border-charcoal/30">
      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand Info & SAC (spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <StudioLogo variant="full" theme="dark" priority={false} />
            <p className="text-cream-300/80 text-xs sm:text-sm leading-relaxed max-w-sm mt-3">
              Studio Lar & Luz é um manifesto pelo viver com calma. Criamos e selecionamos peças de cozinha, mesa posta e acolhimento para casas que contam histórias.
            </p>
            <div className="space-y-1.5 text-cream-300/70 text-xs pt-2">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-light" />
                <span>atendimento@studiolarluz.com.br</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-light" />
                <span>WhatsApp: (11) 98765-4321 • Seg a Sex das 9h às 18h</span>
              </p>
              <p className="text-[11px] text-cream-300/50 pt-1">
                CNPJ: 54.321.987/0001-00 • Studio Lar & Luz Artigos para Casa Ltda.
              </p>
            </div>
          </div>

          {/* Column 2: Comprar */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold uppercase tracking-widest text-gold-light">
              Comprar
            </h4>
            <ul className="space-y-2 text-cream-300/80">
              <li>
                <Link href="/colecoes/cozinha" className="hover:text-white transition-colors">
                  Cozinha & Utensílios
                </Link>
              </li>
              <li>
                <Link href="/colecoes/mesa-posta" className="hover:text-white transition-colors">
                  Mesa Posta & Faqueiros
                </Link>
              </li>
              <li>
                <Link href="/colecoes/cafes-e-copos" className="hover:text-white transition-colors">
                  Xícaras & Copos
                </Link>
              </li>
              <li>
                <Link href="/colecoes/panelas" className="hover:text-white transition-colors">
                  Panelas de Ferro Fundido
                </Link>
              </li>
              <li>
                <Link href="/colecoes/marmitas" className="hover:text-white transition-colors">
                  Marmitas Herméticas Inox
                </Link>
              </li>
              <li>
                <Link href="/colecoes/banho" className="hover:text-white transition-colors">
                  Banho & Toalhas Waffle
                </Link>
              </li>
              <li>
                <Link href="/colecoes?filtro=ofertas" className="hover:text-terracotta transition-colors font-medium">
                  Ofertas da Estação
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Atendimento ao Cliente */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold uppercase tracking-widest text-gold-light">
              Atendimento
            </h4>
            <ul className="space-y-2 text-cream-300/80">
              <li>
                <Link href="/rastreio" className="hover:text-white transition-colors">
                  Rastrear Meu Pedido
                </Link>
              </li>
              <li>
                <Link href="/politicas/trocas-e-devolucoes" className="hover:text-white transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/politicas/envio-e-prazos" className="hover:text-white transition-colors">
                  Prazos e Frete
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Central de Ajuda & FAQ
                </Link>
              </li>
              <li>
                <Link href="/conta" className="hover:text-white transition-colors">
                  Meus Pedidos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institucional & Redes Sociais */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold uppercase tracking-widest text-gold-light">
              Institucional
            </h4>
            <ul className="space-y-2 text-cream-300/80">
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-white transition-colors">
                  Journal & Dicas
                </Link>
              </li>
              <li>
                <Link href="/politicas/privacidade" className="hover:text-white transition-colors">
                  Privacidade (LGPD)
                </Link>
              </li>
              <li>
                <Link href="/politicas/termos" className="hover:text-white transition-colors">
                  Termos e Condições
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <h5 className="text-[11px] font-semibold uppercase tracking-wider text-cream-300/60 mb-2">
                Siga a Studio Lar & Luz
              </h5>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-charcoal text-cream-200 hover:text-white hover:bg-terracotta transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-charcoal text-cream-200 hover:text-white hover:bg-terracotta transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Badges */}
        <div className="mt-12 pt-8 border-t border-charcoal/40 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Payment Icons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-cream-300/60 mr-2">Formas de Pagamento:</span>
            {['Pix (5% OFF)', 'Visa', 'Mastercard', 'Elo', 'Hipercard', 'Boleto'].map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 rounded bg-[#2A2928] border border-charcoal/60 text-[10px] font-semibold text-cream-300/90"
              >
                {method}
              </span>
            ))}
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-[11px] text-cream-300/70">
            <ShieldCheck className="w-4 h-4 text-gold-light" />
            <span>Ambiente 100% Criptografado & Seguro (SSL 256-bit)</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="bg-[#181716] py-4 border-t border-charcoal/50 text-[11px] text-cream-300/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>© 2026 Studio Lar & Luz. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/politicas/privacidade" className="hover:underline">
              Privacidade
            </Link>
            <span>•</span>
            <Link href="/politicas/termos" className="hover:underline">
              Termos
            </Link>
            <span>•</span>
            <Link href="/politicas/trocas-e-devolucoes" className="hover:underline">
              Código de Defesa do Consumidor
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
