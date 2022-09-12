import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {closeModal, initiateAddProduct, initiateEditProduct, streamModalData} from "../../../modules/product";
import {connect} from "react-redux";
import {useState} from 'react';

function InventoryModal({
                            showModal,
                            modalData,
                            shipments,
                            categories,
                            closeModal,
                            initiateAddProduct,
                            initiateEditProduct,
                            streamModalData
                        }) {
    const [priceWarningMsg, setPriceWarningMsg] = useState("");

    function validatePrice() {
        let validEntries = shipments.filter(shipment => shipment.productId === modalData.id)
        let prices = validEntries.map(shipment => parseInt(shipment.pricePerItem))
        let highestBuyPrice = Math.max(...prices)

        if (modalData.price < highestBuyPrice) {
            setPriceWarningMsg(`We purchased ${modalData.name} for $${highestBuyPrice}, We're not a charity!`)
        } else if (modalData.price < modalData.mapPrice) {
            setPriceWarningMsg("Price is set below MSRP")
        } else {
            setPriceWarningMsg("")
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        modalData.id ? initiateEditProduct(modalData) : initiateAddProduct(modalData)
        closeModal()
    }

    return <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
            <Modal.Title>{modalData.id ? 'Edit Inventory' : 'Add Inventory'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="productName">
                        <Form.Label>Product name:</Form.Label>
                        <Form.Control placeholder="Name"
                                      required
                                      type="text"
                                      value={modalData.name}
                                      onChange={e => {
                                          streamModalData({...modalData, name: e.target.value})
                                      }}/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="productBrand">
                        <Form.Label>Product brand:</Form.Label>
                        <Form.Control placeholder="Brand"
                                      required
                                      type="text"
                                      value={modalData.brand}
                                      onChange={e => {
                                          streamModalData({...modalData, brand: e.target.value})
                                      }}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="productCategory">
                        <Form.Label>Product category ID:</Form.Label>
                        <Form.Select placeholder="Category ID"
                                     required
                                     value={modalData.productCategoryId}
                                     onChange={e => {
                                         streamModalData({...modalData, productCategoryId: e.target.value})
                                     }}>
                            <option style={{display: 'none'}} value="">Choose a category...</option>
                            {categories.map((opt, index) => (
                                <option key={index} value={opt.id}>{opt.id} - {opt.categoryName}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="productStock">
                        <Form.Label>Stock amount:</Form.Label>
                        <Form.Control type="number"
                                      disabled
                                      placeholder="Manage in shipments tab"
                                      value={modalData.inventory}
                                      onChange={e => {
                                          streamModalData({...modalData, inventory: e.target.value})
                                      }}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="availableOnDate">
                        <Form.Label>Available on date:</Form.Label>
                        <Form.Control placeholder="Available on date"
                                      required
                                      type="date"
                                      value={modalData.availableOnDate}
                                      onChange={e => {
                                          streamModalData({...modalData, availableOnDate: e.target.value})
                                      }}/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="isDiscontinued">
                        <Form.Label>Discontinued status:</Form.Label>
                        <Form.Select required
                                     value={modalData.isDiscontinued}
                                     onChange={e => {
                                         streamModalData({...modalData, isDiscontinued: e.target.value})
                                     }}>
                            <option value={false}>false</option>
                            <option value={true}>true</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="productDescription">
                    <Form.Label>Product description:</Form.Label>
                    <Form.Control placeholder="Description"
                                  type="text"
                                  required
                                  value={modalData.description}
                                  onChange={e => {
                                      streamModalData({...modalData, description: e.target.value})
                                  }}/>
                </Form.Group>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="mapPrice">
                        <Form.Label>MAP Price:</Form.Label>
                        <Form.Control placeholder="MAP Price"
                                      required
                                      type="number"
                                      value={modalData.mapPrice}
                                      onChange={e => {
                                          streamModalData({...modalData, mapPrice: e.target.value})
                                      }}/>
                        <Form.Text className="text-muted">Minimum advertised price.</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="productPrice" onMouseLeave={validatePrice}>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control placeholder="Price"
                                      required
                                      type="number"
                                      value={modalData.price}
                                      onChange={e => {
                                          streamModalData({...modalData, price: e.target.value})
                                         }}/>
                        <Form.Text className="text-warning">{priceWarningMsg === "" ? "" : priceWarningMsg}</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="salePrice">
                        <Form.Label>Sale price:</Form.Label>
                        <Form.Control placeholder="Manage in scheduling tab"
                                      disabled
                                      type="number"
                                      value={modalData.salePrice}
                                      onChange={e => {
                                          streamModalData({...modalData, salePrice: e.target.value})
                                      }}/>
                        <Form.Text className="text-muted">Price during scheduled sales.</Form.Text>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group className="mb-3" controlId="productImageURL" onMouseEnter={validatePrice}>
                        <Form.Label>Product Image:</Form.Label>
                        <Form.Control type="text"
                                      required
                            // pattern = "https?://.+"
                            // pattern = {"https?://.+" || "/productImages/.+"}
                                      placeholder="Upload images starting with 'https://' or '/productImages/'"
                                      value={modalData.image}
                                      onChange={e => {
                                          streamModalData({...modalData, image: e.target.value})
                                      }}/>
                    </Form.Group>
                </Row>
                <Button variant="warning" className='me-3' onClick={closeModal}>Close</Button>
                <Button variant="primary"
                        type="submit"
                        onMouseEnter={validatePrice}
                        disabled={modalData.name === "" || modalData.brand === "" ||
                        modalData.availableOnDate === "" || modalData.mapPrice === "" ||
                        modalData.price === "" || modalData.description === "" || modalData.image === ""}>
                    {modalData.id ? 'Save Changes' : 'Create'}
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
}

function mapStateToProps(state) {
    return {
        showModal: state.productReducer.showModal,
        modalData: state.productReducer.modalData,
        shipments: state.shipmentReducer.shipments,
        categories: state.categoryReducer.categories,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddProduct, initiateEditProduct, closeModal, streamModalData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryModal)