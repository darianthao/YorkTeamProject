import {Button, Container, Image} from "react-bootstrap";
import confirmation from '../images/confirmation.png'
import {Link} from "react-router-dom";

function ConfirmationPage() {
    return <>
    <div>
        <Image fluid src={confirmation} className='mt-5'/>
    </div>
    <Container className='d-flex align-items-center'>
        <div className='confirmationDiv'>
            <h2>Order Number: #A23098412</h2>
            <h3>We'll let you know when your order ships.</h3>
            <Link to='/shop/products'>
                <Button className='confirmationBtn'>Keep Shopping</Button>
            </Link>
        </div>
    </Container>
    </>
}

export default ConfirmationPage