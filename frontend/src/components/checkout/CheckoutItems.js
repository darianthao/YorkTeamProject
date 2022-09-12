import {Col} from "react-bootstrap";
import React from "react";


function CheckoutItems({product}) {
    return <>
        <Col className='mt-3'>
            <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                    <img src={product.image} className='checkoutImg'/>
                </div>
                <div className="flex-grow-1 ms-3">
                    <h5>{product.name}</h5>
                    <h6>Qty: {product.qty}</h6>
                    <div>{product.salePrice > 0 ?
                        <>
                            <h5>Price:
                                <span
                                    className='ms-2 pe-2 cartSalePrice'>
                                        ${product.salePrice}
                                    </span>
                                <span
                                    className='cartOGPrice'>
                                        ${product.price}
                                    </span>
                            </h5>
                        </> : <><h5>Price: ${product.price}</h5></>}
                    </div>
                </div>
            </div>
        </Col>
    </>
}

export default CheckoutItems