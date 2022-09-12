import {Container, Row} from "react-bootstrap";
import React from "react";
import {connect} from "react-redux";
import Products from "./Products";
import SearchFilterBar from "./SearchFilterBar";

function CategoryPage({categoryProds,sortProductsArray,sortStatus}) {

    return <>
        <SearchFilterBar productsToBeSorted={categoryProds}/>
        <Container>
            <Row xs={1} sm={2} md={3} xl={4} className="mt-5 mb-5">
                {sortStatus.length > 0 ? sortProductsArray.map((sortProductsArray, index) => <Products key={index} product={sortProductsArray}/>) :
                    categoryProds.map((product, index) => <Products key={index} product={product}/>)
                }

            </Row>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        categoryProds: state.productReducer.categoryProds,
        sortProductsArray: state.productReducer.sortProductsArray,
        sortStatus: state.productReducer.sortStatus
    }
}

export default connect(mapStateToProps)(CategoryPage)