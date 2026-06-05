package com.desafio.calculadora.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

public class DateSequenceBuilder {

    private DateSequenceBuilder() {}

    /**
     * @param dataInicial       data de início do contrato
     * @param dataFinal         data do último pagamento
     * @param primeiroPagamento data do primeiro pagamento mensal
     * @return lista ordenada e sem duplicatas de datas de competência
     */
    public static List<LocalDate> build(LocalDate dataInicial,
                                        LocalDate dataFinal,
                                        LocalDate primeiroPagamento) {

        TreeSet<LocalDate> dates = new TreeSet<>();

        dates.add(dataInicial);

        // datas de fim de mês entre dataInicial e primeiroPagamento
        LocalDate eom = YearMonth.from(dataInicial).atEndOfMonth();
        while (eom.isBefore(primeiroPagamento)) {
            if (eom.isAfter(dataInicial)) {
                dates.add(eom);
            }
            eom = YearMonth.from(eom).plusMonths(1).atEndOfMonth();
        }

        int paymentDay = primeiroPagamento.getDayOfMonth();
        int monthOffset = 0;
        YearMonth dataFinalYm = YearMonth.from(dataFinal);

        while (true) {
            YearMonth ym = YearMonth.from(primeiroPagamento).plusMonths(monthOffset);
            LocalDate paymentDate = ym.atDay(Math.min(paymentDay, ym.lengthOfMonth()));

            if (ym.isAfter(dataFinalYm)) break;

            if (ym.equals(dataFinalYm)) {
                dates.add(dataFinal);
                break;
            }

            dates.add(paymentDate);

            YearMonth nextYm = ym.plusMonths(1);
            LocalDate nextPaymentDate = nextYm.atDay(Math.min(paymentDay, nextYm.lengthOfMonth()));

            LocalDate endOfPaymentMonth = ym.atEndOfMonth();
            if (!paymentDate.isEqual(endOfPaymentMonth)
                    && endOfPaymentMonth.isBefore(nextPaymentDate)
                    && endOfPaymentMonth.isBefore(dataFinal)) {
                dates.add(endOfPaymentMonth);
            }

            monthOffset++;
        }

        dates.add(dataFinal);

        return new ArrayList<>(dates);
    }
}
