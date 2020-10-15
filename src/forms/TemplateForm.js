import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { RemoveButton, ResetButton, SaveButton }
    from "../components/buttons";
import {CheckboxField, TextField, toEmptyStrings, toNullValues}
    from "../components/fields";

import FacilityClient from "../clients/FacilityClient";
import TemplateClient from "../clients/TemplateClient";
import { FacilityContext } from "../contexts/FacilityContext";
import MatsList from "../util/mats.list";

// handleInsert Handle (template) for successful insert
// handleRemove Handle (template) for successful remove
// handleUpdate Handle (template) for successful update
// template     Object containing initial values to display, or null to
//   request a blank form returned by emptyInitialValues() function
const TemplateForm = (props) => {

    const facilityContext = useContext(FacilityContext);

    const [adding] = useState(!props.template);
    const [template, setInitialValues] =
        useState(convertInitialValues(props.template));
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

    useEffect(() => {
        setInitialValues(convertInitialValues(props.template));
    }, [props.template])

    let handleInsert = (inserted) => {
        let data = toNullValues(inserted);
        data.facilityId = facilityContext.selectedFacility.id;
        console.info("TemplateForm.handleInsert(" +
            JSON.stringify(data, ["id", "name"]) + ")");
        TemplateClient.insert(data)
            .then(response => {
                if (props.handleInsert) {
                    props.handleInsert(response.data);
                }
            })
            .catch(err => {
                console.error("TemplateForm.insert() error: ", err);
                alert(`TemplateForm.insert() error: '${err.message}'`);
            })
    }

    let handleRemove = () => {
        console.info("TemplateForm.handleRemove(id=" + template.id + ")");
        TemplateClient.remove(template.id)
            .then((response) => {
                if (props.handleRemove) {
                    props.handleRemove(response.data);
                }
            })
            .catch(err => {
                console.error("TemplateForm.remove() error: ", err);
                alert(`TemplateForm.remove() error: '${err.message}'`);
            })
    }

    let handleRemoveConfirm = () => {
        console.info("TemplateForm.handleRemoveConfirm()");
        setShowRemoveConfirm(true);
    }

    let handleRemoveConfirmNegative = () => {
        console.info("TemplateForm.handleRemoveConfirmNegative()");
        setShowRemoveConfirm(false);
    }

    let handleRemoveConfirmPositive = () => {
        console.info("TemplateForm.handleRemoveConfirmPositive()");
        setShowRemoveConfirm(false);
        handleRemove();
    }

    let handleSubmit = (values, actions) => {
        actions.setSubmitting(true);
        if (values.id > 0) {
            handleUpdate(values);
        } else {
            handleInsert(values);
        }
        actions.setSubmitting(false);
    }

    let handleUpdate = (updated) => {
        let data = toNullValues(updated);
        data.facilityId = facilityContext.selectedFacility.id;
        console.info("TemplateForm.handleUpdate(" +
            JSON.stringify(data, ["id", "name"]) + ")");
        TemplateClient.update(data.id, data)
            .then(response => {
                if (props.handleUpdate) {
                    props.handleUpdate(response.data);
                }
            })
            .catch(err => {
                console.error("TemplateForm.update() error: ", err);
                alert(`TemplateForm.update() error: '${err.message}'`);
            })
    }

    let validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string()
                .required("Name is required")
                .test("unique-name",
                    "That name is already in use within this facility",
                    (value) => validateUniqueName(value,
                        facilityContext.selectedFacility.id,
                        template.id)),
            comments: Yup.string(),
            allMats: Yup.string()
                .required("All Mats list is required")
                .test("valid-all-mats",
                    "Invalid All Mats list format",
                    (value) => validateMatsList(value)),
            handicapMats: Yup.string()
                .test("valid-handicap-mats",
                    "Invalid Handicap Mats list format",
                    (value) => validateMatsList(value))
                .test("handicap-mats-subset",
                    "Handicap Mats must be a subset of All Mats",
                    function (value) {
                        return validateMatsSubset(value, this.parent.allMats);
                    }),
            socketMats: Yup.string()
                .test("valid-socket-mats",
                    "Invalid Socket Mats list format",
                    (value) => validateMatsList(value))
                .test("socket-mats-subset",
                    "Socket Mats must be a subset of All Mats",
                    function (value) {
                        return validateMatsSubset(value, this.parent.allMats);
                    }),
        })
    }

    return (

        <>

            {/* Details Form */}
            <Formik
                // enableReinitialize
                initialValues={template}
                onSubmit={(values, actions) => {
                    handleSubmit(values, actions);
                }}
                validateOnChange={false}
                validationSchema={validationSchema}
            >

                <Form className="form mr-2">

                    <TextField autoFocus label="Name:" name="name"/>
                    <CheckboxField label="Active?" name="active"/>
                    <TextField label="Comments:" name="comments"/>
                    <TextField label="All Mats:" name="allMats"/>
                    <TextField label="Handicap Mats:" name="handicapMats"/>
                    <TextField label="Socket Mats:" name="socketMats"/>

                    <div className="row">
                        <div className="col-2"/>
                        <div className="col-8">
                            <SaveButton/>
                            <ResetButton/>
                        </div>
                        <div className="col-2 float-right">
                            <RemoveButton
                                disabled={adding}
                                onClick={handleRemoveConfirm}/>
                        </div>
                    </div>

                </Form>

            </Formik>

            {/* Remove Confirm Modal */}
            <Modal
                animation={false}
                backdrop="static"
                centered
                dialogClassName="bg-danger"
                onHide={handleRemoveConfirmNegative}
                show={showRemoveConfirm}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>WARNING:  Potential Data Loss</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Removing this Template not reversible, and will
                        eliminate the possibility of using it for setting up
                        future date registrations.
                    </p>
                    <p>Consider marking this Template as inactive instead.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={handleRemoveConfirmPositive}
                        variant="danger"
                    >
                        Remove
                    </Button>
                    <Button
                        onClick={handleRemoveConfirmNegative}
                        variant="primary"
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    );

}

let convertInitialValues = (template) => {
    return template
        ? toEmptyStrings(template)
        : toEmptyStrings(emptyInitialValues());
}

let emptyInitialValues = () => {
    return {
        id: -1,
        active: true,
        allMats: "",
        comments: "",
        facilityId: -1,
        handicapMats: "",
        name: "",
        socketMats: ""
    }
}

let validateMatsList = (value) => {
    if (!value || (value.length === 0)) {
        return true;
    }
    try {
        new MatsList(value);
        return true;
    } catch (error) {
        return false;
    }
}

let validateMatsSubset = (value, allMats) => {
    // value is not required (use required() ahead of this
    // in the chain if it is)
    if (!value || (value.length === 0)) {
        return true;
    }
    // allMats must already have a value
    if (!allMats || (allMats.length === 0)) {
        return false;
    }
    let allMatsObject;
    try {
        allMatsObject = new MatsList(allMats);
    } catch {
        // allMats is not valid, so we cannot be a subset
        return false;
    }
    let thisMatsObject;
    try {
        thisMatsObject = new MatsList(value);
        return thisMatsObject.isSubsetOf(allMatsObject);
    } catch {
        // This value is not valid, so it cannot be a subset
        return false;
    }
}

let validateUniqueName = (value, facilityId, id) => {
    return new Promise((resolve) => {
        FacilityClient.templateExact(facilityId, value)
            .then(response => {
                // Exists but OK if it is this item
                resolve(id === response.data.id);
            })
            .catch(() => {
                // Does not exist, so definitely unique
                resolve(true);
            })
    })
}

export default TemplateForm;
