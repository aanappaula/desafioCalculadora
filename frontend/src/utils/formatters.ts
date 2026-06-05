/**
 * @param value número a formatar
 * @returns string no formato PT-BR com 2 casas decimais (ex: "1.166,67")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * @param isoDate data no formato "YYYY-MM-DD"
 * @returns data no formato brasileiro "DD/MM/AAAA"
 */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}
