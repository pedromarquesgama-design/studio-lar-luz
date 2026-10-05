export interface PricingRuleConfig {
  usdToBrlRate: number; // e.g. 5.70
  markupMultiplier: number; // e.g. 2.8
  shippingBufferBrl: number; // e.g. 18.50
  remessaConformeTaxPercent: number; // e.g. 20.0 (imposto de importação para compras até $50)
  targetEnding: '00' | '90';
}

export const DEFAULT_PRICING_CONFIG: PricingRuleConfig = {
  usdToBrlRate: 5.70,
  markupMultiplier: 2.8,
  shippingBufferBrl: 18.50,
  remessaConformeTaxPercent: 20.0,
  targetEnding: '00',
};

/**
 * Calcula o preço final de venda em Reais (BRL) a partir do custo do fornecedor no AliExpress (em USD)
 */
export function calculateSellPriceBRL(
  supplierCostUSD: number,
  config: Partial<PricingRuleConfig> = {}
): {
  costBRL: number;
  taxBRL: number;
  basePrice: number;
  finalPrice: number;
  grossMarginPercent: number;
  suggestedCompareAtPrice: number;
} {
  const cfg = { ...DEFAULT_PRICING_CONFIG, ...config };

  // 1. Custo base convertido
  const costBRL = supplierCostUSD * cfg.usdToBrlRate;

  // 2. Imposto Remessa Conforme
  const taxBRL = costBRL * (cfg.remessaConformeTaxPercent / 100);

  // 3. Custo total landed (produto + frete base + imposto)
  const landedCost = costBRL + taxBRL + cfg.shippingBufferBrl;

  // 4. Aplicação do multiplicador de markup
  const rawTargetPrice = landedCost * (cfg.markupMultiplier / 2.0); // multiplicador equilibrado

  // 5. Arredondamento para preço charmoso (ex: R$ 189,00 ou R$ 189,90)
  let roundedInteger = Math.round(rawTargetPrice);
  if (roundedInteger % 10 === 0) roundedInteger -= 1; // 190 -> 189

  const finalPrice =
    cfg.targetEnding === '90'
      ? parseFloat(`${roundedInteger}.90`)
      : parseFloat(`${roundedInteger}.00`);

  // 6. Margem bruta estimada
  const grossMargin = finalPrice - landedCost;
  const grossMarginPercent = (grossMargin / finalPrice) * 100;

  // 7. Preço "De" comparativo (preço cheio de referência)
  const suggestedCompareAtPrice = Math.round(finalPrice * 1.25);

  return {
    costBRL,
    taxBRL,
    basePrice: rawTargetPrice,
    finalPrice,
    grossMarginPercent: parseFloat(grossMarginPercent.toFixed(1)),
    suggestedCompareAtPrice,
  };
}

/**
 * Limpa títulos poluídos do AliExpress transformando em copy elegante em pt-BR
 */
export function sanitizeAliExpressTitle(rawTitle: string): string {
  // Remove termos genéricos de spam de dropshipping
  const spamKeywords = [
    /hot sale/gi,
    /free shipping/gi,
    /dropshipping/gi,
    /high quality/gi,
    /2024|2025|2026/gi,
    /new arrival/gi,
    /wholesale/gi,
    /luxury/gi,
    /top grade/gi,
  ];

  let cleaned = rawTitle;
  for (const regex of spamKeywords) {
    cleaned = cleaned.replace(regex, '');
  }

  // Remove caracteres estranhos repetidos
  cleaned = cleaned.replace(/[-|_]+/g, ' ').replace(/\s+/g, ' ').trim();

  // Se for título longo demais, sintetiza
  if (cleaned.length > 70) {
    const parts = cleaned.split(' ');
    cleaned = parts.slice(0, 8).join(' ');
  }

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
