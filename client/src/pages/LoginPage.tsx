import React from 'react';
import LoginForm from '../componets/LoginForm';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function LoginPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100" style={{ maxWidth: 500 }}>
        <Col>
          <Card className="shadow-lg p-4 text-center">
            <h1 className="mb-3 text-primary fw-bold">Welcome to the App</h1>
            <h4 className="mb-4 text-secondary">Login / Registration</h4>
            <LoginForm />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}