import {useEffect} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import InventoryModal from "./InventoryModal";
import {bindActionCreators} from "redux";
import {initiateGetProducts, showModal} from "../../../modules/product";
import {connect} from "react-redux";
import InventoryManagementTable from "./InventoryManagementTable";

function InventoryManagement({showModal, products, initiateGetProducts}) {
    useEffect(() => initiateGetProducts(), [])

    function handleAddProduct() {
        showModal()
    }

    function handleEditProduct(productInfo) {
        showModal(productInfo)
    }

    return <Container>
        <InventoryModal/>
        <Row>
            <Col><h2 className="m-3">Inventory</h2></Col>
            <Col className='d-flex justify-content-end'><Button className="m-3" onClick={handleAddProduct}>Add Inventory</Button></Col>
        </Row>
        <Row>
            <InventoryManagementTable products={products} handleEditProduct={handleEditProduct}/>
        </Row>
    </Container>
}



function mapStateToProps(state) {
    return {
        products: state.productReducer.products
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({showModal, initiateGetProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (InventoryManagement)