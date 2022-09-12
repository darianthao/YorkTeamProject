import {Col, Container, Nav, Row, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {initiateGetOrderHistory} from "../modules/orderHistory";
import {useEffect} from "react";


function OrderHistoryPage({history, initiateGetOrderHistory, currentUser, products}) {
    useEffect(() => initiateGetOrderHistory(currentUser.id), [])
    return <>
        <Container fluid>
            <Row className="m-5">
                <Col xs="auto">
                    <Nav defaultActiveKey="/user/orders" className="flex-column" variant="pills">
                        <LinkContainer to="/user/profile">
                            <Nav.Link>Account Information</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/user/orders">
                            <Nav.Link>Order History</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Col>
                <Col>
                    <h2 className="mt-5 mb-4">Order History</h2>
                    <Table size="sm" responsive>
                        <thead className="table-secondary">
                        <tr>
                            <th>Date Purchased</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {history.map((history, index) => <OrderHistoryTable key={index} history={history}
                                                                            products={products}/>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    </>
}

function OrderHistoryTable({history, products}) {
    return <>
        <tr>
            <td>{history.orderDate}</td>
            <td/>
            <td/>
            <td/>
        </tr>
        {history.cartSnapshot.map((cartItem, index) => <OrderHistoryCartItem key={index} cartItem={cartItem}
                                                                             products={products}/>)}
    </>
}


function OrderHistoryCartItem({cartItem, products}) {
    let name = ''

    for (let i = 0; i < products.length; i++)
        if (products[i].id === cartItem.productId)
            name = products[i].name


    return <>
        <tr className="hideTopBorder">
            <td/>
            <td>{cartItem.productId}</td>
            <td>{name}</td>
            <td>{cartItem.quantity}</td>
            <td>{cartItem.price}</td>
        </tr>
    </>
}


function mapStateToProps(state) {
    return {
        history: state.orderHistoryReducer.orderHistory,
        currentUser: state.userReducer.currentUser,
        products: state.productReducer.products
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateGetOrderHistory}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryPage)
