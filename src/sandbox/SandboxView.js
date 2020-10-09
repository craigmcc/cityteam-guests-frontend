import React, { /* useContext, */ useEffect, useState } from "react";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

// import SandboxModal2 from "./SandboxModal2";

// import FacilityClient from "../clients/FacilityClient";
// import { FacilityContext } from "../contexts/FacilityContext";

const SandboxView = () => {

//    const facilityContext = useContext(FacilityContext);

    const [global] = useState({
        city: "My City",
        firstName: "First Name",
        lastName: "Last Name",
        state: "OR",
        zipCode: "99999",
    });
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    useEffect(() => {
        console.info("SandboxView.useEffect(show1=" + show1 + ")");
        console.info("SandboxView.useEffect(show2=" + show2 + ")");
        console.info("SandboxView.useEffect(show3=" + show3 + ")");
        console.info("SandboxView.useEffect(data=" + JSON.stringify(global, null, 2) + ")");
    }, [global, show1, show2, show3]);

    const handleClose1 = () => {
        console.info("SandboxView.handleClose1()");
        setShow1(false);
    }

    const handleClose2 = () => {
        console.info("SandboxView.handleClose2()");
        setShow2(false);
    }

    const handleClose3 = () => {
        console.info("SandboxView.handleClose3()");
        setShow3(false);
    }

    const handleNext1 = () => {
        console.info("SandboxView.handleNext1()");
        setShow1(false);
        setShow2(true);
    }

    const handleNext2 = () => {
        console.info("SandboxView.handleNext2()");
        setShow2(false);
        setShow3(true);
    }

    const handlePrevious2 = () => {
        console.info("SandboxView.handlePrevious2()");
        setShow1(true);
        setShow2(false);
    }

    const handlePrevious3 = () => {
        console.info("SandboxView.handlePrevious3()");
        setShow2(true);
        setShow3(false);
    }

    const handleShow1 = () => {
        console.info("SandboxView.handleShow1()");
        setShow1(true);
        setShow2(false);
        setShow3(false);
    }

    const handleShow2 = () => {
        console.info("SandboxView.handleShow2()");
        setShow1(false);
        setShow2(true);
        setShow3(false);
    }

    const handleShow3 = () => {
        console.info("SandboxView.handleShow3()");
        setShow1(false);
        setShow2(false);
        setShow3(true);
    }

    return (

        <>

            {/*Basic View*/}

            <Container fluid>

                <Row>
                    <Col>
                        <h4>Sandbox View Header</h4>
                    </Col>
                </Row>

                <Table bordered hover striped>
                    <thead>
                    <tr>
                        <th>Field Name</th>
                        <th>Field Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>First Name:</td>
                        <td>{global.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>{global.lastName}</td>
                    </tr>
                    <tr>
                        <td>City:</td>
                        <td>{global.city}</td>
                    </tr>
                    <tr>
                        <td>State:</td>
                        <td>{global.state}</td>
                    </tr>
                    <tr>
                        <td>Zip Code:</td>
                        <td>{global.zipCode}</td>
                    </tr>
                    </tbody>
                </Table>

                <Row>
                    <Col>
                        <Button
                            className="mr-1"
                            onClick={handleShow1}
                            variant="primary"
                        >
                            Show Modal 1
                        </Button>
                        <Button
                            className="mr-1"
                            onClick={handleShow2}
                            variant="primary"
                        >
                            Show Modal 2
                        </Button>
                        <Button
                            onClick={handleShow3}
                            variant="primary"
                        >
                            Show Modal 3
                        </Button>
                    </Col>
                </Row>

            </Container>

            {/*First Modal*/}
            <Modal
                backdrop="static"
                keyboard={false}
                onHide={handleClose1}
                show={show1}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Sandbox Modal 1</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    This is the body of Sandbox Modal 1
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={handleNext1}
                        variant="primary"
                    >
                        Next
                    </Button>
                </Modal.Footer>

            </Modal>

            {/*Second Modal*/}
{/*
            <SandboxModal2
                data={data}
                handleClose={handleClose2}
                handleNext={handleNext2}
                handlePrevious={handlePrevious2}
                show={show2}
            />
*/}
            <Modal
                backdrop="static"
                keyboard={false}
                onHide={handleClose2}
                show={show2}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Sandbox Modal 2</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    This is the body of Sandbox Modal 2
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={handlePrevious2}
                        variant="primary"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={handleNext2}
                        variant="primary"
                    >
                        Next
                    </Button>
                </Modal.Footer>

            </Modal>

            {/*Third Modal*/}
            <Modal
                backdrop="static"
                keyboard={false}
                onHide={handleClose3}
                show={show3}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Sandbox Modal 3</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    This is the body of Sandbox Modal 3
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={handlePrevious3}
                        variant="primary"
                    >
                        Previous
                    </Button>
                </Modal.Footer>

            </Modal>

        </>

    );

}

export default SandboxView;
