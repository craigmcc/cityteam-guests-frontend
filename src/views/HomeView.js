import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const HomeView = () => {

    return (

        <Container fluid>
            <Row className="justify-content-center ml-4 mr-4 mt-4">
                <Col/>
                <Col className="col-6">
                    <h1>Welcome to the CityTeam Guest Checkin App!</h1>
                    <p/>
                    <p/>
                    <p>
                        At some point, this page (or something like it)
                        will be a login screen, after which anyone logged
                        in will only have access to the information
                        relevant to their defined privileges.
                    </p>
                </Col>
                <Col/>
            </Row>
        </Container>

    );

}

export default HomeView;
