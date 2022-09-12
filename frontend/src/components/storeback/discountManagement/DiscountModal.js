import {Button, Col, Form, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {closeModal, initiateAddCoupon} from "../../../modules/discount";
import {useState} from "react";

function DiscountModal({showModalFlag, closeModal, initiateAddCoupon, coupons}) {

    const [couponName, setCouponName] = useState('')
    const [discountAmount, setDiscountAmount] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')


    const newStartDate = new Date(startDate)
    newStartDate.setDate(newStartDate.getDate() + 1)

    const newEndDate = new Date(endDate)
    newEndDate.setDate(newEndDate.getDate() + 1)

    const couponInfo = {
        couponCode: couponName,
        discount: discountAmount,
        startDate: newStartDate,
        endDate: newEndDate
    }

    function handleSubmit() {
        if (couponName === '' || discountAmount === '' || startDate === '' || endDate === '')
            return alert("Please Complete All Fields")
        else if (couponInfo.discount <= 0 || couponInfo.discount >= 100)
            return alert("Discount Amount Cannot Be Zero, Negative or 100 Percent")
        else if (couponInfo.startDate > couponInfo.endDate) {
            return alert("Start Date must occur before End Date")
        } else {
            let count = 0
            for (let i = 0; i < coupons.length; i++) {
                if (couponInfo.couponCode === coupons[i].couponCode) {
                    count = count + 1
                    alert("coupon Name exists")
                    return
                }
            }
            if (count === 0) {
                initiateAddCoupon(couponInfo)
                closeModal()
                setDiscountAmount('')
                setEndDate('')
                setCouponName('')
                setStartDate('')
            }
        }
    }

    return <Modal show={showModalFlag} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>Create New Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group as={Col} controlId="formGridCouponName" className='mb-3'>
                    <Form.Label>Coupon Code</Form.Label>
                    <Form.Control type="text" placeholder="CouponName"
                                  onChange={event => setCouponName(event.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDisAmount" className='mb-3'>
                    <Form.Label>Discount Amount</Form.Label>
                    <Form.Control type="number" placeholder="Discount Amount"
                                  onChange={event => setDiscountAmount(event.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridStartDate" className='mb-3'>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date"
                                  onChange={event => setStartDate(event.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEndDate" className='mb-3'>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date"
                                  onChange={event => setEndDate(event.target.value)}/>
                </Form.Group>

                <Button className='me-2' variant="warning" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Create
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
}


function mapStateToProps(state) {
    return {
        showModalFlag: state.discountReducer.showModalFlag,
        modalData: state.discountReducer.modalData,
        coupons: state.discountReducer.coupons
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({closeModal, initiateAddCoupon}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountModal)