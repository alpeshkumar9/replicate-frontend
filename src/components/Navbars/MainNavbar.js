import { Link, useNavigate } from "react-router-dom";

// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Navbar,
    Nav,
    Container,
    Media,
    Button,
} from "reactstrap";

const MainNavbar = (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user_firstname');
        localStorage.removeItem('user_lastname');

        // Redirect the user to the login page
        navigate('/login');
    };

    // Check if the token is present in localStorage
    const token = localStorage.getItem('token');
    const userFirstName = localStorage.getItem('user_firstname');
    const userLastName = localStorage.getItem('user_lastname');

    return (
        <>
            <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                <Container fluid>
                    <Link
                        className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                        to="/"
                    >
                        {props.brandText}
                    </Link>
                    <Nav className="align-items-center d-none d-md-flex" navbar>
                        {token ? (
                            // If token exists, show user details and logout option
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0" nav>
                                    <Media className="align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                            <img
                                                alt="..."
                                                src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                            />
                                        </span>
                                        <Media className="ml-2 d-none d-lg-block">
                                            <span className="mb-0 text-sm font-weight-bold">
                                                {userFirstName} {userLastName}
                                            </span>
                                        </Media>
                                    </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" end>
                                    <DropdownItem onClick={handleLogout}>
                                        <i className="ni ni-user-run" />
                                        <span>Logout</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        ) : (
                            // If no token, show login button
                            <Button
                                color="dark"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default MainNavbar;
