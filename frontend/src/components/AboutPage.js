import shadyAbout from './images/shadyAbout.png'
import {Accordion, Col, Container, Image, Row} from "react-bootstrap";

function AboutPage() {
    return <>
        <div className='page-container'>
            <div className='content-wrap'>

                <Container className='main-about'>
                    <Row className='about-content'>
                        <Col className='about-header' xs={8}>
                            <h1 className='about-ss'>WHO IS SHADY SHACK</h1>
                        </Col>
                        <Col className='d-inline justify-content-center' xs={12} md={8}>
                            <Accordion defaultActiveKey="0" >
                                <Accordion.Item eventKey="0" >
                                    <Accordion.Header className='accordionHeader'>Great question! An even better question is "Who is York Solutions?"</Accordion.Header>
                                    <Accordion.Body className='accordion1'>

                                        <a href='https://yorksolutions.net'>York Solutions</a> is a veteran-owned, IT consulting firm,
                                        specializing in building quality, long-term
                                        relationships
                                        with both clients and their workforce. Through programs such as Think IT, Link to Leadership, <a href='https://yorksolutions.net/b2e-career-seekers/'>Barriers To
                                            Entry</a>, as well as partnering with Genesys Works, York Solutions is positively contributing to a professional,
                                        equal-opportunity workforce.

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Interesting. So, does that mean York Solutions is Shady Shack?</Accordion.Header>
                                    <Accordion.Body className='accordion1'>
                                        Nope! York Solutions is the opposite of Shady! Through the <a href='https://yorksolutions.net/b2e-career-seekers/'>Barriers To
                                        Entry</a> program, eleven people from various
                                        backgrounds (check out our <a href='/contact'>Contact Page</a>) have teamed up to create Shady Shack.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>This is great and all, but I am still wondering, why does Shady Shack exist?</Accordion.Header>
                                    <Accordion.Body className='accordion1'>
                                        Between December 22, 2021 and January 12, 2022, <a href='/contact'>this team</a> was deemed to create an ecommerce application,
                                        focusing on JavaScript, React, Java, and Spring Boot.
                                        Within hours, our focus aligned, and Shady Shack was born. Here we get to show off
                                        the progress of our coding skills,
                                        whether they have been developed as recently as in the last 8 weeks, over time within a formal education setting,
                                        by using one of the plentiful software development resources on the world wide web, or a unique mix of all the above.
                                        We hope you enjoy the results of our effort and teamwork!
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>That's rad. Can I buy your stuff from you?</Accordion.Header>
                                    <Accordion.Body className='accordion1'>
                                        Turns out, we have no actual stuff for sale. But most of it you can find for sale at <a href='https://www.bestbuy.com'>Best Buy</a>.
                                        Check it out!
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>I think Shady Shack is the best ever and I really want it to be more. Will it ever?</Accordion.Header>
                                    <Accordion.Body className='accordion1'>
                                        One never knows...
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>


                        </Col>
                        <Col>
                            <Image
                                src={shadyAbout}
                                className='img-fluid'
                            />
                        </Col>


                    </Row>



                </Container>



            </div>

        </div>
    </>
}

export default AboutPage