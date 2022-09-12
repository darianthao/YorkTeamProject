import {Button, Container, Table} from "react-bootstrap";
import {connect} from "react-redux";
import React from "react";
import {checkProductExists} from "../../../modules/product";

function PriceSchedulingManagementTable({scheduledPrices, products, handleEditScheduledPrice, deleteProp}) {
    return <Container>
        <Table size="sm" responsive>
            <thead className="table-secondary">
            <tr>
                <th>ID</th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price</th>
                <th width="1px"/>
                <th width="1px"/>
            </tr>
            </thead>
            <tbody>
            {scheduledPrices.filter(scheduledPrice => checkProductExists(products, scheduledPrice.productId))
                .map(scheduledPrice =>
                    <ScheduledPriceRow
                        key={scheduledPrice.id}
                        scheduledPrice={scheduledPrice}
                        deleteProp={deleteProp}
                        product={products.filter(product => (product.id === scheduledPrice.productId))[0]}
                        editScheduledPrice={handleEditScheduledPrice}/>
                )}
            </tbody>
        </Table>
    </Container>
}

function ScheduledPriceRow({scheduledPrice, product, editScheduledPrice, deleteProp}) {
    return <>
        <tr>
            <td>{scheduledPrice.id}</td>
            <td>{scheduledPrice.productId}</td>
            <td>{product.name}</td>
            <td>{scheduledPrice.startDate}</td>
            <td>{scheduledPrice.endDate}</td>
            <td>{scheduledPrice.price}</td>
            <td>
                <Button size="sm" variant="warning" onClick={() => editScheduledPrice(scheduledPrice)}>Edit</Button>
            </td>
            <td>
                <Button size="sm" variant="danger" onClick={() => deleteProp(scheduledPrice.id)}>Delete</Button>
            </td>
        </tr>
    </>
}

function mapStateToProps(state) {
    return {
        products: state.productReducer.products
    }
}

export default connect(mapStateToProps)(PriceSchedulingManagementTable)