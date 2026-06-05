import type { LoanRequest } from '../types/LoanRequest';
import type { LoanResponse } from '../types/LoanResponse';

export async function calcular(request: LoanRequest): Promise<LoanResponse> {
  const response = await fetch('http://localhost:8080/api/calcular', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.erro ?? 'Erro desconhecido');
  }
  return response.json();
}
