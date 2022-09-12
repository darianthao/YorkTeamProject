import {Button, Card, Collapse, Container, Modal, Table} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {initiateDeleteProduct} from "../../../modules/product";
import {connect} from "react-redux";
import {useState} from "react";


function InventoryManagementTable({products, initiateDeleteProduct, handleEditProduct}) {
    return <Container className='mb-5'>
        <Table responsive>
            <thead className="table-secondary">
            <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Category Id</th>
                <th>Stock</th>
                <th>Available On</th>
                <th>Discontinued</th>
                <th>MAP Price</th>
                <th>Price</th>
                <th>Sale Price</th>
                <th>Description</th>
                <th>Image</th>
                <th colSpan={2}/>
            </tr>
            </thead>
            <tbody>
            {products.map(product => <ProductRow
                key={product.id}
                product={product}
                deleteProduct={initiateDeleteProduct}
                editProduct={handleEditProduct}/>)}
            </tbody>
        </Table>
    </Container>
}

function ProductRow({product, deleteProduct, editProduct}) {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const closeImgModal = () => setShow(false);
    const showImgModal = () => setShow(true);

    return <>
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.brand}</td>
            <td>{product.productCategoryId}</td>
            <td>{product.inventory}</td>
            <td>{product.availableOnDate}</td>
            <td>{product.isDiscontinued?.toString()}</td>
            <td>{product.mapPrice.toFixed(2)}</td>
            <td>{product.price.toFixed(2)}</td>
            <td>{product.salePrice.toFixed(2)}</td>
            <td>
                <Button variant="link" onClick={() => setOpen(!open)}>
                    {open ? "Close" : "Show"}
                </Button>
            </td>
            <td>
                <Button variant="link" onClick={showImgModal}>Image</Button>
            </td>
            <td>
                <Button variant="warning" onClick={() => editProduct(product)}>Edit</Button>
            </td>
            <td>
                <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
            </td>
        </tr>
        <Collapse in={open}>
            <tr className="hideTopBorder">
                <Modal show={show} onHide={closeImgModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Image Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card>
                            <Card.Img variant="top" src={product.image}
                                      style={{width: '100%', height: '30vh', objectFit: 'cover'}}/>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={closeImgModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <td/>
                <td colSpan={13}>
                    <p className="px-4">
                        Description: {`${product.description}`}
                    </p>
                </td>
            </tr>
        </Collapse>
    </>

}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateDeleteProduct}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryManagementTable)