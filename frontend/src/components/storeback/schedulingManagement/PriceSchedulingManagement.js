import {useEffect} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import PriceSchedulingModal from "./PriceSchedulingModal";
import {bindActionCreators} from "redux";
import {initiateGetScheduledPrices, initiateGetScheduledSales, initiateGetScheduledMapPrices,
    showPriceModal, setModalMode, initiateDeleteScheduledMapPrice, initiateDeleteScheduledPrice, initiateDeleteScheduledSale} from "../../../modules/scheduling";
import {connect} from "react-redux";
import PriceSchedulingManagementTable from "./PriceSchedulingManagementTable";



function PriceSchedulingManagement({scheduledPrices, scheduledSales, scheduledMapPrices, showPriceModal,
                                       initiateGetScheduledPrices, initiateGetScheduledSales, initiateGetScheduledMapPrices, setModalMode,
                                       initiateDeleteScheduledMapPrice, initiateDeleteScheduledPrice, initiateDeleteScheduledSale}) {
    useEffect(() => initiateGetScheduledPrices(), [])
    useEffect(() => initiateGetScheduledSales(), [])
    useEffect(() => initiateGetScheduledMapPrices(), [])

//Prices
    function handleAddScheduledPrice() {
        setModalMode("Price")
        showPriceModal()
    }


    function handleEditScheduledPrice(scheduledPriceInfo) {
        setModalMode("Price")
        showPriceModal(scheduledPriceInfo)
    }

//Sales
    function handleAddScheduledSale() {
        setModalMode("Sale")
        showPriceModal()
    }
    function handleEditScheduledSale(scheduledPriceInfo) {
        setModalMode("Sale")
        showPriceModal(scheduledPriceInfo)
    }

//Map Prices
    function handleAddScheduledMapPrice() {
        setModalMode("Map Price")
        showPriceModal()
    }
    function handleEditScheduledMapPrice(scheduledPriceInfo) {
        setModalMode("Map Price")
        showPriceModal(scheduledPriceInfo)
    }

    return <Container>
        <PriceSchedulingModal/>
        <Row>
            <Col><h2 className="m-3">Scheduled Prices</h2></Col>
            <Col className='d-flex justify-content-end'><Button className="m-3" onClick={handleAddScheduledPrice}>Schedule New Price</Button></Col>
        </Row>
        <Row>
            <PriceSchedulingManagementTable scheduledPrices={scheduledPrices} handleEditScheduledPrice={handleEditScheduledPrice} deleteProp={initiateDeleteScheduledPrice}/>
        </Row>


        <Row>
            <Col><h2 className="m-3">Scheduled Sales</h2></Col>
            <Col className='d-flex justify-content-end'><Button className="m-3" onClick={handleAddScheduledSale}>Schedule New Sale</Button></Col>
        </Row>
        <Row>
            <PriceSchedulingManagementTable scheduledPrices={scheduledSales} handleEditScheduledPrice={handleEditScheduledSale} deleteProp={initiateDeleteScheduledSale}/>
        </Row>


        <Row>
            <Col><h2 className="m-3">Scheduled Map Prices</h2></Col>
            <Col className='d-flex justify-content-end'><Button className="m-3" onClick={handleAddScheduledMapPrice}>Schedule New Map Price</Button></Col>
        </Row>
        <Row>
            <PriceSchedulingManagementTable scheduledPrices={scheduledMapPrices} handleEditScheduledPrice={handleEditScheduledMapPrice} deleteProp={initiateDeleteScheduledMapPrice}/>
        </Row>
    </Container>
}



function mapStateToProps(state) {
    return {
        scheduledPrices: state.schedulingReducer.prices,
        scheduledSales:state.schedulingReducer.sales,
        scheduledMapPrices:state.schedulingReducer.mapPrices
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({showPriceModal, initiateGetScheduledPrices, initiateGetScheduledSales,
        initiateGetScheduledMapPrices, setModalMode, initiateDeleteScheduledSale, initiateDeleteScheduledMapPrice, initiateDeleteScheduledPrice}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (PriceSchedulingManagement)