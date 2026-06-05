package com.desafio.calculadora.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Competencia {

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataCompetencia;

    private BigDecimal valorEmprestimo;
    private BigDecimal saldoDevedor;
    private BigDecimal total;
    private BigDecimal amortizacao;
    private BigDecimal saldo;
    private BigDecimal provisao;
    private BigDecimal acumulado;
    private BigDecimal pago;
    private String consolidada;

    public Competencia(LocalDate dataCompetencia,
                       BigDecimal valorEmprestimo,
                       BigDecimal saldoDevedor,
                       BigDecimal total,
                       BigDecimal amortizacao,
                       BigDecimal saldo,
                       BigDecimal provisao,
                       BigDecimal acumulado,
                       BigDecimal pago,
                       String consolidada) {
        this.dataCompetencia = dataCompetencia;
        this.valorEmprestimo = valorEmprestimo;
        this.saldoDevedor = saldoDevedor;
        this.total = total;
        this.amortizacao = amortizacao;
        this.saldo = saldo;
        this.provisao = provisao;
        this.acumulado = acumulado;
        this.pago = pago;
        this.consolidada = consolidada;
    }

    public LocalDate getDataCompetencia() {
        return dataCompetencia;
    }

    public void setDataCompetencia(LocalDate dataCompetencia) {
        this.dataCompetencia = dataCompetencia;
    }

    public BigDecimal getValorEmprestimo() {
        return valorEmprestimo;
    }

    public void setValorEmprestimo(BigDecimal valorEmprestimo) {
        this.valorEmprestimo = valorEmprestimo;
    }

    public BigDecimal getSaldoDevedor() {
        return saldoDevedor;
    }

    public void setSaldoDevedor(BigDecimal saldoDevedor) {
        this.saldoDevedor = saldoDevedor;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public BigDecimal getAmortizacao() {
        return amortizacao;
    }

    public void setAmortizacao(BigDecimal amortizacao) {
        this.amortizacao = amortizacao;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public BigDecimal getProvisao() {
        return provisao;
    }

    public void setProvisao(BigDecimal provisao) {
        this.provisao = provisao;
    }

    public BigDecimal getAcumulado() {
        return acumulado;
    }

    public void setAcumulado(BigDecimal acumulado) {
        this.acumulado = acumulado;
    }

    public BigDecimal getPago() {
        return pago;
    }

    public void setPago(BigDecimal pago) {
        this.pago = pago;
    }

    public String getConsolidada() {
        return consolidada;
    }

    public void setConsolidada(String consolidada) {
        this.consolidada = consolidada;
    }
}
