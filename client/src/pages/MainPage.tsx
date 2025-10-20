import React, { useContext } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import TableFramework from '../componets/TableFramework';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const MainPage = () => {
  const { store } = useContext(Context);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold text-primary">User Dashboard</h2>
                <h5 className="text-muted">
                  Logged in as: <span className="text-dark">{store.user.email}</span>
                </h5>
              </div>
              <Button variant="outline-danger" onClick={() => store.logout()}>
                Logout
              </Button>
            </div>

            <TableFramework />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default observer(MainPage);