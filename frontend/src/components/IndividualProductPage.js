import {Button, Col, Container, Image, Row} from "react-bootstrap";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {initiateAddToCart,} from "../modules/cart";
import {MdArrowBackIosNew} from "react-icons/md";
import {BsCart3} from "react-icons/bs";
import {AiOutlineShopping} from "react-icons/ai";

function IndividualProductPage({oneProduct, initiateAddToCart, cartItems, currentUser}) {
    let navigate = useNavigate();
    function handleQty(oneProduct, cartItems, currentUser) {
        if (cartItems.some(cartProduct => cartProduct.id === oneProduct.id)) {
            let cartItem = cartItems.filter(cartProduct => cartProduct.id === oneProduct.id)
            cartItem[0].qty = cartItem[0].qty + 1
            oneProduct = cartItem[0]
        } else {
            oneProduct = {...oneProduct, qty: 1}
        }
        initiateAddToCart(oneProduct, currentUser)
    }

    return <>
        <div>
            <Container>
                <div className='mt-5'>
                    <Button variant="link" className="continueLink" onClick={() => navigate(-1)}>
                        <MdArrowBackIosNew className='productArrow' size='18px'/>Continue Shopping</Button>
                </div>
                <Row xs={1} md={2} className="mt-3 mb-5">
                    <Col lg={7} className='mb-3'>
                        <Image className='productImg' fluid src={oneProduct.image}/>
                    </Col>
                    <Col lg={5}>
                        <div>
                            <p className='mb-1'>{oneProduct.brand}</p>
                            <h2 className='mb-2'>{oneProduct.name}</h2>
                            <p className='productDescription'>{oneProduct.description}</p>
                            <div>
                                {oneProduct.salePrice > 0 ?
                                    <>
                                        <h4
                                            className="me-2 indSalePrice">
                                            Now: ${oneProduct.salePrice}
                                        </h4>
                                        <h4>Was: ${oneProduct.price}</h4>

                                    </> : <h3>${oneProduct.price}</h3>}
                            </div>
                        </div>
                        <div> {!oneProduct.isDiscontinued ?
                            <>
                                <div>
                                    <Button variant="primary"
                                            className='productCartBtn'
                                            onClick={() => handleQty(oneProduct, cartItems, currentUser)}>
                                        <BsCart3 size="20px" className='productCartIcon me-1'/>
                                        Add to Cart
                                    </Button>
                                </div>
                                <div>
                                    <Link to='/shop/cart'>
                                        <Button variant="warning"
                                                className='buyNowBtn'
                                                onClick={() => handleQty(oneProduct, cartItems, currentUser)}>
                                            <AiOutlineShopping size="20px" className='productCartIcon me-1'/>
                                            Buy Now
                                        </Button>
                                    </Link>
                                </div>
                            </> :
                            <Button variant="warning" disabled
                                    className='productCartBtn'
                                    onClick={() => handleQty(oneProduct, cartItems, currentUser)}>
                                Discontinued
                            </Button>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>

}

function mapStateToProps(state) {
    return {
        oneProduct: state.productReducer.oneProduct,
        cartItems: state.cartReducer.cartItems,
        currentUser: state.userReducer.currentUser.id
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddToCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualProductPage);