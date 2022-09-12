import {Button, Form, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {
    closePriceModal,
    initiateAddScheduledPrice,
    initiateEditScheduledPrice,
    initiateAddScheduledSale,
    initiateEditScheduledSale,
    initiateAddScheduledMapPrice,
    initiateEditScheduledMapPrice,
    streamPriceModalData
} from "../../../modules/scheduling";
import {connect} from "react-redux";
import {useState} from "react";


function PriceSchedulingModal({showPriceModal,
                                  priceModalData,
                                  closePriceModal,
                                  products,
                                  shipments,
                                  modalMode,
                                  initiateAddScheduledPrice,
                                  initiateEditScheduledPrice,
                                  initiateAddScheduledSale,
                                  initiateEditScheduledSale,
                                  initiateAddScheduledMapPrice,
                                  initiateEditScheduledMapPrice,
                                  streamPriceModalData,
                                  }) {


    const [priceWarningMsg, setPriceWarningMsg] = useState("");


    async function validatePrice(stream) {

        await stream

        let validEntries = shipments.filter(shipment => shipment.productId === parseInt(priceModalData.productId))
        let prices = validEntries.map(shipment => parseInt(shipment.pricePerItem))
        let productName = products.filter(product => product.id === parseInt(priceModalData.productId)).map(product => product.name)
        let productMapPrices = products.filter(product => product.id === parseInt(priceModalData.productId)).map(product => product.mapPrice)
        let productMapPrice = Math.max(productMapPrices)
        let highestBuyPrice = Math.max(...prices)

        if (parseInt(priceModalData.price) < highestBuyPrice && modalMode === "Price") {
            setPriceWarningMsg(`We purchased ${productName} for $${highestBuyPrice}, We're not a charity!`)
        } else if(parseInt(priceModalData.price) < productMapPrice && modalMode === "Price"){
            setPriceWarningMsg(`MAP Price is $${productMapPrice}`)
        }
        else {
            setPriceWarningMsg("")
        }
    }




    function handleSubmit() {
        if(modalMode === "Price"){
            (priceModalData.id) ? initiateEditScheduledPrice(priceModalData) : initiateAddScheduledPrice(priceModalData)
            closePriceModal()
        }
        else if(modalMode === "Sale"){
            (priceModalData.id) ? initiateEditScheduledSale(priceModalData) : initiateAddScheduledSale(priceModalData)
            closePriceModal()
        }
        else{
            (priceModalData.id) ? initiateEditScheduledMapPrice(priceModalData) : initiateAddScheduledMapPrice(priceModalData)
            closePriceModal()
        }


    }

    return <Modal show={showPriceModal} onHide={closePriceModal}>
        <Modal.Header closeButton>
            <Modal.Title>Schedule {modalMode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className="mb-3">

                <Form.Group className="mb-3" controlId="scheduledPriceId">
                    <Form.Label>Product ID:</Form.Label>

                    <Form.Select placeholder="Product ID"
                                 required
                                 value={priceModalData.productId}
                                 onChange={e => {
                                     streamPriceModalData({...priceModalData, productId: e.target.value})
                                 }}>
                        <option style={{display: 'none'}}>Choose a Product...</option>
                        {products.map((opt, index) => (
                            <option key={index} value={opt.id}>{opt.id} - {opt.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="startDate">
                    <Form.Label>Start Date:</Form.Label>
                    <Form.Control type="date" placeholder="Start Date" value={priceModalData.startDate}
                                  onChange={e => {
                                      streamPriceModalData({...priceModalData, startDate: e.target.value})
                                  }}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="endDate">
                    <Form.Label>End Date:</Form.Label>
                    <Form.Control type="date" placeholder="End Date" value={priceModalData.endDate}
                                  onChange={e => {
                                      streamPriceModalData({...priceModalData, endDate: e.target.value})
                                  }}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="price" onMouseLeave={validatePrice}>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type = "number" placeholder="Add Price" value={priceModalData.price}
                                  onChange={e => {
                                      streamPriceModalData({...priceModalData, price: e.target.value})
                                  }}/>
                    <Form.Text className="text-warning">{priceWarningMsg === "" ? "" : priceWarningMsg}</Form.Text>
                </Form.Group>

                <Button className='me-2' variant="warning"
                        onClick={closePriceModal}>
                    Close
                </Button>
                <Button variant="primary"
                        onMouseEnter={validatePrice}
                        onClick={handleSubmit}>
                    {priceModalData.id ? 'Save Changes' : 'Create'}
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
}

function mapStateToProps(state) {
    return {
        showPriceModal: state.schedulingReducer.showPriceModal,
        priceModalData: state.schedulingReducer.priceModalData,
        products: state.productReducer.products,
        shipments: state.shipmentReducer.shipments,
        modalMode: state.schedulingReducer.modalMode
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddScheduledPrice, initiateEditScheduledPrice,
        initiateAddScheduledSale, initiateEditScheduledSale,
        initiateAddScheduledMapPrice, initiateEditScheduledMapPrice,
        closePriceModal, streamPriceModalData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceSchedulingModal)