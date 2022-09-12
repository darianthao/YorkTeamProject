import {Badge, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {BsCart3, BsFillPersonFill} from "react-icons/bs";
import logo1 from './images/logo1.png'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {LinkContainer} from 'react-router-bootstrap'
import {RiLogoutBoxRLine} from "react-icons/ri";
import {initiateLogout} from "../modules/user";
import {initiateGetCategories} from "../modules/category";
import {initiateGetByCategoryID, initiateGetOneProduct, initiateGetProducts} from "../modules/product";
import {Link, useLocation} from "react-router-dom";
import MessageToast from "./MessageToast";
import {useEffect} from "react";

function NavBar({
                    isLoggedIn,
                    currentUser,
                    initiateGetByCategoryID,
                    initiateLogout,
                    categories,
                    initiateGetCategories,
                    initiateGetOneProduct,
                    initiateGetProducts,
                    cartQty
                }) {
    useEffect(initiateGetProducts, [])
    useEffect(initiateGetCategories, [])
    let location = useLocation();

    return <Navbar className="navBar" sticky="top" bg="black" variant="dark" expand="md">
        <MessageToast/>
        <Container fluid>
            <Nav>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <img className='img-fluid navImg' src={logo1} alt="shady shack logo"/>
                    </Navbar.Brand>
                </LinkContainer>
            </Nav>
            <Navbar.Toggle/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-link" to="/shop/products">Products</Link>
                    {categories.length === 0 ? <></> :
                        <NavDropdown id="product-dropdown-categories" title="Categories" menuVariant="dark">
                            {categories.map((category, index, {length}) => <div key={index}>
                                <LinkContainer to="/shop/category" onClick={() => initiateGetByCategoryID(category.id)}>
                                    <Nav.Link>{category.categoryName}</Nav.Link>
                                </LinkContainer>
                                {length - 1 === index ? <></> : <NavDropdown.Divider/>}
                            </div>)}
                        </NavDropdown>
                    }
                    <Link className="nav-link" to="/shop/shady-deals" onClick={() => {
                        initiateGetProducts()
                        initiateGetOneProduct(104)}}>
                        Shady Deals
                    </Link>
                </Nav>
                <Nav>
                    {isLoggedIn ? <>
                            <Navbar.Text id="navWelcome" className="mx-2">
                                Welcome, {currentUser.firstName}
                            </Navbar.Text>
                            <NavDropdown
                                id="account-overview"
                                className="px-1"
                                title={<BsFillPersonFill id="personIcon" size="20px"/>}
                                menuVariant="dark"
                                align="end">
                                {currentUser.accountType > 0 ?
                                    <>
                                        <LinkContainer to="/management">
                                            <Nav.Link>Shop Management</Nav.Link>
                                        </LinkContainer>
                                        <NavDropdown.Divider/>
                                    </>
                                    : <></>}
                                <LinkContainer to="/user/profile">
                                    <Nav.Link eventKey="userProfile">Account Overview</Nav.Link>
                                </LinkContainer>
                                <NavDropdown.Divider/>
                                <LinkContainer to="/user/orders">
                                    <Nav.Link eventKey="orderHistory">Order History</Nav.Link>
                                </LinkContainer>
                                <NavDropdown.Divider/>
                                <LinkContainer to="/" onClick={() => initiateLogout()}>
                                    <Nav.Link eventKey="logout">Log Out <RiLogoutBoxRLine size="20px"/></Nav.Link>
                                </LinkContainer>
                            </NavDropdown>
                        </>
                        :
                        <>
                            <Link className="nav-link" to="/user/login" state={{from: location}}>Login/Register</Link>
                        </>
                    }
                    <LinkContainer to='/shop/cart'>
                        <Nav.Link className="ps-3 pe-0">
                            <BsCart3 id="cartIcon" size="20px"/>
                            {cartQty > 0 ? <Badge id="cartCount" pill bg="primary">{cartQty}</Badge>
                                : <Badge id="cartCountEmpty" pill bg="black">0</Badge>}
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.userReducer.isLoggedIn,
        currentUser: state.userReducer.currentUser,
        categories: state.categoryReducer.categories,
        cartQty: state.cartReducer.cartQty
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        initiateGetByCategoryID,
        initiateLogout,
        initiateGetCategories,
        initiateGetOneProduct,
        initiateGetProducts
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)