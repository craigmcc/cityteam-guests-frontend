import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import FacilityForm from "../forms/FacilityForm";

// facility      The facility to be edited, or null for adding a new object
// handleHide    Handle () for modal being hidden
// handleInsert  Handle (facility) for successful insert [none]
// handleRemove  Handle (facility) for successful remove [none]
// handleUpdate  Handle (facility) for successful update [none]
// show          Show this modal on initial render [false]
const FacilityModal = (props) => {

    const [facility] = useState(props.facility);
    const [show, setShow] = useState(props.show);

    let handleHide = () => {
        console.log("FacilityModal.handleHide()");
        if (props.handleHide) {
            props.handleHide();
        }
        setShow(false);
    }

    let handleInsert = (inserted) => {
        console.log("FacilityModal.handleInsert(" +
            JSON.stringify(inserted, ["id", "name"]) + ")");
        if (props.handleInsert) {
            props.handleInsert(inserted);
        }
    }

    let handleRemove = (removed) => {
        console.log("FacilityModal.handleRemove(" +
            JSON.stringify(removed, ["id", "name"]) + ")");
        if (props.handleRemove) {
            props.handleRemove(removed);
        }
    }

    let handleUpdate = (updated) => {
        console.log("FacilityModal.handleUpdate(" +
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

            { (facility) ? (
                <Modal.Header>
                    <Modal.Title>Edit Existing Facility</Modal.Title>
                </Modal.Header>
            ) : (
                <Modal.Header closeButton>
                    <Modal.Title>Add New Facility</Modal.Title>
                </Modal.Header>
            )}

            <Modal.Body>
                <FacilityForm
                    facility={props.facility}
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

export default FacilityModal;
