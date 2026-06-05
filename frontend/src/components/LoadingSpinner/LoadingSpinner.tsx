import { Spinner } from 'react-bootstrap';

export function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    </div>
  );
}
