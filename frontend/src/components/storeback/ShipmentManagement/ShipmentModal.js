import {Button, Form, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {closeModal, initiateAddShipment, streamModalData} from "../../../modules/shipments";
import {connect} from "react-redux";

function ShipmentModal({showModal, modalData, closeModal, products, initiateAddShipment, streamModalData}) {
    function handleSubmit() {
        initiateAddShipment(modalData)
        closeModal()
    }

    return <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>Add Shipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className="mb-3">

                <Form.Group className="mb-3" controlId="productId">
                    <Form.Label>Product ID:</Form.Label>

                    <Form.Select placeholder="Product ID"
                                 required
                                 value={modalData.productId}
                                 onChange={e => {
                                     streamModalData({...modalData, productId: e.target.value})
                                 }}>
                    <option style={{display: 'none'}}>Choose a Product...</option>
                    {products.map((opt, index) => (
                        <option key={index} value={opt.id}>{opt.id} - {opt.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Shipment Quantity:</Form.Label>
                <Form.Control placeholder="Quantity" value={modalData.quantity}
                              onChange={e => {
                                  streamModalData({...modalData, quantity: e.target.value})
                              }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="pricePerItem">
                <Form.Label>Price per Item:</Form.Label>
                <Form.Control placeholder="Price per Item" value={modalData.pricePerItem}
                              onChange={e => {
                                  streamModalData({...modalData, pricePerItem: e.target.value})
                              }}/>
            </Form.Group>
            <Button variant="warning"
                    className='me-2'
                    onClick={closeModal}>
                Close
            </Button>
            <Button variant="primary"
                    onClick={handleSubmit}>
                Add Shipment
            </Button>
        </Form>
    </Modal.Body>
</Modal>
}

function mapStateToProps(state) {
    return {
        showModal: state.shipmentReducer.showModal,
        modalData: state.shipmentReducer.modalData,
        products: state.productReducer.products
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddShipment, closeModal, streamModalData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentModal)