import { Alert, Table } from 'react-bootstrap';
import { LoadingSpinner } from '../LoadingSpinner';
import { formatCurrency, formatDate } from '../../utils/formatters';
import type { Competencia } from '../../types/LoanResponse';

interface ResultGridProps {
  competencias: Competencia[];
  isLoading: boolean;
  error: string | null;
}

export function ResultGrid({ competencias, isLoading, error }: ResultGridProps) {
  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  if (competencias.length === 0) return null;

  const needsScroll = competencias.length > 20;

  const wrapperStyle: React.CSSProperties = needsScroll
    ? { maxHeight: '60vh', overflowY: 'auto', marginTop: '1rem' }
    : { marginTop: '1rem' };

  const valorOriginal = competencias[0]?.valorEmprestimo ?? 0;

  return (
    <div style={wrapperStyle}>
      <Table striped bordered size="sm" className="mb-0" style={{ fontSize: '0.78rem' }}>
        <thead>
          <tr>
            <th colSpan={3} style={{ position: 'sticky', top: 0, textAlign: 'center', borderRight: '2px solid #fff', padding: '2px 4px' }}>Empréstimo</th>
            <th colSpan={2} style={{ position: 'sticky', top: 0, textAlign: 'center', borderRight: '2px solid #fff', padding: '2px 4px' }}>Parcela</th>
            <th colSpan={2} style={{ position: 'sticky', top: 0, textAlign: 'center', borderRight: '2px solid #fff', padding: '2px 4px' }}>Principal</th>
            <th colSpan={3} style={{ position: 'sticky', top: 0, textAlign: 'center', padding: '2px 4px' }}>Juros</th>
          </tr>
          <tr>
            <th style={{ position: 'sticky', top: '22px' }}>Data Competência</th>
            <th style={{ position: 'sticky', top: '22px' }}>Valor de Empréstimo</th>
            <th style={{ position: 'sticky', top: '22px', borderRight: '2px solid #fff' }}>Saldo Devedor</th>
            <th style={{ position: 'sticky', top: '22px' }}>Consolidada</th>
            <th style={{ position: 'sticky', top: '22px', borderRight: '2px solid #fff' }}>Total</th>
            <th style={{ position: 'sticky', top: '22px' }}>Amortização</th>
            <th style={{ position: 'sticky', top: '22px', borderRight: '2px solid #fff' }}>Saldo</th>
            <th style={{ position: 'sticky', top: '22px' }}>Provisão</th>
            <th style={{ position: 'sticky', top: '22px' }}>Acumulado</th>
            <th style={{ position: 'sticky', top: '22px' }}>Pago</th>
          </tr>
        </thead>
        <tbody>
          {competencias.map((c, index) => {
            const valorExibido = index === 0 ? valorOriginal : 0;
            return (
              <tr key={index}>
                <td>{formatDate(c.dataCompetencia)}</td>
                <td>{formatCurrency(valorExibido)}</td>
                <td>{formatCurrency(c.saldoDevedor)}</td>
                <td style={{ textAlign: 'center' }}>{c.consolidada}</td>
                <td>{formatCurrency(c.total)}</td>
                <td>{formatCurrency(c.amortizacao)}</td>
                <td>{formatCurrency(c.saldo)}</td>
                <td>{formatCurrency(c.provisao)}</td>
                <td>{formatCurrency(c.acumulado)}</td>
                <td>{formatCurrency(c.pago)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
