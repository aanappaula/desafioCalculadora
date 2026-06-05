package com.desafio.calculadora.service;

import com.desafio.calculadora.dto.Competencia;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SacCalculator {

    private SacCalculator() {}

    /**
     * @param datas             lista ordenada de datas de competência (produzida por {@link DateSequenceBuilder})
     * @param valorEmprestimo   valor principal do empréstimo
     * @param taxaJurosAnual    taxa de juros anual em percentual (ex: 12.0 para 12%)
     * @param primeiroPagamento data do primeiro pagamento mensal
     * @param dataFinal         data do último pagamento
     * @return lista de {@link Competencia}, uma por data
     */
    public static List<Competencia> compute(
            List<LocalDate> datas,
            BigDecimal valorEmprestimo,
            BigDecimal taxaJurosAnual,
            LocalDate primeiroPagamento,
            LocalDate dataFinal) {

        int qtdParcelas = (int) ChronoUnit.MONTHS.between(
                YearMonth.from(primeiroPagamento),
                YearMonth.from(dataFinal)) + 1;

        BigDecimal amortizacao = valorEmprestimo.divide(
                BigDecimal.valueOf(qtdParcelas), 2, RoundingMode.HALF_UP);

        BigDecimal amortizacaoUltima = valorEmprestimo.subtract(
                amortizacao.multiply(BigDecimal.valueOf(qtdParcelas - 1)));

        Set<LocalDate> paymentDates = buildPaymentDates(primeiroPagamento, dataFinal);

        BigDecimal saldoAtual = valorEmprestimo;
        BigDecimal acumulado  = BigDecimal.ZERO;
        int        nParcela   = 0;

        List<Competencia> result = new ArrayList<>(datas.size());

        for (int i = 0; i < datas.size(); i++) {
            LocalDate data = datas.get(i);
            long diasPeriodo = (i == 0) ? 0L : ChronoUnit.DAYS.between(datas.get(i - 1), data);

            BigDecimal baseCalculo = saldoAtual.add(acumulado);
            BigDecimal provisao = calcularProvisao(baseCalculo, taxaJurosAnual, diasPeriodo);

            Competencia comp;

            if (i == 0) {
                comp = new Competencia(
                        data,
                        valorEmprestimo,
                        valorEmprestimo,
                        BigDecimal.ZERO,
                        BigDecimal.ZERO,
                        valorEmprestimo,
                        BigDecimal.ZERO,
                        BigDecimal.ZERO,
                        BigDecimal.ZERO,
                        ""
                );

            } else if (paymentDates.contains(data)) {
                acumulado = acumulado.add(provisao);
                BigDecimal pagoAgora = acumulado;

                nParcela++;
                BigDecimal amortAtual = (nParcela == qtdParcelas) ? amortizacaoUltima : amortizacao;

                BigDecimal saldoNovo = saldoAtual.subtract(amortAtual);
                if (nParcela == qtdParcelas) saldoNovo = BigDecimal.ZERO;

                comp = new Competencia(
                        data,
                        valorEmprestimo,
                        saldoNovo,
                        amortAtual.add(pagoAgora),
                        amortAtual,
                        saldoNovo,
                        provisao,
                        BigDecimal.ZERO,
                        pagoAgora,
                        nParcela + "/" + qtdParcelas
                );

                saldoAtual = saldoNovo;
                acumulado  = BigDecimal.ZERO;

            } else {
                acumulado = acumulado.add(provisao);
                BigDecimal saldoDevedor = saldoAtual.add(acumulado);

                comp = new Competencia(
                        data,
                        valorEmprestimo,
                        saldoDevedor,
                        BigDecimal.ZERO,
                        BigDecimal.ZERO,
                        saldoAtual,
                        provisao,
                        acumulado,
                        BigDecimal.ZERO,
                        ""
                );
            }

            result.add(comp);
        }

        return result;
    }

    /**
     * @param saldo       base de cálculo (saldo + acumulado)
     * @param taxaAnual   taxa anual em percentual
     * @param diasPeriodo número de dias do período
     * @return provisão de juros arredondada a 2 casas decimais
     */
    private static BigDecimal calcularProvisao(BigDecimal saldo,
                                               BigDecimal taxaAnual,
                                               long diasPeriodo) {
        if (diasPeriodo == 0) return BigDecimal.ZERO;

        double taxa = taxaAnual.doubleValue() / 100.0;
        double expoente = (double) diasPeriodo / 360.0;
        double fator = Math.pow(1.0 + taxa, expoente) - 1.0;

        return saldo
                .multiply(BigDecimal.valueOf(fator))
                .setScale(10, RoundingMode.HALF_UP)
                .setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * @param primeiroPagamento data do primeiro pagamento mensal
     * @param dataFinal         data do último pagamento
     * @return conjunto com todas as datas de pagamento do contrato
     */
    private static Set<LocalDate> buildPaymentDates(LocalDate primeiroPagamento,
                                                     LocalDate dataFinal) {
        Set<LocalDate> dates = new HashSet<>();
        int paymentDay = primeiroPagamento.getDayOfMonth();
        int offset = 0;
        YearMonth dataFinalYm = YearMonth.from(dataFinal);

        while (true) {
            YearMonth ym = YearMonth.from(primeiroPagamento).plusMonths(offset);
            if (ym.isAfter(dataFinalYm)) break;

            if (ym.equals(dataFinalYm)) {
                dates.add(dataFinal);
                break;
            }

            dates.add(ym.atDay(Math.min(paymentDay, ym.lengthOfMonth())));
            offset++;
        }

        return dates;
    }
}
