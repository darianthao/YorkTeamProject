import {Container, Tab, Tabs} from "react-bootstrap";
import {connect} from "react-redux";
import InventoryManagement from "./inventoryManagement/InventoryManagement";
import CategoryManagement from "./categoryManagement/CategoryManagement";
import DiscountManagement from "./discountManagement/DiscountManagement";
import ShipmentManagement from "./ShipmentManagement/ShipmentManagement";
import UserManagement from "./userManagement/UserManagement";
import PriceSchedulingManagement from "./schedulingManagement/PriceSchedulingManagement";

function StoreManagementPage({accountType}) {
    return <Container>
        <h1 className="my-4">Store Management</h1>
        <Tabs defaultActiveKey="inventory" id="shop-keep-tabs" className="mb-3">
            <Tab eventKey="inventory" title="Inventory">
                <InventoryManagement/>
            </Tab>
            <Tab eventKey="categories" title="Categories">
                <CategoryManagement/>
            </Tab>
            <Tab eventKey="discounts" title="Discounts">
                <DiscountManagement/>
            </Tab>
            <Tab eventKey="shipments" title="Shipments">
                <ShipmentManagement/>
            </Tab>
            <Tab eventKey="scheduling" title="Scheduling">
                <PriceSchedulingManagement/>
            </Tab>
            {accountType === 2 ?
                <Tab eventKey="users" title="Users">
                    <UserManagement/>
                </Tab>
            : null}
        </Tabs>
    </Container>
}

function mapStateToProps(state) {
    return {
        accountType: state.userReducer.currentUser.accountType
    }
}

export default connect(mapStateToProps)(StoreManagementPage)