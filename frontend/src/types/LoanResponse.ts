export interface Competencia {
  dataCompetencia: string;
  valorEmprestimo: number;
  saldoDevedor: number;
  consolidada: string;
  total: number;
  amortizacao: number;
  saldo: number;
  provisao: number;
  acumulado: number;
  pago: number;
}

export interface LoanResponse {
  competencias: Competencia[];
}

export interface ErrorResponse {
  erro: string;
}
