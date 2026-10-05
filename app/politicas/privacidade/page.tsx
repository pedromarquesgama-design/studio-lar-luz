import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade (LGPD) — Studio Lar & Luz',
  description: 'Conheça nossa política de proteção de dados e privacidade em conformidade com a LGPD (Lei nº 13.709/2018).',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream-100 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal tracking-tight mb-2">
          Política de Privacidade e Proteção de Dados
        </h1>
        <p className="text-xs text-charcoal-muted mb-8">
          Última atualização: 02 de Outubro de 2026 • Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
        </p>

        <div className="bg-cream-50 p-8 rounded-2xl border border-charcoal/10 shadow-soft-sm prose prose-stone max-w-none text-xs sm:text-sm text-charcoal-muted leading-relaxed space-y-6">
          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">1. Compromisso com a sua Privacidade</h2>
            <p>
              O <strong>Studio Lar & Luz</strong> (CNPJ 54.321.987/0001-00) valoriza e respeita a privacidade de todos os seus clientes e visitantes. Coletamos e processamos dados pessoais estritamente necessários para viabilizar suas compras, emitir notas fiscais, despachar encomendas e aprimorar sua experiência de navegação.
            </p>
          </section>

          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">2. Dados Coletados</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Identificação e Contato:</strong> Nome completo, CPF, e-mail, telefone WhatsApp e endereço de entrega.</li>
              <li><strong>Dados de Pagamento:</strong> Processados diretamente em ambiente seguro PCI-DSS certificado (Stripe / Shopify Payments). Nunca armazenamos dados completos de cartão em nossos servidores.</li>
              <li><strong>Navegação:</strong> Cookies analíticos necessários para funcionamento do carrinho e medição de desempenho anônimo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">3. Seus Direitos (LGPD)</h2>
            <p>
              Você pode, a qualquer momento, solicitar a confirmação da existência de tratamento, o acesso aos seus dados, a correção de informações incompletas ou a exclusão dos seus dados de nossa base entrando em contato pelo e-mail <strong>privacidade@studiolarluz.com.br</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
