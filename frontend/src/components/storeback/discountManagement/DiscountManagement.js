import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {showEditModal, showModal, initiateGetCoupons, initiateDeleteCoupon, initiateEditCoupon, editCoupon} from '../../../modules/discount'
import DiscountModal from "./DiscountModal";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {useEffect} from "react";
import DiscountEditModal from "./DiscountEditModal";
import {BsPercent} from "react-icons/bs";


function DiscountManagement({showEditModal,showModal, initiateGetCoupons, coupons, initiateDeleteCoupon}) {

    useEffect(initiateGetCoupons, [])

    return <Container>
        <DiscountModal/>
        <DiscountEditModal/>
        <Row>
            <Col><h2 className="m-3">Discounts</h2></Col>
            <Col className='d-flex justify-content-end'><Button className="m-3" onClick={showModal}>Add New Coupon</Button></Col>
        </Row>
        <Row>
            <Table size="sm" responsive>
                <thead className="table-secondary">
                <tr>
                    <th>Coupon Code</th>
                    <th>Discount Amount</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th width="1px"/>
                    <th width="1px"/>
                </tr>
                </thead>
                <tbody>
                {coupons.map(coupon => <CouponTableRow key={coupon.id} coupon={coupon}
                                                       showEditModal = {showEditModal}
                                                       deleteCoupon={initiateDeleteCoupon}/>)}
                </tbody>
            </Table>

        </Row>
    </Container>
}

function CouponTableRow({coupon, deleteCoupon, showEditModal}) {
    return <tr>
        <td>{coupon.couponCode}</td>
        <td>{coupon.discount}<BsPercent/></td>
        <td>{coupon.startDate}</td>
        <td>{coupon.endDate}</td>
        <td>
            <Button variant="warning" size="sm" onClick={() => showEditModal(coupon)} >Edit</Button>
        </td>
        <td>
            <Button variant="danger" size="sm" onClick={() => deleteCoupon(coupon.id)}>Delete</Button>
        </td>

    </tr>


}

function mapStateToProps(state) {
    return {
        discounts: state.discountReducer.discounts,
        coupons: state.discountReducer.coupons,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({showEditModal, showModal, initiateGetCoupons, initiateDeleteCoupon, initiateEditCoupon, editCoupon}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountManagement)