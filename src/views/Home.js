import React, { useState, useEffect } from 'react';
import classnames from "classnames";
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardBody,
    Table,
    Container,
    Row,
    Col,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    FormGroup,
    Form,
    Input,
    InputGroupText,
    InputGroup,
    Modal,
} from "reactstrap";

import { Auth } from './Auth';
import Header from "../components/Headers/Header";
import { allBooks, allReaders, loanBookToReader } from '../network/ApiAxios';

const Home = (props) => {
    const [books, setBooks] = useState([]);
    const [readers, setReaders] = useState([]);
    const [tabs, setTabs] = useState(1);
    const [selectedReader, setSelectedReader] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalState, setModalState] = useState({
        formModal: false,
    });
    const toggleModal = (modalName, bookId = null) => {
        if (bookId) setSelectedBook(bookId);
        setModalState((prevState) => ({
            ...prevState,
            [modalName]: !prevState[modalName],
        }));
    };

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setTabs(index);
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await allBooks();
            setBooks(data);
        };

        const fetchReaders = async () => {
            const data = await allReaders();
            setReaders(data);
        };

        fetchBooks();
        fetchReaders();
    }, []);

    const handleReaderSelection = (e) => {
        console.log(selectedReader);
        setSelectedReader(e.target.value);
        console.log(selectedReader);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedReader || !selectedBook) {
            alert('Please select a reader and a book');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await loanBookToReader(token, selectedBook, selectedReader);
            alert(response.message || "The book has been successfully loaned.");
            toggleModal("loanFormModal");
            setSelectedReader(null);
            setSelectedBook(null);
        } catch (error) {
            console.error("Failed to loan book:", error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred while trying to loan the book.");
            }
        }
        window.location.reload();
    };

    return (
        <>
            <Header />
            <div>
                {!books.length ? <p>Loading books...</p> : null}
            </div>
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <div className="nav-wrapper">
                            <Nav
                                className="nav-fill flex-column flex-md-row"
                                id="tabs-icons-text"
                                pills
                                role="tablist"
                            >
                                <NavItem>
                                    <NavLink
                                        aria-selected={tabs === 1}
                                        className={classnames('mb-sm-3 mb-md-0', {
                                            active: tabs === 1,
                                        })}
                                        onClick={(e) => toggleNavs(e, 1)}
                                        href="#library"
                                        role="tab"
                                    >
                                        <i className="ni ni-books mr-2" />
                                        Library
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        aria-selected={tabs === 2}
                                        className={classnames('mb-sm-3 mb-md-0', {
                                            active: tabs === 2,
                                        })}
                                        onClick={(e) => toggleNavs(e, 2)}
                                        href="#readers"
                                        role="tab"
                                    >
                                        <i className="ni ni-circle-08 mr-2" />
                                        Readers
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                        <Card className="shadow">
                            <CardBody>
                                <TabContent activeTab={'tabs' + tabs}>
                                    <TabPane tabId="tabs1">

                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h3 className="">Library</h3>
                                            </div>
                                        </Row>
                                        <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Book name</th>
                                                    <th scope="col">Auther</th>
                                                    <th scope="col">Tags</th>
                                                    <th scope="col">Available</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {books.map((book) => (
                                                    <tr key={book.id}>
                                                        <td>{book.title}</td>
                                                        <td>{book.author}</td>
                                                        <td>{book.tag_names.join(', ')}</td>
                                                        <td>{book.available ? <span className="badge-dot mr-4 badge badge-"><i className="bg-success"></i>Yes</span> : <span className="badge-dot mr-4 badge badge-"><i className="bg-danger"></i>No</span>}</td>
                                                        <td>{book.available ? <Button block color="default" type="button" onClick={() => toggleModal("loanFormModal", book.id)} >Book</Button> : < Badge color="info" className='text-white'>Booked</Badge>}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                    <TabPane tabId="tabs2">
                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h3 className="">Readers</h3>
                                            </div>
                                        </Row>
                                        <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Reader name</th>
                                                    <th scope="col">Library Card Number</th>
                                                    <th scope="col">Address</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Membership Start Date</th>
                                                    <th scope="col">Books Loaned</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {readers.map((reader) => (
                                                    <tr key={reader.id}>
                                                        <td>{reader.user_full_name}</td>
                                                        <td>{reader.library_card_number}</td>
                                                        <td>{reader.address}</td>
                                                        <td>{reader.phone_number}</td>
                                                        <td>{reader.membership_start_date}</td>
                                                        <td>
                                                            {reader.books_on_loan.map((book, index) => (
                                                                <div key={index}>{book}</div>
                                                            ))}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>

                        <Modal
                            className="modal-dialog-centered"
                            size="sm"
                            isOpen={modalState.loanFormModal}
                            toggle={() => toggleModal("loanFormModal")}
                        >
                            <div className="modal-body p-0">
                                <Card className="bg-secondary shadow border-0">
                                    <CardHeader className="bg-transparent">
                                        <div className="text-muted text-center mt-2 mb-3">
                                            Select the borrower
                                        </div>

                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <Form role="form" onSubmit={handleSubmit}>
                                            {readers.map((reader) => (
                                                <div className="custom-control custom-control-alternative custom-radio mb-3" key={reader.id}>
                                                    <input
                                                        className="custom-control-input"
                                                        id={`reader${reader.id}`}
                                                        name={`reader`}
                                                        type="radio" value={reader.user_id}
                                                        onChange={e => setSelectedReader(e.target.value)}
                                                    />
                                                    <label className="custom-control-label" htmlFor={`reader${reader.id}`}>
                                                        {reader.user_full_name}
                                                    </label>
                                                </div>
                                            ))}
                                            <div className="text-center">
                                                <Button
                                                    className="my-4"
                                                    color="primary"
                                                    type="submit"
                                                >
                                                    Submit
                                                </Button>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Auth(Home);