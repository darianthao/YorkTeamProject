import {Button, Col, Image, Row} from "react-bootstrap"
import {Link} from "react-router-dom";
import header5 from './images/header5.png'
import {bindActionCreators} from "redux";
import {initiateGetByCategoryID, initiateGetOneProduct, initiateGetProducts} from "../modules/product";
import {connect} from "react-redux";
import consoles from './images/lp_console.png'
import games from './images/lp_games.png'
import accessories from './images/lp_accessory.png'


function LandingPage({initiateGetByCategoryID, initiateGetOneProduct, initiateGetProducts}) {
    return <>
        <div className='imgWrapper mt-2'>
            <Image src={header5} className='img-fluid landingPageImg'/>
        </div>
        <div className='d-flex align-items-center mt-2 shadyBanner'>
            <Col>
                <h3>Shady Deal of the Day</h3>
                <p> Shady new deals. Every day.</p>
                <Link to='/shop/shady-deals'>
                    <Button onClick={() => {
                        initiateGetProducts()
                        initiateGetOneProduct(104)
                    }}>Shop the Shady Deal</Button>
                </Link>
            </Col>
        </div>
        <div>
            <Row xs={1} lg={3} className='pt-2 pb-2 m-0 d-flex'>
                <Col className='d-flex justify-content-center first'>
                    <Link to='/shop/category' onClick={() => initiateGetByCategoryID("4")}>
                        <Image fluid src={consoles} className='landingPageGrid'/>
                    </Link>
                    <div className='overlayText'>
                        <h3> Shop Consoles</h3>
                    </div>
                </Col>
                <Col className='d-flex justify-content-center second'>
                    <Link to='/shop/category' onClick={() => initiateGetByCategoryID("6")}>
                        <Image fluid src={accessories} className='landingPageGrid'/>
                    </Link>
                    <div className='overlayText'>
                        <h3> Shop Accessories</h3>
                    </div>
                </Col>
                <Col className='d-flex justify-content-center third'>
                    <Link to='/shop/category' onClick={() => initiateGetByCategoryID("5")}>
                        <Image fluid src={games} className='firstImg'/>
                    </Link>
                    <div className='overlayText'>
                        <h3> Shop Games</h3>
                    </div>
                </Col>
            </Row>
        </div>
    </>
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateGetByCategoryID, initiateGetOneProduct, initiateGetProducts}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(LandingPage)