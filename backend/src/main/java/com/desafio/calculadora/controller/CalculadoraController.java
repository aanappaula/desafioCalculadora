package com.desafio.calculadora.controller;

import com.desafio.calculadora.dto.LoanRequest;
import com.desafio.calculadora.dto.LoanResponse;
import com.desafio.calculadora.service.CalculadoraService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CalculadoraController {

    @Autowired
    private CalculadoraService calculadoraService;

    @PostMapping("/calcular")
    public ResponseEntity<LoanResponse> calcular(@Valid @RequestBody LoanRequest request) {
        LoanResponse response = calculadoraService.calcular(request);
        return ResponseEntity.ok(response);
    }
}
