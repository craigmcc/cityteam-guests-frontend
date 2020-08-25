import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { TextField, toEmptyStrings, toNullValues }
    from "../components/fields";
import { CancelButton, RemoveButton, SaveButton }
    from "../components/buttons";

import FacilityClient from "../clients/FacilityClient";
import TemplateClient from "../clients/TemplateClient";
import MatsList from "../util/mats.list";

// handleRemove Handle (template) for successful remove
// handleSave Handle (template) for successful insert or update
// initialValues Object containing initial values to display, or null to
//   request a blank form returned by internal initialValues() function
// selectedFacility Currently selected facility
const TemplateForm = (props) => {

    const [adding] =
        useState(!props.initialValues);
    const [initialValues, setInitialValues] =
        useState(convertInitialValues(props.initialValues));
    const [messageText, setMessageText] =
        useState(null);
    const [messageType, setMessageType] =
        useState("info");
    const [selectedFacility] =
        useState(props.selectedFacility);

    useEffect(() => {
        setInitialValues(convertInitialValues(props.initialValues));
        setMessageText(null);
        setMessageType("info");
    }, [props.initialValues])

    let handleRemove = () => {
        console.log("TemplateForm.handleRemove(id=" + initialValues.id + ")");
        // TODO - confirm dialog?
        setMessageText("Removing ...");
        setMessageType("info");
        TemplateClient.remove(initialValues.id)
            .then((response) => {
                setMessageText("Remove complete");
                if (props.handleRemove) {
                    props.handleRemove(response.data);
                }
            })
            .catch(error => {
                setMessageText("Remove error: " +
                    JSON.stringify(error, null, 2));
                setMessageType("danger");
            })
    }

    let handleSubmit = (values, actions) => {
        actions.setSubmitting(true);
        let data = toNullValues(values);
        data.facilityId = selectedFacility.id;
//                alert("Submitting: " + JSON.stringify(data, null, 2));
        setMessageType("info");
        if (data.id > 0) {
            setMessageText("Updating ...");
            TemplateClient.update(data.id, data)
                .then(response => {
                    setMessageText("Update complete");
                    if (props.handleSave) {
                        props.handleSave(response.data);
                    }
                })
                .catch(error => {
                    setMessageText("Update error: " +
                        JSON.stringify(error, null, 2));
                    setMessageType("danger");
                })
        } else {
            setMessageText("Inserting ...");
            TemplateClient.insert(data)
                .then(response => {
                    setMessageText("Insert complete");
                    if (props.handleSave) {
                        props.handleSave(response.data);
                    }
                })
                .catch(error => {
                    setMessageText("Insert error: " +
                        JSON.stringify(error, null, 2));
                    setMessageType("danger");
                })
        }
        actions.setSubmitting(false);
    }

    let validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string()
                .required("Name is required")
                .test("unique-name",
                    "That name is already in use within this facility",
                    (value) => validateUniqueName(value,
                        selectedFacility.id,
                        initialValues.id)),
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
                        let { allMats } = this.parent;
                        return validateMatsSubset(value, allMats);
                    }),
/*
                    function(item) {
                        return validateMatsSubset(this.parent.handicapMats,
                            this.parent.allMats);
                    }),
*/
            socketMats: Yup.string()
                .test("valid-socket-mats",
                    "Invalid Socket Mats list format",
                    (value) => validateMatsList(value))
                .test("socket-mats-subset",
                    "Socket Mats must be a subset of All Mats",
                    function (value) {
                        let { allMats } = this.parent;
                        return validateMatsSubset(value, allMats);
                    }),
/*
                    function(item) {
                        return validateMatsSubset(this.parent.socketMats,
                            this.parent.allMats);
                    }),
*/
        })
    }

    return (

        <Formik
            enableReinitialize
            initialValues={initialValues}
            // key={JSON.stringify(initialValues.id)}
            onSubmit={(values, actions) => {
                handleSubmit(values, actions);
            }}
            validateOnChange={false}
            validationSchema={validationSchema}
        >

            <Form className="form">

                <div className="form-row mb-1">
                    <div className="col-2"/>
                    <div className="col-10">
                        <h4>Template Details</h4>
                    </div>
                </div>

                <TextField autoFocus label="Name:" name="name"/>
                <TextField label="Comments:" name="comments"/>
                <TextField label="All Mats:" name="allMats"/>
                <TextField label="Handicap Mats:" name="handicapMats"/>
                <TextField label="Socket Mats:" name="socketMats"/>

                <div className="row">
                    <div className="col-2"/>
                    <div className="col-8">
                        <SaveButton/>
                        <CancelButton/>
                    </div>
                    <div className="col-2 float-right">
                        <RemoveButton
                            disabled={adding}
                            onClick={handleRemove}/>
                    </div>
                </div>

                { (messageText) ? (
                    <div className="row mt-1">
                        <div className="col-2"/>
                        <div className={"alert alert-" + messageType}>
                            {messageText}
                        </div>
                    </div>
                ) : (
                    <div/>
                )}

            </Form>

        </Formik>

    );

}

const convertInitialValues = (initialValues) => {
    return initialValues
        ? toEmptyStrings(initialValues)
        : toEmptyStrings(emptyInitialValues());
}

let emptyInitialValues = () => {
    return {
        id: -1,
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
    console.log("validateMatsSubset(" + value + ", " + allMats + ")");
    // value is not required (use required() ahead of this
    // in the chain if it is)
    if (!value || (value.length === 0)) {
        console.log("  this value is blank, so true");
        return true;
    }
    // allMats must already have a value
    if (!allMats || (allMats.length === 0)) {
        console.log("  allMats is blank, so false");
        return false;
    }
    let allMatsObject;
    try {
        allMatsObject = new MatsList(allMats);
    } catch {
        console.log("  allMats is not valid, so false");
        // allMats is not valid, so we cannot be a subset
        return false;
    }
    let thisMatsObject;
    try {
        thisMatsObject = new MatsList(value);
        let result = thisMatsObject.isSubsetOf(allMatsObject);
        console.log("  both are valid, result is " + result);
        return result;
    } catch {
        console.log("  this value is not valid, so false")
        // This value is not valid, so we cannot be a subset
        return false;
    }
}

let validateUniqueName = (value, facilityId, id) => {
    return new Promise((resolve) => {
        FacilityClient.findTemplatesByNameExact(facilityId, value)
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
