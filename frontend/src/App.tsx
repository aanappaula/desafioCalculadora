import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { LoanForm } from './components/LoanForm'
import { ResultGrid } from './components/ResultGrid'
import { calcular } from './services/calculatorApi'
import type { LoanRequest } from './types/LoanRequest'
import type { Competencia } from './types/LoanResponse'

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [competencias, setCompetencias] = useState<Competencia[]>([])
  const [error, setError] = useState<string | null>(null)

  function handleCalculate(request: LoanRequest): void {
    setIsLoading(true)
    setError(null)

    calcular(request)
      .then((response) => {
        setCompetencias(response.competencias)
        setError(null)
      })
      .catch((e: Error) => {
        setError(e.message)
        setCompetencias([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleFormChange(): void {
    setCompetencias([])
    setError(null)
  }

  return (
    <Container className="py-4">
      <LoanForm
        onCalculate={handleCalculate}
        onFormChange={handleFormChange}
        isLoading={isLoading}
      />
      <ResultGrid
        competencias={competencias}
        isLoading={isLoading}
        error={error}
      />
    </Container>
  )
}
