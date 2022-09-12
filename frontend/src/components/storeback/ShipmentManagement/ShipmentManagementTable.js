import {Container, Table} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {checkProductExists} from "../../../modules/product";
import React from "react";


function ShipmentManagementTable({shipments, products}) {
    return<Container>
        <Table size="sm" responsive>
            <thead className="table-secondary">
            <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Cost per Item</th>
            </tr>
            </thead>
            <tbody>
            {shipments.filter(shipment => checkProductExists(products, shipment.productId))
                .map(shipment =>
                    <ShipmentRow
                        key={shipment.id}
                        shipment={shipment}
                        product={products.filter(product => (product.id === shipment.productId))[0]}
                        />
                )}
            </tbody>
        </Table>
    </Container>
}

function ShipmentRow({shipment, product}) {

    return <>
        <tr>
            <td>{shipment.id}</td>
            <td>{shipment.productId}</td>
            <td>{product.name}</td>
            <td>{shipment.purchaseDate}</td>
            <td>{shipment.quantity}</td>
            <td>{shipment.pricePerItem}</td>
        </tr>
    </>

}

function mapStateToProps(state) {
    return {
        products:state.productReducer.products
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (ShipmentManagementTable)