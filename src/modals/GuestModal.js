import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import GuestForm from "../forms/GuestForm";

// guest         Guest to be edited, or null for adding a new object
// handleHide    Handle () for modal being hidden
// handleInsert  Handle (guest) for successful insert [none]
// handleRemove  Handle (guest) for successful remove [none]
// handleUpdate  Handle (guest) for successful update [none]
// show          Show this modal on initial render [false]
const GuestModal = (props) => {

    const [guest] = useState(props.guest);
    const [show, setShow] = useState(props.show);

    let handleHide = () => {
        console.log("GuestModal.handleHide()");
        if (props.handleHide) {
            props.handleHide();
        }
        setShow(false);
    }

    let handleInsert = (inserted) => {
        console.log("GuestModal.handleInsert(" +
            JSON.stringify(inserted, ["id", "name"]) + ")");
        if (props.handleInsert) {
            props.handleInsert(inserted);
        }
    }

    let handleRemove = (removed) => {
        console.log("GuestModal.handleRemove(" +
            JSON.stringify(removed, ["id", "name"]) + ")");
        if (props.handleRemove) {
            props.handleRemove(removed);
        }
    }

    let handleUpdate = (updated) => {
        console.log("GuestModal.handleUpdate(" +
            JSON.stringify(updated, ["id", "name"]) + ")");
        if (props.handleUpdate) {
            props.handleUpdate(updated);
        }
    }

    return (

        <Modal
            animation={false}
            backdrop="static"
            centered
            onHide={handleHide}
            show={show}
            size="lg"
        >

            { (guest) ? (
                <Modal.Header>
                    <Modal.Title>Edit Existing Guest</Modal.Title>
                </Modal.Header>
            ) : (
                <Modal.Header>
                    <Modal.Title>Add New Guest</Modal.Title>
                </Modal.Header>
            )}

            <Modal.Body>
                <GuestForm
                    guest={props.guest}
                    handleInsert={handleInsert}
                    handleRemove={handleRemove}
                    handleUpdate={handleUpdate}
                />
            </Modal.Body>

            <Modal.Footer>
                Press <strong>Esc</strong> to exit with no changes
            </Modal.Footer>

        </Modal>

    );

}

export default GuestModal;
