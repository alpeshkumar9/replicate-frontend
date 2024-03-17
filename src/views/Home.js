import React, { useState, useEffect } from 'react';

import {
    Button,
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

import { Auth } from './Auth';
import Header from "../components/Headers/Header";
import { allBooks } from '../network/ApiAxios';

const Home = (props) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await allBooks();
            setBooks(data);
        };

        fetchBooks();
    }, []);

    return (
        <>
            <Header />
            {/* Page content */}
            <div>
                {/* Optionally, render some UI while data is being fetched */}
                {!books.length ? <p>Loading books...</p> : null}
            </div>
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Library</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            See all
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Book name</th>
                                        <th scope="col">Auther</th>
                                        <th scope="col">Publish Year</th>
                                        <th scope="col">Available</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book) => (
                                        <tr key={book.id}>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.tag_names.join(', ')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

export default Auth(Home);