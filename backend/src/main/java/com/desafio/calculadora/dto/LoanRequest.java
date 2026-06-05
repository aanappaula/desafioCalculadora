package com.desafio.calculadora.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public class LoanRequest {

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataInicial;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataFinal;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate primeiroPagamento;

    @NotNull
    @Positive
    private BigDecimal valorEmprestimo;

    @NotNull
    @Positive
    private BigDecimal taxaJurosAnual;

    public LocalDate getDataInicial() {
        return dataInicial;
    }

    public void setDataInicial(LocalDate dataInicial) {
        this.dataInicial = dataInicial;
    }

    public LocalDate getDataFinal() {
        return dataFinal;
    }

    public void setDataFinal(LocalDate dataFinal) {
        this.dataFinal = dataFinal;
    }

    public LocalDate getPrimeiroPagamento() {
        return primeiroPagamento;
    }

    public void setPrimeiroPagamento(LocalDate primeiroPagamento) {
        this.primeiroPagamento = primeiroPagamento;
    }

    public BigDecimal getValorEmprestimo() {
        return valorEmprestimo;
    }

    public void setValorEmprestimo(BigDecimal valorEmprestimo) {
        this.valorEmprestimo = valorEmprestimo;
    }

    public BigDecimal getTaxaJurosAnual() {
        return taxaJurosAnual;
    }

    public void setTaxaJurosAnual(BigDecimal taxaJurosAnual) {
        this.taxaJurosAnual = taxaJurosAnual;
    }
}
