import {Container, Tab, Tabs} from "react-bootstrap";
import PriceSchedulingManagement from "./PriceSchedulingManagement";

function SchedulingManagementGroupPage() {
    return <Container>
        <h1 className="my-4">Price Scheduling</h1>
        <Tabs defaultActiveKey="prices" id="scheduled-prices" className="mb-3">
            <Tab eventKey="prices" title="Prices">
                <PriceSchedulingManagement/>
            </Tab>
        </Tabs>
    </Container>
}



export default SchedulingManagementGroupPage