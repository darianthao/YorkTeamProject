import {Button, Card, Col} from "react-bootstrap";
import {BsCart3} from "react-icons/bs";
import React from "react";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {initiateGetOneProduct} from "../../modules/product";
import {connect} from "react-redux";
import {initiateAddToCart} from "../../modules/cart";

function Products({product, initiateGetOneProduct, initiateAddToCart, cartItems, currentUser}) {

    function handleQty(product, cartItems, currentUser) {
        if (cartItems.some(cartProduct => cartProduct.id === product.id)) {
            let cartItem = cartItems.filter(cartProduct => cartProduct.id === product.id)
            cartItem[0].qty = cartItem[0].qty + 1
            product = cartItem[0]
        } else {
            product = {...product, qty: 1}
        }
        initiateAddToCart(product, currentUser)
    }

    return <>
        <Col className='mt-2 mb-3'>
            {!product.isDiscontinued ?
                <Card className='productCard'>
                    <Link to={`/shop/products/item-${product.id}`} onClick={() => initiateGetOneProduct(product.id)}>
                        <Card.Img variant="top" src={product.image}/>
                    </Link>
                    <Card.Body>
                        {product.salePrice > 0 ?
                            <>
                                <Card.Title>{product.brand}</Card.Title>
                                <Link to={`/shop/products/item-${product.id}`}
                                      onClick={() => initiateGetOneProduct(product.id)}>
                                    <Card.Text>{product.name}</Card.Text>
                                </Link>
                                <Card.Text>
                                    <span
                                        className='pe-2 productsSalePrice'>
                                        ${product.salePrice}
                                    </span>
                                    <span
                                        className='productOGPrice'>
                                        ${product.price}
                                    </span>
                                </Card.Text>
                            </>
                            :
                            <>
                                <Card.Title>{product.brand}</Card.Title>
                                <Link to={`/shop/products/item-${product.id}`}
                                      onClick={() => initiateGetOneProduct(product.id)}>
                                    <Card.Text>{product.name}</Card.Text>
                                </Link>
                                <Card.Text>
                                    ${product.price}
                                </Card.Text>
                            </>
                        }
                        <Button variant="primary"
                                onClick={() => handleQty(product, cartItems, currentUser)}>
                            <BsCart3 size="20px" className='productCartIcon me-1'/>
                            Add to Cart</Button>
                    </Card.Body>
                </Card>
                :
                <Card className='productCard' border="danger">
                    <Link className='disLink' to={`/shop/products/item-${product.id}`}
                          onClick={() => initiateGetOneProduct(product.id)}>
                        <Card.Img variant="top" src={product.image}
                                  style={{width: '100%', height: '30vh', objectFit: 'cover', opacity: 0.5}}/>
                    </Link>
                    <Card.Body>
                        <Card.Title>{product.brand}</Card.Title>
                        <Link to={`/shop/products/item-${product.id}`}
                              onClick={() => initiateGetOneProduct(product.id)}>
                            <Card.Text>{product.name}</Card.Text>
                        </Link>
                        <Card.Text>${product.price}</Card.Text>
                        <Button variant="warning" disabled>
                            Discontinued
                        </Button>
                    </Card.Body>
                </Card>}
        </Col>
    </>
}

function mapStateToProps(state) {
    return {
        cartItems: state.cartReducer.cartItems,
        currentUser: state.userReducer.currentUser.id
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateGetOneProduct, initiateAddToCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)

