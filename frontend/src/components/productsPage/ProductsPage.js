import {Container, Row} from "react-bootstrap";
import React, {useEffect} from "react";
import {initiateGetProducts, sortProducts} from "../../modules/product";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Products from "./Products";
import SearchFilterBar from "./SearchFilterBar";

function ProductPage({products, initiateGetProducts, sortProductsArray, sortStatus}) {
    useEffect(initiateGetProducts, [])


    return <>
        <SearchFilterBar productsToBeSorted={products}/>
        <Container>
            <Row xs={1} sm={2} md={3} xl={4} className="mt-5 mb-5">
                {sortStatus.length > 0 ? sortProductsArray.map((sortProductsArray, index) => <Products key={index} product={sortProductsArray}/>) : products.map((product, index) =>
                    <Products key={index} product={product}/>)
                }
            </Row>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        products: state.productReducer.products,
        sortProductsArray: state.productReducer.sortProductsArray,
        sortStatus: state.productReducer.sortStatus
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateGetProducts, sortProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);