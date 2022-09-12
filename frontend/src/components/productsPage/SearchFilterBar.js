import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sortProducts} from "../../modules/product";

function SearchFilterBar({productsToBeSorted,sortProducts}) {


    function check(sortValue, {productsToBeSorted}) {
        sortProducts(sortValue, productsToBeSorted)
    }

    return  <Container>
        <Form>
            <Row className='mt-5'>
                <Col xs = {3}>
                    <Form.Select
                        onChange={sort => check(sort.target.value, {productsToBeSorted})}>
                        <option>Sort by:</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        {/*<option>Featured</option>*/}
                    </Form.Select>
                </Col>
                {/*<Col></Col>*/}
                {/*<Col xs='auto'>*/}
                {/*    <Form.Label>Search Price:</Form.Label>*/}
                {/*</Col>*/}
                {/*<Col>*/}
                {/*    <Form.Control placeholder="$Min"/>*/}
                {/*</Col>*/}
                {/*<Col>*/}
                {/*    <Form.Control placeholder="$Max"/>*/}
                {/*</Col>*/}
                {/*<Col>*/}
                {/*    <Button variant="warning"><BsSearch/> Search</Button>*/}
                {/*</Col>*/}
            </Row>
        </Form>
    </Container>
}

function mapStateToProps(state) {
    return {
        products: state.productReducer.products,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({sortProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilterBar)