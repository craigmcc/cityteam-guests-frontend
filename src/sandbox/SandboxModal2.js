import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// data           Data bag for our modals
// handleClose    Handler for modal closing
// handleNext     Handler for next button
// handlePrevious Handler for previous button
// show           Flag for whether we should show this modal or not
const SandboxModal2 = (props) => {

    const [data] = useState(props.data);
    const [show] = useState(props.show);

    useEffect(() => {
        console.info("SandboxModal2.useEffect(show=" + show + ")");
        console.info("SandboxView.useEffect(data=" +
            JSON.stringify(data, null, 2) + ")");
    }, [data, show]);

/**/    const handleClose = () => {
        console.info("SandboxModal2.handleClose()");
        if (props.handleClose) {
            props.handleClose();
        }
    }

    const handleNext = () => {
        console.info("SandboxModal2.handleNext()");
        if (props.handleNext) {
            props.handleNext();
        }
    }

    const handlePrevious = () => {
        console.info("SandboxModal2.handlePrevious()");
        if (props.handlePrevious) {
            props.handlePrevious();
        }
    }

    return (

        <Modal
            backdrop="static"
            keyboard={false}
            onHide={handleClose}
            show={show}
        >

            <Modal.Header closeButton>
                <Modal.Title>Sandbox Modal 2</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                This is the body of Sandbox Modal 2
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={handlePrevious}
                    variant="primary"
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNext}
                    variant="primary"
                >
                    Next
                </Button>
            </Modal.Footer>

        </Modal>

    );

};

export default SandboxModal2;
