import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import FacilityClient from "../clients/FacilityClient";
import RegistrationClient from "../clients/RegistrationClient";
import TemplateClient from "../clients/TemplateClient";
import {toEmptyStrings, withFlattenedObjects} from "../components/fields";
import List from "../components/List";
import Pagination from "../components/Pagination";
import RegistrationDateSelector from "../components/RegistrationDateSelector";
import SearchBar from "../components/SearchBar";
import TemplateSelector from "../components/TemplateSelector";
import { FacilityContext } from "../contexts/FacilityContext";
import AssignForm from "../forms/AssignForm";

const RegistrationView = () => {

    // Support Global State --------------------------------------------------

    const facilityContext = useContext(FacilityContext);

    useEffect(() => {
        retrieveAllRegistrations(registrationDate);
        // eslint-disable-next-line
    }, [facilityContext.selectedFacility])

    const [registration, setRegistration] = useState(null);

    // Support for List View -------------------------------------------------

    const [registrationDate, setRegistrationDate] =
        useState((new Date()).toISOString().slice(0,10));
    const [registrations, setRegistrations] = useState([]);
    const [registrationsIndex, setRegistrationsIndex] = useState(-1);

    const extractAssign = (registration) => {
        return {
            id: registration.id,
            comments: registration.comments,
            guestId: registration.guestId,
            paymentAmount: registration.paymentAmount,
            paymentType: registration.paymentType,
            showerTime: registration.showerTime,
            wakeupTime: registration.wakeupTime
        }
    }

    const flattenedRegistrations = (registrations) => {
        let flattenedItems =
            withFlattenedObjects(registrations, "guest");
        for (let flattenedItem of flattenedItems) {
            flattenedItem.matNumberAndFeatures = "" + flattenedItem.matNumber;
            if (flattenedItem.features) {
                flattenedItem.matNumberAndFeatures += flattenedItem.features;
            }
        }
        return flattenedItems;
    }

    const handleGenerate = (template) => {
        console.info("RegistrationView.handleGenerate for (" +
            JSON.stringify(template, ["id", "name"]) + ")");
        TemplateClient.generate(template.id, registrationDate)
            .then(response => {
                console.info("RegistrationView.handleGenerate got (" +
                    JSON.stringify(response.data, ["id", "matNumber", "features"]) + ")");
                setRegistrations(flattenedRegistrations(response.data));
                setRegistrationsIndex(-1);
            })
    }

    const handleRegistrationDate = (newRegistrationDate) => {
        console.info("RegistrationView.handleRegistrationDate(" +
            newRegistrationDate + ")");
        setRegistrationDate(newRegistrationDate);
        retrieveAllRegistrations(newRegistrationDate);
    }

    const handleSelectedItem = (newIndex) => {
        if (newIndex === registrationsIndex) {
            console.info("RegistrationView.handleSelectedItem(-1)");
            setRegistrationsIndex(-1);
            setAssign(null);
            setRegistration(false);
            setShowAssigned(false);
            setShowUnassigned(false);
        } else {
            console.info("RegistrationView.handleSelectedItem(" + newIndex + ", " +
                JSON.stringify(registrations[newIndex], ["id", "guest.firstName", "guest.lastName"]) + ")");
            setRegistrationsIndex(newIndex);
            setRegistration(registrations[newIndex]);
            if (registrations[newIndex].guestId) {
                retrieveAvailableRegistrations(registrationDate);
                setAssign(toEmptyStrings(extractAssign(registrations[newIndex])));
                setEmptyRegistrationId(-1);
                setShowAssigned(true);
            } else {
                setShowUnassigned(true);
            }
        }
    }

    const retrieveAllRegistrations = (newRegistrationDate) => {
        if (facilityContext.selectedFacility.id <= 0) {
            setRegistrations([]);
            setRegistrationsIndex(-1);
            return;
        }
        FacilityClient.registrationDate(
            facilityContext.selectedFacility.id,
            newRegistrationDate,
            { withGuest: "" }
        )
            .then(response => {
                console.info("RegistrationView.retrieveAllRegistrations(" +
                    JSON.stringify(response.data, ["id", "matNumber", "features", "guest"]) + ")");
                setRegistrations(flattenedRegistrations(response.data));
                setRegistrationsIndex(-1);
            })
            .catch(err => {
                console.error("RegistrationView.retrieveAllRegistrations() error: ", err);
                alert(`RegistrationView.retrieveAllRegistrations() error: '${err.message}'`);
            })
    }

    // Support for Assigned Modal --------------------------------------------

    const [assign, setAssign] = useState(null);
    const [availables, setAvailables] = useState([]);
    const [emptyRegistrationId, setEmptyRegistrationId] = useState(-1);
    const [showAssigned, setShowAssigned] = useState(false);

    const handleEmptyChange = (event) => {
        console.info("RegistrationView.handleEmptyChange(" + event.target.value + ")");
        setEmptyRegistrationId(event.target.value);
    }

    const handleHideAssigned = () => {
        console.info("RegistrationView.handleHideAssigned()");
        setShowAssigned(false);
        setAvailables([]);
        retrieveAllRegistrations(registrationDate);
    }

    const handleRegistrationDeassign = () => {
        console.info("RegistrationView.handleRegistrationDeassign(" +
            registration.id + ")");
        // Perform the required database transaction
        RegistrationClient.deassign(registration.id)
            .then(response => {
                setEmptyRegistrationId(-1);
                retrieveAllRegistrations(registrationDate);
            })
            .catch(err => {
                console.error("RegistrationView.handleRegistrationDeassign() error: ", err);
                alert(`RegistrationView.handleRegistrationDeassign() error: '${err.message}'`);
            })
        handleHideAssigned();
    }

    const handleRegistrationReassign = () => {
        console.info("RegistrationView.handleRegistrationReassign(" +
            JSON.stringify(registration) + ", " + emptyRegistrationId + ")");
        // Perform the required database transaction
        RegistrationClient.reassign(registration.id, emptyRegistrationId)
            .then(response => {
                setEmptyRegistrationId(-1);
                retrieveAllRegistrations(registrationDate);
            })
            .catch(err => {
                console.error("RegistrationView.handleRegistrationReassign() error: ", err);
                alert(`RegistrationView.handleRegistrationReassign() error: '${err.message}'`);
            })
        handleHideAssigned();
    }

    const handleRegistrationUpdate = (newRegistration) => {
        console.info("RegistrationView.handleRegistrationUpdate(" +
            JSON.stringify(newRegistration) + ")");
        // Database transaction has already occurred
        retrieveAllRegistrations(registrationDate);
        handleHideAssigned();
    }

    const retrieveAvailableRegistrations = (newRegistrationDate) => {
        console.info("RegistrationView.retrieveAllRegistrations(" + facilityContext.selectedFacility.id + ", " + registrationDate + ")");
        FacilityClient.registrationAvailable(
            facilityContext.selectedFacility.id,
            newRegistrationDate,
            { withGuest: "" }
        )
            .then(response => {
                console.info("RegistrationView.retrieveAvailableRegistrations(" +
                    JSON.stringify(response.data, ["id", "matNumberAndFeatures"]) + ")");
                setAvailables(flattenedRegistrations(response.data));
            })
            .catch(err => {
                console.error("RegistrationView.retrieveAvailableRegistrations() error: ", err);
                alert(`RegistrationView.retrieveAvailableRegistrations() error: '${err.message}'`);
            })
    }

    // Support for Deassign Confirm Modal ------------------------------------

    const [showDeassignConfirm, setShowDeassignConfirm] = useState(false);

    const handleDeassignConfirm = () => {
        console.info("RegistrationView.handleDeassignConfirm()");
        setShowDeassignConfirm(true);
    }

    const handleDeassignConfirmNegative = () => {
        console.info("RegistrationView.handleDeassignConfirmNegative()");
        setShowDeassignConfirm(false);
    }

    const handleDeassignConfirmPositive = () => {
        console.info("RegistrationView.handleDeassignConfirmPositive()");
        setShowDeassignConfirm(false);
        handleRegistrationDeassign();
    }

    // Support for Unassigned Modal ------------------------------------------

    const [currentPage, setCurrentPage] = useState(1);
    const [guest, setGuest] = useState(null);
    const [guests, setGuests] = useState([]);
    const [guestsIndex, setGuestsIndex] = useState(-1);
    const [pageSize] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [showUnassigned, setShowUnassigned] = useState(false);

    const handleAddGuest = () => {
        console.info("RegistrationView.handleAddGuest()");
        // TODO - Add button on Unassigned Modal was just clicked
    }

    const handleHideUnassigned = () => {
        console.info("RegistrationView.handleHideUnassigned()");
        setShowUnassigned(false);
        retrieveAllRegistrations(registrationDate);
    }

    const handlePageNext = () => {
        console.info("RegistrationView.handlePageNext()");
        let newCurrentPage = currentPage + 1;
        setCurrentPage(newCurrentPage);
        retrieveMatchingGuests(searchText, newCurrentPage);
    }

    const handlePagePrevious = () => {
        console.info("RegistrationView.handlePagePrevious()");
        let newCurrentPage = currentPage - 1;
        setCurrentPage(newCurrentPage);
        retrieveMatchingGuests(searchText, newCurrentPage);
    }

    const handleSearchChange = (event) => {
        console.info("RegistrationView.handleSearchChange(" +
            event.target.value + ")");
        setCurrentPage(1);
        setSearchText(event.target.value);
        retrieveMatchingGuests(event.target.value, 1);
    }

    const handleSelectedGuest = (newIndex) => {
        if (newIndex === guestsIndex) {
            console.info("RegistrationView.handleSelectedGuest(-1)");
            setGuest(null);
            setGuestsIndex(-1);
        } else {
            console.info("RegistrationView.handleSelectedGuest(" + newIndex + ", " +
                JSON.stringify(guests[newIndex], ["id", "firstName", "lastName"]) + ")");
            setGuest(guests[newIndex]);
            setGuestsIndex(newIndex);
            alert("Selected Guest: " + JSON.stringify(guests[newIndex]));
            // TODO - Create assign, save new guestId, go on to details
            // TODO - verify this guest is not already assigned in this date
            // TODO - (same verification if add is selected)
        }
    }

    const retrieveMatchingGuests = (newSearchText, newCurrentPage) => {
        console.info("RegistrationView.retrieveMatchingGuests for(" +
            newSearchText + ", " + newCurrentPage + ")");
        if ("" === newSearchText) {
            setGuests([]);
            return;
        }
        FacilityClient.guestName(facilityContext.selectedFacility.id,
            newSearchText,
            {
                limit: pageSize,
                offset: (pageSize * (newCurrentPage - 1))
            })
            .then(response => {
                console.log("RegistrationView.retrieveMatchingGuests got(" +
                    JSON.stringify(response.data,
                        ["id", "firstName", "lastName"]) +
                    ", " + newSearchText + ")");
                setGuests(response.data);
                setGuestsIndex(-1);
            })
            .catch(err => {
                console.error("RegistrationView.retrieveMatchingGuests() error: ", err);
                alert(`RegistrationView.retrieveMatchingGuests() error: '${err.message}'`);
            });
    }

    // Returned Component Trees ----------------------------------------------

    return (

        <>

{/* List View ------------------------------------------------------------ */}

            <Container fluid>

                <Row className="row mt-3 mb-3">
                    <Col className="col-6">
                        <strong>Registrations for {facilityContext.selectedFacility.name}</strong>
                    </Col>
                    <Col className="col-5">
                        <RegistrationDateSelector
                            handleRegistrationDate={handleRegistrationDate}
                            registrationDate={registrationDate}
                        />
                    </Col>
                </Row>

                { (registrations.length === 0) ? (
                    <Row className="mb-2 ml-1">
                        <Col className="col-6 ml-2">
                            <TemplateSelector
                                actionLabel="Generate"
                                handleTemplate={handleGenerate}
                            />
                        </Col>
                    </Row>
                ) : (
                    <span/>
                )}

                <Row>
                    <Col>
                        <List
                            fields={["matNumberAndFeatures", "guest.firstName",
                                "guest.lastName", "paymentType", "paymentAmount",
                                "showerTime", "wakeupTime", "comments"]}
                            handleSelect={handleSelectedItem}
                            headers={["Mat", "First Name",
                                "Last Name", "$$", "Amount",
                                "Shower", "Wakeup", "Comments"]}
                            index={registrationsIndex}
                            items={registrations}
                        />
                    </Col>
                </Row>

                <Row className="ml-1">
                    Click on a row to create a new, or manage an existing,
                    assignment for that mat.
                </Row>

{/* Assigned Modal ------------------------------------------------------- */}

                <Modal
                    animation={false}
                    backdrop="static"
                    centered
                    onHide={handleHideAssigned}
                    show={showAssigned}
                    size="lg"
                >

                    <Modal.Header closeButton>
                        <Modal.Title>Manage Assigned Mat</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Container className="ml-1">

                            <Row>
                                <Col className="col-12">
                                    { (registration && registration.guest) ? (
                                        <>
                                        <Row className="col-12 justify-content-center">
                                            Facility:&nbsp;
                                            <span className="text-info">{facilityContext.selectedFacility.name}</span>
                                            &nbsp;&nbsp;&nbsp;
                                            Date:&nbsp;
                                            <span className="text-info">{registration.registrationDate}</span>
                                            &nbsp;&nbsp;&nbsp;
                                            Mat Number:&nbsp;
                                            <span className="text-info">{registration.matNumberAndFeatures}</span>
                                        </Row>
                                        <Row className="col-12 justify-content-center">
                                            Guest:&nbsp;
                                            <span className="text-info">{registration.guest.firstName} {registration.guest.lastName}</span>
                                        </Row>
                                        </>
                                    ) : (
                                        <span>No registration???</span>
                                    )}
                                </Col>
                            </Row>
                            <hr/>

                            <Row className="mb-1">
                                <h5>Option 1: Edit Assignment Details:</h5>
                            </Row>
                            <Row className="ml-1">
                                <Col className="col-12">
                                    { (registration) ? (
                                            <Row>
                                                <AssignForm
                                                    assign={assign}
                                                    handleAssign={handleRegistrationUpdate}
                                                />
                                            </Row>
                                    ) : (
                                        <span>No registration???</span>
                                    )}
                                </Col>
                            </Row>
                            <hr/>

                            <Row className="mb-1">
                                <h5>Option 2: Move Guest To Different Mat:</h5>
                            </Row>
                            <Row>
                                <Col className="col-4">
                                    Move this guest (and transfer the related
                                    details) to a different mat.
                                </Col>
                                <Col className="col-1"/>
                                <Col className="col-5">
                                    <Row>
                                        {/*<Form.Group controlId="emptyMatSelect">*/}
                                            <Form.Label className="col-8">
                                                Transfer To Mat:
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="col-4"
                                                onChange={handleEmptyChange}
                                                size="sm"
                                            >
                                                <option key="0" value="0">
                                                    (Select)
                                                </option>
                                                {availables.map(available => (
                                                    <option
                                                        key={available.id}
                                                        value={available.id}
                                                    >
                                                        {available.matNumberAndFeatures}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        {/*</Form.Group>*/}
                                    </Row>
                                </Col>

                                <Col className={"col-2 text-right"}>
                                    <Button
                                        disabled={emptyRegistrationId < 1}
                                        onClick={handleRegistrationReassign}
                                        variant="secondary"
                                    >Move</Button>
                                </Col>
                            </Row>
                            <hr/>

                            <Row className="mb-1">
                                <h5>Option 3: Remove Existing Assignment</h5>
                            </Row>
                            <Row>
                                <Col className="col-10">
                                    Remove the current assignment details,
                                    and make this mat available for reassignment.
                                </Col>
                                <Col className="col-2 text-right">
                                    <Button
                                        onClick={handleDeassignConfirm}
                                        variant="danger"
                                    >Remove</Button>
                                </Col>
                            </Row>

                        </Container>

                    </Modal.Body>

                    <Modal.Footer>
                        Press <strong>&times;</strong> to exit with no changes
                    </Modal.Footer>

                </Modal>

{/* Deassign Confirm Modal ----------------------------------------------- */}

                <Modal
                    animation={false}
                    backdrop="static"
                    centered
                    dialogClassName="bg-danger"
                    onHide={handleDeassignConfirmNegative}
                    show={showDeassignConfirm}
                    size="lg"
                >

                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deassign</Modal.Title>
                        <Modal.Body>
                            <p>
                                Deassigning this mat will delete the associated
                                assignment details.  If you want to transfer this
                                guest to a different mat and preserve the details,
                                use the <strong>Move</strong> option instead.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={handleDeassignConfirmPositive}
                                variant="danger"
                            >
                                Deassign
                            </Button>
                            <Button
                                onClick={handleDeassignConfirmNegative}
                                variant="primary"
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>

                    </Modal.Header>

                </Modal>

{/* Unassigned Modal ----------------------------------------------------- */}

                <Modal
                    animation={false}
                    backdrop="static"
                    centered
                    onHide={handleHideUnassigned}
                    show={showUnassigned}
                    size="lg"
                >

                    <Modal.Header closeButton>
                        <Modal.Title>Manage Unassigned Mat</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Row>
                            <Col className="col-12">
                                { (registration) ? (
                                    <Row className="col-12 justify-content-center">
                                        Facility:&nbsp;
                                        <span className="text-info">{facilityContext.selectedFacility.name}</span>
                                        &nbsp;&nbsp;&nbsp;
                                        Date:&nbsp;
                                        <span className="text-info">{registration.registrationDate}</span>
                                        &nbsp;&nbsp;&nbsp;
                                        Mat Number:&nbsp;
                                        <span className="text-info">{registration.matNumberAndFeatures}</span>
                                    </Row>
                                ) : (
                                    <span>No registration???</span>
                                )}
                            </Col>
                        </Row>
                        <hr/>

                        <Row className="mb-2 ml-1">
                            <Col className="col-6">
                                <strong>Select or Add Guest</strong>
                                <Button
                                    className="ml-2"
                                    onClick={handleAddGuest}
                                    size="sm"
                                    variant="secondary"
                                >
                                    Add
                                </Button>
                                <Pagination
                                    currentPage={currentPage}
                                    lastPage={(guests.length === 0) ||
                                        (guests.length < pageSize)}
                                    onNext={handlePageNext}
                                    onPrevious={handlePagePrevious}
                                />
                            </Col>
                            <Col className="col-6">
                                <SearchBar
                                    fieldValue={searchText}
                                    onChange={handleSearchChange}
                                    placeholder="Enter part of either name ..."
                                    // withAction
                                    // withClear
                                />
                            </Col>
                        </Row>

                        <Row className="mb-1 ml-1 mr-1">
                            <List
                                fields={["firstName", "lastName", "comments"]}
                                handleSelect={handleSelectedGuest}
                                headers={["First Name", "Last Name", "Comments"]}
                                index={guestsIndex}
                                items={guests}
                            />
                        </Row>

                        <Row className="ml-1">
                            Click on a row to select that Guest to be assigned.
                        </Row>

                    </Modal.Body>

                    <Modal.Footer>
                        Press <strong>&times;</strong> to exit with no changes
                    </Modal.Footer>

                </Modal>

            </Container>

        </>

    );

};

export default RegistrationView;
