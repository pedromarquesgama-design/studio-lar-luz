/**
 * Formata um valor numérico para a moeda brasileira (BRL: R$ 0,00)
 */
export function formatBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calcula o parcelamento sem juros em até N vezes (padrão brasileiro: 6x)
 */
export function calculateInstallments(amount: number, maxInstallments: number = 6): {
  count: number;
  value: number;
  formatted: string;
} {
  const count = maxInstallments;
  const value = amount / count;
  return {
    count,
    value,
    formatted: `${count}x de ${formatBRL(value)} sem juros`,
  };
}

/**
 * Calcula o valor com desconto de Pix (padrão 5%)
 */
export function calculatePixPrice(amount: number, discountPercent: number = 5): {
  discountedPrice: number;
  savings: number;
  formattedPrice: string;
  formattedSavings: string;
} {
  const discountFactor = (100 - discountPercent) / 100;
  const discountedPrice = amount * discountFactor;
  const savings = amount - discountedPrice;

  return {
    discountedPrice,
    savings,
    formattedPrice: formatBRL(discountedPrice),
    formattedSavings: formatBRL(savings),
  };
}

/**
 * Aplica máscara de CEP brasileiro (00000-000)
 */
export function maskCEP(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, '$1-$2');
}

/**
 * Aplica máscara de CPF (000.000.000-00)
 */
export function maskCPF(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/**
 * Formata data no padrão brasileiro dd/mm/aaaa
 */
export function formatDateBR(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}
