import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroup, Row, Col } from "reactstrap";
import Header from "../components/Headers/Header";
import { login } from "../network/ApiAxios";

const Login = () => {
    const [username, setUsername] = useState(""); // Corrected from setEmail to setUsername
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const tryLogin = async () => {
        // Check if username or password is empty and set an error message if so
        if (!username.trim() || !password.trim()) {
            setError("Username and password are required.");
            return;
        }

        const data = await login(username, password);
        if (data.success) {
            setError("");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_firstname", data.user.first_name);
            localStorage.setItem("user_lastname", data.user.last_name);
            navigate('/');
        } else {
            setPassword("");
            setError(data.non_field_errors);
            return;
        }
    };

    return (
        <>
            <Header />
            <div className="mt--8 pb-5 container">
                <Row className="justify-content-center">
                    <Col lg="5" md="7">
                        <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-transparent">
                                <div className="text-muted text-center mt-2">
                                    <small>Sign in with credentials</small>
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <Form role="form">
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <Input placeholder="Username" type="username" autoComplete="username" value={username}
                                                onChange={e => setUsername(e.target.value)} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <Input placeholder="Password" type="password" autoComplete="current-password" value={password}
                                                onChange={e => setPassword(e.target.value)} required />
                                        </InputGroup>
                                    </FormGroup>
                                    {error && (
                                        <div className="text-muted font-italic">
                                            <small>
                                                <span className="text-red font-weight-700">{error}</span>
                                            </small>
                                        </div>
                                    )}
                                    <div className="text-center">
                                        <Button className="my-4" color="primary" type="button" onClick={tryLogin}>
                                            Sign in
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Login;
