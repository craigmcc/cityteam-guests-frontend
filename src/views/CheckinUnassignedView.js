import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import FacilityClient from "../clients/FacilityClient";
import List from "../components/List";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import AssignForm from "../forms/AssignForm";
import GuestForm from "../forms/GuestForm";

// handleStage              Handle (stage) change request
// registration             Currently unassigned Registration to be processed
const CheckinUnassignedView = (props) => {

    // Global Support --------------------------------------------------------

    const [assign, setAssign] = useState(null);
    const [guest, setGuest] = useState(null);
    const [registration] = useState(props.registration);

    useEffect(() => {
        registration.matNumberAndFeatures = "" + registration.matNumber;
        if (registration.features) {
            registration.matNumberAndFeatures += registration.features;
        }
    }, [assign, guest, registration]);

    const handleBack = () => {
        console.info("CheckinUnassignedView.handleBack()");
        requestStage("List");
    }

    const requestStage = (stage) => {
        console.info("CheckinUnassignedView.requestStage(" + stage + ")");
        if (props.handleStage) {
            props.handleStage(stage);
        } else {
            alert("No handleStage handler was defined!");
        }
    }

    // For Step 1 ------------------------------------------------------------

    const [adding, setAdding] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [guests, setGuests] = useState([]);
    const [index, setIndex] = useState()
    const [pageSize] = useState(10);
    const [searchText, setSearchText] = useState("");

    const handleAddClick = () => {
        console.info("CheckinUnassignedView.handleAddClick()");
        setAdding(!adding);
        setCurrentPage(1);
        setGuest(null);
        setIndex(-1);
    }

    const handleAddSave = (registration) => {
        // Assume a brand new Guest has not been assigned yet
        console.info("CheckinUnassignedView.handleAddSave("
            + JSON.stringify(registration, ["id", "registrationDate", "guestId"])
            + ")");
        setAdding(false);
        // TODO - update guestId/guest.firstName/guest.lastName in registration
        // TODO - update heading with guest name?

    }

    const handlePageNext = () => {
        console.info("CheckinUnassignedView.handlePageNext()");
        let newCurrentPage = currentPage + 1;
        setCurrentPage(newCurrentPage);
        retrieveGuests(searchText, newCurrentPage);
    }

    const handlePagePrevious = () => {
        console.info("CheckinUnassignedView.handlePagePrevious()");
        let newCurrentPage = currentPage - 1;
        setCurrentPage(newCurrentPage);
        retrieveGuests(searchText, newCurrentPage);
    }

    const handleSearchChange = (event) => {
        console.info("CheckinUnassignedView.handleSearchChange("
            + event.target.value
            + ")");
        setCurrentPage(1);
        setSearchText(event.target.value);
        retrieveGuests(event.target.value, currentPage);
    }

    const handleSelectedGuest = (newIndex) => {
        if (newIndex === index) {
            console.info("CheckinUnassignedView.handleSelectedGuest(-1)");
            configureAssign(null);
            setGuest(null);
            setIndex(-1);
        } else {
            // TODO: Verify this guest is not already assigned on this registrationDate
            console.info("CheckinUnassignedView.handleSelectedGuest("
                + newIndex + ", "
                +JSON.stringify(guests[newIndex], ["id", "firstName", "lastName"])
                + ")");
            configureAssign(guests[newIndex]);
            setGuest(guests[newIndex]);
            setIndex(newIndex);
        }
    }

    const retrieveGuests = (newSearchText, newCurrentPage) => {
        console.info("CheckinUnassignedView.retrieveGuests for("
            + newSearchText + ", "
            + newCurrentPage + ")");
        if (!newSearchText) {
            setGuests([]);
            return;
        }
        FacilityClient.guestName(
            registration.facilityId,
            newSearchText,
            {
                limit: pageSize,
                offset: (pageSize * (newCurrentPage - 1))
            })
            .then(response => {
                console.info("CheckinUnassignedView.retrieveGuests got("
                    + JSON.stringify(response.data, ["id", "firstName", "lastName"])
                    + ")");
                setGuests(response.data);
            }
        )
    }

    // For Step 2 ------------------------------------------------------------

    const configureAssign = (newGuest) => {
        console.info("CheckinUnassignedView.extractAssign for("
            + JSON.stringify(newGuest)
            + ")");
        let newAssign;
        if (newGuest) {
            newAssign = {
                id: registration.id,
                comments: null,
                guestId: newGuest.id, // Enables Save in AssignForm
                paymentAmount: "5.00",
                paymentType: "$$",
                showerTime: null,
                wakeupTime: null,
            }
        } else {
            newAssign = null;
        }
        console.info("CheckinUnassignedView.extractAssign got("
            + JSON.stringify(newAssign)
            + ")");
        setAssign(newAssign);
    }

    const handleAssign = (newRegistration) => {
        console.info("CheckinUnassignedView.handleAssign("
            + JSON.stringify(newRegistration)
            + ")");
        // Database update was inside AssignForm
        requestStage("List");
    }

    return (

        <Container fluid>

            {/* Common Header -------------------------------------------- */}

            <Row className="mb-2">
                <Col className="col-11">
                    { props.registration ? (
                        <>
                            <Row className="justify-content-center">
                                Mat Number:&nbsp;
                                <span className="text-info">
                                    {registration.matNumberAndFeatures}
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                { (guest) ? (
                                    <span>
                                    Guest:&nbsp;
                                    <span className="text-info">
                                        {guest.firstName}&nbsp;
                                        {guest.lastName}
                                    </span>
                                    </span>
                                ) : (  null )}
                            </Row>
                        </>
                    ) : (
                        <span>No mats are currently available on this date.</span>
                    )}

                </Col>
                <Col className="col-1">
                    <Button
                        onClick={handleBack}
                        size="sm"
                        variant="outline-primary"
                    >
                        Back
                    </Button>
                </Col>
            </Row>

            <Row className="mb-3 ml-1 mr-1">

                {/* Step 1 --------------------------------------------------- */}

                <Col className="col-6 bg-light mb-1 mt-1">
                    <>

                        <h6>Step 1: Select or Add A Guest To Assign</h6>
                        <hr className="mb-3"/>

                        <Row className="mb-2">
                            <Col className="col-2">
                                <Pagination
                                    currentPage={currentPage}
                                    lastPage={(guests.length === 0) ||
                                        (guests.length < pageSize)}
                                    onNext={handlePageNext}
                                    onPrevious={handlePagePrevious}
                                />
                            </Col>
                            <Col className="col-2">
                                <Button
                                    onClick={handleAddClick}
                                    size="sm"
                                    variant="secondary"
                                >Add</Button>
                            </Col>
                            <Col className="col-8">
                                <SearchBar
                                    onChange={handleSearchChange}
                                    placeholder="Enter all or part of either name ..."
                                    value={searchText}
                                    withClear
                                />
                            </Col>
                        </Row>

                        { (adding) ? (

                            <Row className="ml-1 mr-1 mb-2">
                                <GuestForm
                                    // No guest triggers add behavior
                                    handleInsert={handleAddSave}
                                    saveLabel="Add"
                                    // No withRemove or withReset skips those buttons
                                />
                            </Row>

                        ) : (

                            <Row className="ml-1 mr-1 mb-2">
                                <List
                                    fields={["firstName", "lastName", "active", "comments"]}
                                    handleSelect={handleSelectedGuest}
                                    headers={["First Name", "Last Name", "Active", "Comments"]}
                                    index={index}
                                    items={guests}
                                />
                            </Row>

                        )}

                    </>
                </Col>

                {/* Step 2 --------------------------------------------------- */}

                <Col className="col-6 mb-1 mt-1">
                    <>
                        <h6>Step 2: Complete Assignment Details</h6>
                        <hr className="mb-3"/>
                        { (assign) ? (
                            <AssignForm
                                assign={assign}
                                autoFocus={false}
                                handleAssign={handleAssign}
                                saveLabel="Add"
                            />
                        ) : (
                            <span>No guest has been selected for assignment yet</span>
                        )}
                    </>
                </Col>

            </Row>

        </Container>

    )

}

export default CheckinUnassignedView;
