import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Row,
    Col
} from "reactstrap";
import Header from "../components/Headers/Header";
import { login } from "../network/ApiAxios";

const Login = props => {

    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const tryLogin = async () => {
        const data = await login(username, password);
        if (data.success) {
            setError("");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_firstname", data.user.first_name);
            localStorage.setItem("user_lastname", data.user.last_name);
            navigate('/');
        } else {
            setPassword("");
            setError(data.msg);
        }
    }

    return (
        <>
            <Header />
            <div className="mt--8 pb-5 container">
                <div className="justify-content-center row">
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
                                                onChange={e => setEmail(e.target.value)} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <Input placeholder="Password" type="password" autoComplete="password" value={password}
                                                onChange={e => setPassword(e.target.value)} />
                                        </InputGroup>
                                    </FormGroup>
                                    {error ?
                                        <div className="text-muted font-italic">
                                            <small>
                                                error:{" "}
                                                <span className="text-red font-weight-700">{error}</span>
                                            </small>
                                        </div> : null}
                                    <div className="text-center">
                                        <Button className="my-4" color="primary" type="button" onClick={tryLogin}>
                                            Sign in
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>

                    </Col>
                </div>
            </div >
        </>
    );
}

export default Login;