import React from "react";
import { CancelButton, SaveButton } from "../components/buttons";
import { ErrorMessage, Field, Form, Formik } from "formik";

// initialValues Object containing initial values to display, or null to
//   request a blank form returned by internal initialValues() function
// onCancel Handler () called if Cancel button is clicked
// onSave Handler (object) with entered form values if Save button is clicked
const FacilityForm = (props) => {

    let displayValues = props.initialValues
        ? props.initialValues
        : initialValues();
//    alert("initialValues: " + JSON.stringify(displayValues, null, 2));

    return (

        <Formik
            initialValues={displayValues}
            onSubmit={async values => {
                await new Promise(resolve => setTimeout(resolve, 500));
                alert("submitValues: " + JSON.stringify(values, null, 2))
            }}
        >

            <Form className="form">

                <div class="form-group">
                    <div class="row">
                        <label class="col-2" htmlFor="name">Name:</label>
                        <Field
                            className="col-10"
                            id="name"
                            name="name"
                            type="text"
                        />
                    </div>
                    <div class="row">
                        <ErrorMessage
                            className="col alert alert-danger" name="name"/>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row">
                        <label class="col-2" htmlFor="name">Address:</label>
                        <Field
                            className="col-10"
                            id="address1"
                            name="address1"
                            type="text"
                        />
                    </div>
                    <div class="row">
                        <ErrorMessage
                            className="col alert alert-danger" name="address1"/>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row">
                        <label class="col-2" htmlFor="address2"></label>
                        <Field
                            className="col-10"
                            id="address2"
                            name="address2"
                            type="text"
                        />
                    </div>
                    <div class="row">
                        <ErrorMessage
                            className="col alert alert-danger" name="address2"/>
                    </div>
                </div>

                <div class="form-row">

                    <div class="row form-group">
                        <label class="col-2" htmlFor="city">City:</label>
                        <Field
                            className="col-4"
                            id="city"
                            name="city"
                            type="text"
                        />
                        <label class="col-1" htmlFor="state">St:</label>
                        <Field
                            className="col-2"
                            id="state"
                            name="state"
                            type="text"
                        />
                        <label class="col-1" htmlFor="zipCode">Zip:</label>
                        <Field
                            className="col-2"
                            id="zipCode"
                            name="zipCode"
                            type="text"
                        />
                    </div>

                </div>

                <div class="row">
                    <ErrorMessage
                        className="col alert alert-danger" name="city"/>
                </div>
                <div class="row">
                    <ErrorMessage
                        className="col alert alert-danger" name="state"/>
                </div>
                <div class="row">
                    <ErrorMessage
                        className="col alert alert-danger" name="zipCode"/>
                </div>

                <div class="form-group">
                    <div class="row">
                        <label class="col-2" htmlFor="email">Email:</label>
                        <Field
                            className="col-10"
                            id="email"
                            name="email"
                            type="email"
                        />
                    </div>
                    <div class="row">
                        <ErrorMessage
                            className="col alert alert-danger" name="email"/>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row">
                        <label class="col-2" htmlFor="phone">Phone:</label>
                        <Field
                            className="col-10"
                            id="phone"
                            name="phone"
                            type="text"
                        />
                    </div>
                    <div class="row">
                        <ErrorMessage
                            className="col alert alert-danger" name="phone"/>
                    </div>
                </div>

                <div class="row">
                    <div class="col-2"></div>
                    <SaveButton onClick={props.onSave} />
                    <CancelButton onClick={props.inCancel} />
                </div>

            </Form>

        </Formik>

    );

}

const initialValues = () => {
    return {
        id: null,
        address1: "",
        address2: "",
        city: "",
        email: "",
        name: "",
        phone: "",
        state: "",
        zipCode: ""
    }
}

export default FacilityForm;
