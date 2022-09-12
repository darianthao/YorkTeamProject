import {Button, Form, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {closeModal, initiateAddCategory, initiateEditCategory, streamModalData} from "../../../modules/category";

function CategoryModal({
                           showModalFlag,
                           modalData,
                           closeModal,
                           initiateAddCategory,
                           initiateEditCategory,
                           streamModalData
                       }) {
    function handleSubmit() {
        streamModalData({...modalData, categoryName: modalData.categoryName.trimEnd()})
        modalData.id > 0 ? initiateEditCategory(modalData) : initiateAddCategory(modalData)
        closeModal()
    }

    return <Modal show={showModalFlag} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>{modalData.id > 0 ? 'Edit Category' : 'Create New Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="categoryTitle">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text" placeholder="Enter category title" value={modalData.categoryName}
                                  className='mb-3'
                                  onChange={e => streamModalData({
                                      ...modalData,
                                      categoryName: e.target.value.trimStart()
                                  })}/>
                </Form.Group>
                <Button variant="warning me-2" onClick={closeModal}>
                    Discard
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={modalData.categoryName === ""}>
                    {modalData.id > 0 ? 'Save Changes' : 'Create'}
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
}

function mapStateToProps(state) {
    return {
        showModalFlag: state.categoryReducer.showModalFlag,
        modalData: state.categoryReducer.modalData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateAddCategory, initiateEditCategory, closeModal, streamModalData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryModal)