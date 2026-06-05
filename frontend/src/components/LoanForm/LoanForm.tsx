import { useState } from 'react'
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import type { LoanRequest } from '../../types/LoanRequest'
import { type FormErrors, type FormState, validateForm } from '../../utils/validators'

interface LoanFormProps {
  onCalculate: (request: LoanRequest) => void
  isLoading: boolean
  onFormChange?: () => void
}

const INITIAL_STATE: FormState = {
  dataInicial: '',
  dataFinal: '',
  primeiroPagamento: '',
  valorEmprestimo: '',
  taxaJurosAnual: '',
}

function isFormValid(values: FormState, errors: FormErrors): boolean {
  const allFilled =
    values.dataInicial !== '' &&
    values.dataFinal !== '' &&
    values.primeiroPagamento !== '' &&
    values.valorEmprestimo !== '' &&
    values.taxaJurosAnual !== ''

  return allFilled && Object.keys(errors).length === 0
}

// aceita formato PT-BR (ex: "140.000,00") e decimal padrão (ex: "140000.00")
function parseCurrencyInput(raw: string): number {
  if (raw.includes(',')) {
    return parseFloat(raw.replace(/\./g, '').replace(',', '.'))
  }
  return parseFloat(raw)
}

export function LoanForm({ onCalculate, isLoading, onFormChange }: LoanFormProps) {
  const [values, setValues] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<FormErrors>({})

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    setErrors(validateForm(nextValues))
    onFormChange?.()
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const currentErrors = validateForm(values)
    setErrors(currentErrors)

    if (!isFormValid(values, currentErrors)) return

    const request: LoanRequest = {
      dataInicial: values.dataInicial,
      dataFinal: values.dataFinal,
      primeiroPagamento: values.primeiroPagamento,
      valorEmprestimo: parseCurrencyInput(values.valorEmprestimo),
      taxaJurosAnual: parseCurrencyInput(values.taxaJurosAnual),
    }
    onCalculate(request)
  }

  const canSubmit = isFormValid(values, errors)

  return (
    <Card className="mb-4">
      <Card.Body className="p-3">
        <Card.Title as="h5" className="mb-3">
          Calculadora de Empréstimos
        </Card.Title>

        <Form noValidate onSubmit={handleSubmit}>
          <Row className="g-2 align-items-start">
            <Col xs={12} sm={6} md={2}>
              <Form.Group controlId="dataInicial">
                <Form.Label className="small mb-1">Data Inicial</Form.Label>
                <Form.Control
                  type="date"
                  name="dataInicial"
                  value={values.dataInicial}
                  onChange={handleChange}
                  isInvalid={!!errors.dataInicial}
                  size="sm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dataInicial}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={2}>
              <Form.Group controlId="dataFinal">
                <Form.Label className="small mb-1">Data Final</Form.Label>
                <Form.Control
                  type="date"
                  name="dataFinal"
                  value={values.dataFinal}
                  onChange={handleChange}
                  isInvalid={!!errors.dataFinal}
                  size="sm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dataFinal}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={2}>
              <Form.Group controlId="primeiroPagamento">
                <Form.Label className="small mb-1">Primeiro Pagamento</Form.Label>
                <Form.Control
                  type="date"
                  name="primeiroPagamento"
                  value={values.primeiroPagamento}
                  onChange={handleChange}
                  isInvalid={!!errors.primeiroPagamento}
                  size="sm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.primeiroPagamento}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Form.Group controlId="valorEmprestimo">
                <Form.Label className="small mb-1">Valor do Empréstimo (R$)</Form.Label>
                <Form.Control
                  type="text"
                  inputMode="decimal"
                  name="valorEmprestimo"
                  value={values.valorEmprestimo}
                  onChange={handleChange}
                  isInvalid={!!errors.valorEmprestimo}
                  placeholder="Ex: 140.000,00"
                  size="sm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.valorEmprestimo}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={1}>
              <Form.Group controlId="taxaJurosAnual">
                <Form.Label className="small mb-1">Taxa de Juros</Form.Label>
                <Form.Control
                  type="text"
                  inputMode="decimal"
                  name="taxaJurosAnual"
                  value={values.taxaJurosAnual}
                  onChange={handleChange}
                  isInvalid={!!errors.taxaJurosAnual}
                  placeholder="Ex: 7"
                  size="sm"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.taxaJurosAnual}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={2}>
              <Form.Label className="small mb-1 d-block">&nbsp;</Form.Label>
              <Button
                type="submit"
                variant="primary"
                disabled={!canSubmit || isLoading}
                className="w-100"
                size="sm"
                style={{ color: '#fff' }}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-1"
                    />
                    Calculando…
                  </>
                ) : (
                  'Calcular'
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}
