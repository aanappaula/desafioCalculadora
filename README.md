# Calculadora de Empréstimos SAC

Aplicação web para simulação de financiamentos pelo **Sistema de Amortização Constante (SAC)**. Preencha os parâmetros do empréstimo e a aplicação gera uma tabela com todas as competências mensais do período, exibindo saldo devedor, amortização, juros, provisão, acumulado e total pago.

A solução é dividida em dois módulos que se comunicam via API REST:

- **Backend** — Java + Spring Boot, responsável pelos cálculos financeiros (`http://localhost:8080`)
- **Frontend** — React + TypeScript + React Bootstrap, interface do usuário (`http://localhost:3000`)

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|------------|---------------|
| JDK        | 11+           |
| Maven      | 3.6+          |
| Node.js    | 18+           |

---

## Como rodar

### Backend

```bash
cd backend
mvn spring-boot:run
```

Aguarde a mensagem `Started CalculadoraApplication` antes de abrir o frontend.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse em `http://localhost:3000`.

---

## API

### `POST /api/calcular`

**URL:** `http://localhost:8080/api/calcular`

---

## Estrutura do projeto

```
desafioCalculadora/
├── backend/          # Spring Boot — cálculos SAC
│   ├── src/
│   └── pom.xml
├── frontend/         # React + TypeScript — interface
│   ├── src/
│   └── package.json
└── README.md
```
