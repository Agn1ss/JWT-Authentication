import React, { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const LoginForm: FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { store } = useContext(Context);

    const handleLogin = () => store.login(name, email, password);
    const handleRegistration = () => store.registration(name, email, password);

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Row className="w-100" style={{ maxWidth: 400 }}>
                <Col>
                    <Card className="shadow-sm p-4">
                        <h3 className="text-center mb-4">User Authentication</h3>

                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-between">
                                <Button variant="primary" onClick={handleLogin}>
                                    Login
                                </Button>
                                <Button variant="success" onClick={handleRegistration}>
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default observer(LoginForm);