export interface FormState {
  dataInicial: string;
  dataFinal: string;
  primeiroPagamento: string;
  valorEmprestimo: string;
  taxaJurosAnual: string;
}

export interface FormErrors {
  dataInicial?: string;
  dataFinal?: string;
  primeiroPagamento?: string;
  valorEmprestimo?: string;
  taxaJurosAnual?: string;
}

/**
 * @param values estado atual do formulário
 * @returns objeto com os erros encontrados; vazio significa formulário válido
 */
export function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!values.dataInicial) errors.dataInicial = 'Campo obrigatório'
  if (!values.dataFinal) errors.dataFinal = 'Campo obrigatório'
  if (!values.primeiroPagamento) errors.primeiroPagamento = 'Campo obrigatório'
  if (!values.valorEmprestimo) errors.valorEmprestimo = 'Campo obrigatório'
  if (!values.taxaJurosAnual) errors.taxaJurosAnual = 'Campo obrigatório'

  const isYearValid = (dateStr: string) => {
    if (!dateStr) return true
    const year = new Date(dateStr).getFullYear()
    return year >= 1900 && year <= 2100
  }

  if (values.dataInicial && !errors.dataInicial && !isYearValid(values.dataInicial))
    errors.dataInicial = 'Data inválida'
  if (values.dataFinal && !errors.dataFinal && !isYearValid(values.dataFinal))
    errors.dataFinal = 'Data inválida'
  if (values.primeiroPagamento && !errors.primeiroPagamento && !isYearValid(values.primeiroPagamento))
    errors.primeiroPagamento = 'Data inválida'

  if (values.dataInicial && values.dataFinal && !errors.dataInicial && !errors.dataFinal) {
    if (values.dataFinal <= values.dataInicial) {
      errors.dataFinal = 'A Data Final deve ser posterior à Data Inicial'
    }
  }

  if (values.dataInicial && values.primeiroPagamento && !errors.dataInicial && !errors.primeiroPagamento) {
    if (values.primeiroPagamento <= values.dataInicial) {
      errors.primeiroPagamento = 'O Primeiro Pagamento deve ser posterior à Data Inicial'
    } else if (values.dataFinal && !errors.dataFinal && values.primeiroPagamento >= values.dataFinal) {
      errors.primeiroPagamento = 'O Primeiro Pagamento deve ser anterior à Data Final'
    }
  }

  // suporta formato PT-BR (ex: "140.000,00") e decimal padrão (ex: "140000.00")
  const parseNumeric = (raw: string) => {
    const normalized = raw.includes(',')
      ? raw.replace(/\./g, '').replace(',', '.')
      : raw
    return parseFloat(normalized)
  }

  if (values.valorEmprestimo) {
    const valor = parseNumeric(values.valorEmprestimo)
    if (isNaN(valor) || valor <= 0)
      errors.valorEmprestimo = 'O Valor do Empréstimo deve ser maior que zero'
  }

  if (values.taxaJurosAnual) {
    const taxa = parseNumeric(values.taxaJurosAnual)
    if (isNaN(taxa) || taxa <= 0)
      errors.taxaJurosAnual = 'A Taxa de Juros deve ser maior que zero'
  }

  return errors
}
