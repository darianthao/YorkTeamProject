import {useEffect} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import ShipmentModal from "./ShipmentModal";
import {bindActionCreators} from "redux";
import {initiateGetShipments, showModal} from "../../../modules/shipments";
import {connect} from "react-redux";
import ShipmentManagementTable from "./ShipmentManagementTable";

function ShipmentManagement({showModal, shipments, initiateGetShipments}) {
    useEffect(() => initiateGetShipments(), [])

    function handleAddShipment() {
        showModal()
    }


    return <Container>
        <ShipmentModal/>
        <Row>
            <Col><h2 className="m-3">Shipments</h2></Col>
            <Col className='d-flex justify-content-end'><Button className="m-3" onClick={handleAddShipment}>Add Shipment</Button></Col>
        </Row>
        <Row>
            <ShipmentManagementTable shipments={shipments}/>
        </Row>
    </Container>
}



function mapStateToProps(state) {
    return {
        shipments: state.shipmentReducer.shipments
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({showModal, initiateGetShipments}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (ShipmentManagement)