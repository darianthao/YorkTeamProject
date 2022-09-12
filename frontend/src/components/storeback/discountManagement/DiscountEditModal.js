import {Button, Col, Form, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {closeEditModal, initiateEditCoupon, streamModalData} from "../../../modules/discount";
import {connect} from "react-redux";
// import * as stream from "stream";

function DiscountEditModal({
                               showEditModalFlag,
                               modalData,
                               streamModalData,
                               closeEditModal,
                               initiateEditCoupon,
                                coupons
                           }) {

    function handleSubmit() {
        streamModalData({
            ...modalData,
            couponCode: modalData.couponCode.trimEnd(),
            discount: modalData.discount,
            startDate: modalData.startDate,
            endDate: modalData.endDate
        })

        if (modalData.couponCode === '' || modalData.discount === '' || modalData.startDate === '' || modalData.endDate === '')
            return alert("Please complete ALL fields")
        else if (modalData.discount <= 0) {
            return alert("Discount cannot be zero or negative")
        } else if (modalData.discount >= 100) {
            return alert("Discount cannot be greater than 100%")
        } else if(modalData.startDate > modalData.endDate) {
            return alert("Start Date must occur before End Date")
        } else {
            let matches = coupons.filter(coupon => {
                if (coupon.couponCode === modalData.couponCode) {
                    return coupon.id !== modalData.id;
                }
            })

            if (matches.length === 1) {
                return alert("Coupon name already exists")
            } else {
                initiateEditCoupon(modalData)
                closeEditModal()
            }
            // let count = 0
            // for (let i = 0; i < coupons.length; i++) {
            //     if (modalData.couponCode === coupons[i].couponCode) {
            //         count = count + 1
            //         alert("coupon Name exists")
            //         return
            //     }
            // }
            // if (count === 0){
            //     initiateEditCoupon(modalData)
            //     closeEditModal()
            // }
        }
    }

    return <Modal show={showEditModalFlag} onHide={closeEditModal}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Coupon Edit Code</Form.Label>
                    <Form.Control type="text"
                                  value={modalData.couponCode}
                                  onChange={e => streamModalData({
                                      ...modalData,
                                      couponCode: e.target.value
                                  })}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Discount Amount</Form.Label>
                    <Form.Control type="number"
                                  value={modalData.discount}
                                  onChange={e => streamModalData({
                                      ...modalData,
                                      discount: e.target.value
                                  })}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date"
                                  value={modalData.startDate}
                                  onChange={e => streamModalData({
                                      ...modalData,
                                      startDate: e.target.value
                                  })}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date"
                                  className="mb-3"
                                  value={modalData.endDate}
                                  onChange={e => streamModalData({
                                      ...modalData,
                                      endDate: e.target.value
                                  })}/>
                </Form.Group>

                <Button className='me-2' variant="warning" onClick={closeEditModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Complete Edit
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
}

function mapStateToProps(state) {
    return {
        showEditModalFlag: state.discountReducer.showEditModalFlag,
        coupon: state.discountReducer.editCoupon,
        modalData: state.discountReducer.modalData,
        coupons: state.discountReducer.coupons
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({closeEditModal, initiateEditCoupon, streamModalData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountEditModal)