import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import TemplateForm from "../forms/TemplateForm";

// handleHide    Handle () for modal being hidden
// handleInsert  Handle (template) for successful insert [none]
// handleRemove  Handle (template) for successful remove [none]
// handleUpdate  Handle (template) for successful update [none]
// show          Show this modal on initial render [false]
// template      Template to be edited, or null for adding a new object
const TemplateModal = (props) => {

    const [show, setShow] = useState(props.show);
    const [template] = useState(props.template);

    let handleHide = () => {
        console.log("TemplateModal.handleHide()");
        if (props.handleHide) {
            props.handleHide();
        }
        setShow(false);
    }

    let handleInsert = (inserted) => {
        console.log("TemplateModal.handleInsert(" +
            JSON.stringify(inserted, ["id", "name"]) + ")");
        if (props.handleInsert) {
            props.handleInsert(inserted);
        }
    }

    let handleRemove = (removed) => {
        console.log("TemplateModal.handleRemove(" +
            JSON.stringify(removed, ["id", "name"]) + ")");
        if (props.handleRemove) {
            props.handleRemove(removed);
        }
    }

    let handleUpdate = (updated) => {
        console.log("TemplateModal.handleUpdate(" +
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

            { (template) ? (
                <Modal.Header>
                    <Modal.Title>Edit Existing Template</Modal.Title>
                </Modal.Header>
            ) : (
                <Modal.Header>
                    <Modal.Title>Add New Template</Modal.Title>
                </Modal.Header>
            )}

            <Modal.Body>
                <TemplateForm
                    template={props.template}
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

export default TemplateModal;
