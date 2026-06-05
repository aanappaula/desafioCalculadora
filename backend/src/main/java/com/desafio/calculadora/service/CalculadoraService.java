package com.desafio.calculadora.service;

import com.desafio.calculadora.dto.Competencia;
import com.desafio.calculadora.dto.LoanRequest;
import com.desafio.calculadora.dto.LoanResponse;
import com.desafio.calculadora.exception.ValidationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CalculadoraService {

    public LoanResponse calcular(LoanRequest request) {
        LocalDate dataInicial       = request.getDataInicial();
        LocalDate dataFinal         = request.getDataFinal();
        LocalDate primeiroPagamento = request.getPrimeiroPagamento();

        if (!dataFinal.isAfter(dataInicial)) {
            throw new ValidationException("A Data Final deve ser posterior à Data Inicial.");
        }

        if (!primeiroPagamento.isAfter(dataInicial)) {
            throw new ValidationException("O Primeiro Pagamento deve ser posterior à Data Inicial.");
        }

        if (!primeiroPagamento.isBefore(dataFinal)) {
            throw new ValidationException("O Primeiro Pagamento deve ser anterior à Data Final.");
        }

        List<LocalDate> datas = DateSequenceBuilder.build(dataInicial, dataFinal, primeiroPagamento);

        List<Competencia> competencias = SacCalculator.compute(
                datas,
                request.getValorEmprestimo(),
                request.getTaxaJurosAnual(),
                primeiroPagamento,
                dataFinal
        );

        return new LoanResponse(competencias);
    }
}
