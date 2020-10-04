import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import FacilityClient from "../clients/FacilityClient";
import GuestClient from "../clients/GuestClient";
import { TextField, toEmptyStrings, toNullValues }
    from "../components/fields";
import { RemoveButton, ResetButton, SaveButton }
    from "../components/buttons";
import { FacilityContext } from "../contexts/FacilityContext";

// guest        Guest to be edited, or null for adding a new object
// handleInsert Handle (guest) for successful insert
// handleRemove Handle (guest) for successful remove
// handleUpdate Handle (guest) for successful insert or update
const GuestForm = (props) => {

    const facilityContext = useContext(FacilityContext);

    const [adding] =
        useState(!props.guest);
    const [guest, setGuest] =
        useState(convertInitialValues(props.guest));
    const [messageText, setMessageText] =
        useState(null);
    const [messageType, setMessageType] =
        useState("info");

    useEffect(() => {
        setGuest(convertInitialValues(props.guest));
        setMessageText(null);
        setMessageType("info");
    }, [props.guest])

    let handleInsert = (inserted) => {
        let data = toNullValues(inserted);
        data.facilityId = facilityContext.selectedFacility.id;
        setMessageText("Inserting ...");
        setMessageType("info");
        console.log("GuestForm.handleInsert(" +
            JSON.stringify(data, ["id", "firstName", "lastName"]) + ")");
        GuestClient.insert(data)
            .then(response => {
                setMessageText("Insert complete");
                if (props.handleInsert) {
                    props.handleInsert(response.data);
                }
            })
            .catch(error => {
                setMessageText("Insert error: " +
                    JSON.stringify(error, null, 2));
                setMessageType("danger");
            })
    }

    let handleRemove = () => {
        console.log("GuestForm.handleRemove(" +
            JSON.stringify(guest,
                ["id", "firstName", "lastName"]) + ")");
        // TODO - confirm dialog?
        setMessageText("Removing ...");
        setMessageType("info");
        GuestClient.remove(guest.id)
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
        setMessageText("Updating ...");
        setMessageType("info");
        console.log("GuestForm.handleUpdate(" +
            JSON.stringify(data, ["id", "firstName", "lastName"]) + ")");
        GuestClient.update(data.id, data)
            .then(response => {
                setMessageText("Update complete");
                if (props.handleUpdate) {
                    props.handleUpdate(response.data);
                }
            })
            .catch(error => {
                setMessageText("Update error: " +
                    JSON.stringify(error, null, 2));
                setMessageType("danger");
            })
    }

    let validationSchema = () => {
        return Yup.object().shape({
            firstName: Yup.string()
                .required("First Name is required"),
            lastName: Yup.string()
                .required("Last Name is required")
                .test("unique-name",
                    "That name is already in use within this facility",
                    function (value) {
                        return validateUniqueName(value,
                            this.parent.firstName,
                            facilityContext.selectedFacility.id,
                            guest.id)
                    }),
            comments: Yup.string()
        });
    }

    return (

        <Formik
            // enableReinitialize
            initialValues={guest}
            onSubmit={(values, actions) => {
                handleSubmit(values, actions);
            }}
            validateOnChange={false}
            validationSchema={validationSchema}
        >

            <Form className="form mr-2">

                <div className="form-row mb-1">
                    <div className="col-3"/>
                    <div className="col-9">
                        <h4>Guest Details</h4>
                    </div>
                </div>

                <TextField
                    autoFocus
                    fieldClassName="col-9"
                    label="First Name:"
                    labelClassName="col-3"
                    name="firstName"/>
                <TextField
                    fieldClassName="col-9"
                    label="Last Name:"
                    labelClassName="col-3"
                    name="lastName"/>
                <TextField
                    fieldClassName="col-9"
                    label="Comments:"
                    labelClassName="col-3"
                    name="comments"/>

                <div className="row">
                    <div className="col-3"/>
                    <div className="col-7">
                        <SaveButton/>
                        <ResetButton/>
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

    )

}

let convertInitialValues = (guest) => {
    return guest
        ? toEmptyStrings(guest)
        : toEmptyStrings(emptyInitialValues());
}

let emptyInitialValues = () => {
    return {
        id: -1,
        comments: "",
        facilityId: -1,
        firstName: "",
        lastName: "",
    }
}

let validateUniqueName = (value, firstName, facilityId, id) => {
    console.log("GuestForm.validateUniqueName(lastName=" + value +
        ", firstName=" + firstName + ", facilityId=" + facilityId + ", id=" + id + ")");
    return new Promise((resolve) => {
        FacilityClient.guestExact(facilityId, firstName, value)
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

export default GuestForm;
