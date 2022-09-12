import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {initiateDeleteCategory, showModal} from "../../../modules/category";
import CategoryModal from "./CategoryModal";

function CategoryManagement({showModal, initiateDeleteCategory, categories}) {
    function handleAddCategory() {
        showModal()
    }

    function handleEditCategory(categoryData) {
        showModal(categoryData)
    }

    return <Container>
        <CategoryModal/>
        <Row>
            <Col><h2 className="m-3">Product Categories</h2></Col>
            <Col className='d-flex justify-content-end'><Button className="m-3" onClick={handleAddCategory}>Add New Category</Button></Col>
        </Row>
        <Row>
            <Table size="sm" responsive>
                <thead className="table-secondary">
                <tr>
                    <th>Category ID</th>
                    <th>Category Title</th>
                    <th width="1px"/>
                    <th width="1px"/>
                </tr>
                </thead>
                <tbody>
                {categories.length > 0 ?
                    categories.map(category => <CategoryTableRow key={category.id} category={category}
                                                              deleteCategory={initiateDeleteCategory}
                                                              editCategory={handleEditCategory}/>)
                    :
                    <tr>
                        <td colSpan={10}>There are no categories to display.</td>
                    </tr>
                }
                </tbody>
            </Table>
        </Row>
    </Container>
}

function CategoryTableRow({category, deleteCategory, editCategory}) {
    return <tr>
        <td>{category.id}</td>
        <td>{category.categoryName}</td>
        <td>
            <Button size="sm" variant="warning" onClick={() => editCategory(category)}>Edit</Button>
        </td>
        <td>
            <Button size="sm" variant="danger" onClick={() => deleteCategory(category.id)}>Delete</Button>
        </td>
    </tr>
}

function mapStateToProps(state) {
    return {
        categories: state.categoryReducer.categories
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({showModal, initiateDeleteCategory}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManagement)