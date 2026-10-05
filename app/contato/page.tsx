'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Clock, MapPin, CheckCircle2, ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Qual o valor do frete e o prazo de entrega?',
    a: 'O frete é grátis para todo o território brasileiro em compras a partir de R$ 199. Para compras abaixo desse valor, o frete é calculado de acordo com o seu CEP. Prazos médios: Sul e Sudeste (2 a 5 dias úteis), Centro-Oeste e Nordeste (4 a 8 dias úteis), Norte (6 a 12 dias úteis).',
  },
  {
    q: 'Como funciona o pagamento via Pix?',
    a: 'Ao selecionar o Pix no checkout, você ganha 5% de desconto automático. O sistema gera um QR Code e um código "Pix Copia e Cola" com validade de 30 minutos. Assim que você conclui o pagamento no aplicativo do seu banco, o pedido é confirmado instantaneamente.',
  },
  {
    q: 'Posso parcelar no cartão de crédito?',
    a: 'Sim, aceitamos as bandeiras Visa, Mastercard, Elo, Hipercard e American Express com parcelamento em até 6x sem juros (ou em até 12x com pequeno acréscimo da operadora).',
  },
  {
    q: 'Como solicitar troca ou devolução?',
    a: 'Você possui até 30 dias corridos após a entrega para solicitar a troca por outro produto ou a devolução com estorno total do valor pago. A primeira troca tem frete reverso 100% gratuito coberto pela Studio Lar & Luz.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-terracotta font-bold">
            Atendimento & SAC
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal tracking-tight mt-2">
            Estamos Aqui por Você
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
            Dúvidas sobre produtos, pedidos ou sugestões? Fale com nossa equipe humanizada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/5511987654321?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20a%20Studio%20Lar%20%26%20Luz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-cream-50 border border-charcoal/10 shadow-soft-sm hover:border-olive transition-all flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-olive/15 text-olive flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-charcoal">WhatsApp Oficial</h3>
                  <p className="text-xs text-charcoal-muted mt-0.5">(11) 98765-4321</p>
                  <span className="text-[11px] text-olive font-semibold mt-1 inline-block">
                    Atendimento em tempo real →
                  </span>
                </div>
              </a>

              <div className="p-5 rounded-2xl bg-cream-50 border border-charcoal/10 shadow-soft-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-charcoal">E-mail SAC</h3>
                  <p className="text-xs text-charcoal-muted mt-0.5">atendimento@studiolarluz.com.br</p>
                  <span className="text-[11px] text-charcoal-muted mt-1 inline-block">
                    Resposta em até 24h úteis
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-cream-50 p-6 sm:p-8 rounded-2xl border border-charcoal/10 shadow-soft-sm">
              <h2 className="text-lg font-serif font-bold text-charcoal mb-4">
                Envie uma Mensagem
              </h2>

              {submitted ? (
                <div className="p-6 rounded-xl bg-olive/15 text-olive-dark text-center space-y-2 animate-fade-in">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-olive" />
                  <p className="font-bold text-sm">Mensagem enviada com sucesso!</p>
                  <p className="text-xs">Nossa equipe retornará no seu e-mail em até 24 horas úteis.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Seu Nome *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-charcoal/20 bg-white"
                        placeholder="Mariana Silva"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Seu E-mail *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-charcoal/20 bg-white"
                        placeholder="mariana@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Assunto *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-charcoal/20 bg-white"
                      placeholder="Dúvida sobre produto ou pedido #..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Mensagem *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-xs p-3.5 rounded-lg border border-charcoal/20 bg-white focus:outline-none focus:border-terracotta"
                      placeholder="Como podemos te ajudar hoje?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold uppercase tracking-wider shadow-soft-sm transition-all"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: FAQ Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-cream-50 p-6 sm:p-8 rounded-2xl border border-charcoal/10 shadow-soft-sm">
              <h2 className="text-lg font-serif font-bold text-charcoal mb-4">
                Perguntas Frequentes (FAQ)
              </h2>

              <div className="divide-y divide-charcoal/10">
                {FAQS.map((faq, i) => (
                  <div key={i} className="py-3.5 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left text-xs sm:text-sm font-semibold text-charcoal flex items-center justify-between gap-2"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-charcoal-muted transition-transform shrink-0 ${
                          openFaq === i ? 'rotate-180 text-terracotta' : ''
                        }`}
                      />
                    </button>
                    {openFaq === i && (
                      <p className="mt-2 text-xs text-charcoal-muted leading-relaxed animate-fade-in">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Operational details */}
            <div className="p-6 rounded-2xl bg-paper-light border border-charcoal/10 text-xs text-charcoal-muted space-y-2">
              <div className="flex items-center gap-2 font-bold text-charcoal">
                <Clock className="w-4 h-4 text-olive" />
                <span>Horário de Funcionamento</span>
              </div>
              <p>Segunda a Sexta-feira: 09h00 às 18h00</p>
              <p>Sábados: 09h00 às 13h00 (Exceto feriados nacionais)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
