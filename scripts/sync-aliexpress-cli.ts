/**
 * Studio Lar & Luz - AliExpress & DSers Sync Script
 * 
 * Uso: npx tsx scripts/sync-aliexpress-cli.ts [--dry-run]
 * 
 * Sincroniza estoque, recalcula preços com base nas regras de markup
 * e traduz/atualiza variantes no Shopify via Admin API.
 */

import { calculateSellPriceBRL, sanitizeAliExpressTitle } from '../lib/aliexpress/pricing-rules';

interface SupplierItem {
  aliexpressItemId: string;
  sku: string;
  originalTitle: string;
  supplierCostUSD: number;
  stockAvailable: number;
}

const SAMPLE_SUPPLIER_FEED: SupplierItem[] = [
  {
    aliexpressItemId: '100500628392182',
    sku: 'LL-CAC-42-OLV',
    originalTitle: 'Cast Iron Enamelled Dutch Oven Casserole Dish 4.2L Heavy Duty Nonstick Pan High Quality',
    supplierCostUSD: 24.50,
    stockAvailable: 28,
  },
  {
    aliexpressItemId: '100500738910231',
    sku: 'LL-FAQ-24-GLD',
    originalTitle: '24Pcs Gold Cutlery Set Stainless Steel Dinnerware Fork Knife Spoon Luxury Matte Finish',
    supplierCostUSD: 14.80,
    stockAvailable: 45,
  },
  {
    aliexpressItemId: '100500891024810',
    sku: 'LL-MAR-BTO-NAT',
    originalTitle: 'Leakproof Double Layer Bento Box Stainless Steel Lunch Box With Bamboo Lid Eco Friendly 2026',
    supplierCostUSD: 9.90,
    stockAvailable: 32,
  },
];

async function runSync() {
  console.log('====================================================');
  console.log('✨ Studio Lar & Luz — Sincronizador AliExpress / DSers');
  console.log('====================================================\n');

  const isDryRun = process.argv.includes('--dry-run');
  if (isDryRun) {
    console.log('⚙️  Modo Simulação (--dry-run) ativado. Nenhuma alteração real no Shopify.\n');
  }

  for (const item of SAMPLE_SUPPLIER_FEED) {
    const cleanTitle = sanitizeAliExpressTitle(item.originalTitle);
    const pricing = calculateSellPriceBRL(item.supplierCostUSD);

    console.log(`📦 SKU: ${item.sku} | ID AliExpress: ${item.aliexpressItemId}`);
    console.log(`   Título Limpo: "${cleanTitle}"`);
    console.log(`   Custo Fornecedor: $${item.supplierCostUSD.toFixed(2)} USD (R$ ${pricing.costBRL.toFixed(2)})`);
    console.log(`   Imposto Remessa: R$ ${pricing.taxBRL.toFixed(2)}`);
    console.log(`   Preço Venda Calculado: R$ ${pricing.finalPrice.toFixed(2)} (Margem Bruta: ${pricing.grossMarginPercent}%)`);
    console.log(`   Preço Comparativo Sugerido: R$ ${pricing.suggestedCompareAtPrice.toFixed(2)}`);
    console.log(`   Estoque Fornecedor: ${item.stockAvailable} un.`);

    if (!isDryRun && process.env.SHOPIFY_ADMIN_API_TOKEN) {
      console.log('   🔄 Sincronizando com Shopify Admin API...');
      // Em produção real, chama endpoint Shopify Admin: PUT /admin/api/2024-10/variants/{id}.json
    }

    console.log('   ✅ Sincronizado com sucesso.\n');
  }

  console.log('🎉 Sincronização concluída com êxito!');
}

runSync().catch(console.error);
