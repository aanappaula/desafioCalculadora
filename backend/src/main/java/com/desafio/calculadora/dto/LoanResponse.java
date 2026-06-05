package com.desafio.calculadora.dto;

import java.util.List;

public class LoanResponse {

    private List<Competencia> competencias;

    public LoanResponse(List<Competencia> competencias) {
        this.competencias = competencias;
    }

    public List<Competencia> getCompetencias() {
        return competencias;
    }
}
