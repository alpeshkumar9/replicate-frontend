
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

import Header from "../components/Headers/Header";

const Home = (props) => {
    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };
    return (
        <>
            <Header />
            {/* Page content */}
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
                                    <tr>
                                        <th scope="row">/argon/</th>
                                        <td>4,569</td>
                                        <td>340</td>
                                        <td>
                                            <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

export default Home;