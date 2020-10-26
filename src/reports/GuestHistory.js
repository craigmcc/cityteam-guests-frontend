import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import FacilityClient from "../clients/FacilityClient";
import GuestClient from "../clients/GuestClient";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import { FacilityContext } from "../contexts/FacilityContext";
import Pagination from "../components/Pagination";

const GuestHistoryView = () => {

    const facilityContext = useContext(FacilityContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [guest, setGuest] = useState(null);
    const [guests, setGuests] = useState([]);
    const [heading, setHeading] = useState("");
    const [index, setIndex] = useState(-1);
    const [pageSize] = useState(15);
    const [registrations, setRegistrations] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        retrieveAllGuests();
    }, [facilityContext.selectedFacility]);

    const handleSelectedItem = (newIndex) => {
        if (newIndex === index) {
            console.info("GuestHistory.handleSelectedItem(-1)");
            setGuest(null);
            setIndex(-1);
        } else {
            console.info("GuestHistory.handleSelectedItem(" + newIndex + ", " +
                JSON.stringify(guests[newIndex], ["id", "firstName", "lastName"]) + ")");
            retrieveRegistrations(guests[newIndex]);
            setHeading("Guest History for " +
                facilityContext.selectedFacility.name +
                " Guest " + guests[newIndex].firstName +
                " " + guests[newIndex].lastName);
            setGuest(guests[newIndex]);
            setIndex(newIndex);
        }
    }

    const onBack = () => {
        setGuest(null);
        setHeading("");
    }

    const onPageNext = () => {
        let newCurrentPage = currentPage + 1;
        setCurrentPage(newCurrentPage);
        retrieveGuests(searchText, newCurrentPage);
    }

    const onPagePrevious = () => {
        let newCurrentPage = currentPage - 1;
        setCurrentPage(newCurrentPage);
        retrieveGuests(searchText, newCurrentPage);
    }

    const onSearchChange = (event) => {
        console.info("GuestHistory.onSearchChange(" +
            event.target.value + ")");
        setCurrentPage(1);
        setSearchText(event.target.value);
        retrieveGuests(event.target.value, currentPage);
    }

    const onSearchClick = () => {
        console.info("GuestHistory.onSearchClick(" +
            searchText + ")");
        retrieveGuests(searchText, currentPage);
    }

    const retrieveAllGuests = () => {
        setCurrentPage(1);
        setGuests([]);
        setIndex(-1);
    }

    const retrieveGuests = (newSearchText, newCurrentPage) => {
        if (newSearchText === "") {
            retrieveAllGuests();
        } else {
            retrieveMatchingGuests(newSearchText, newCurrentPage);
        }
    }

    const retrieveMatchingGuests = (newSearchText, newCurrentPage) => {
        console.info("GuestHistory.retrieveMatchingGuests for(" +
            JSON.stringify(facilityContext.selectedFacility,
                ["id", "name"]) + ", " + newSearchText + ", " +
            newCurrentPage + ")");
        FacilityClient.guestName
            (facilityContext.selectedFacility.id,
             newSearchText,
            {
                limit: pageSize,
                offset: (pageSize * (newCurrentPage - 1))
            })
            .then(response => {
                console.info("GuestHistory.retrieveMatchingGuests got(" +
                    JSON.stringify(response.data,
                        ["id", "firstName", "lastName"]));
                setGuests(response.data);
            })
            .catch(err => {
                console.error("GuestHistory.retrieveMatchingGuests() error", err);
                alert(`GuestHistory.retrieveMatchingGuests() error: '${err.message}`);
            });
        setIndex(-1);
    }

    const retrieveRegistrations = (newGuest) => {
        console.info("GuestHistory.retrieveRegistrations for(" +
            JSON.stringify(newGuest, ["id", "firstName", "lastName"]) + ")");
        GuestClient.registrationAll(newGuest.id)
            .then(response => {
                for (let registration of response.data) {
                    registration.matNumberAndFeatures =  "" + registration.matNumber;
                    if (registration.features) {
                        registration.matNumberAndFeatures += registration.features;
                    }
                }
                console.info("GuestHistory.retrieveRegistrations got(" +
                    JSON.stringify(response.data,
                        ["id", "registrationDate", "matNumberAndFeatures"]));
                setRegistrations(response.data);
            })
            .catch(err => {
                console.error("GuestHistory.retrieveRegistrations() error", err);
                alert(`GuestHistory.retrieveRegistrations() error: '${err.message}`);
            })
    }

    return (

        <>

            <Container fluid>

                { (!guest) ? (

                    <>

                        <Row className="mt-3 mb-3">
                            <Col className="col-4">
                                <strong>Guest History for {facilityContext.selectedFacility.name}</strong>
                            </Col>
                            <Col className="col-8">
                                <SearchBar
                                    fieldName="searchByName"
                                    fieldValue={searchText}
                                    onChange={onSearchChange}
                                    onClick={onSearchClick}
                                    placeholder="Enter all or part of either name ..."
                                    withAction
//                                    withClear
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Pagination
                                    currentPage={currentPage}
                                    lastPage={(guests.length === 0) ||
                                        (guests.length < pageSize)}
                                    onNext={onPageNext}
                                    onPrevious={onPagePrevious}
                                />
                            </Col>
                        </Row>

                        <Row className="ml-1 mr-1">
                            <List
                                fields={["firstName", "lastName",
                                    "active", "comments"]}
                                handleSelect={handleSelectedItem}
                                headers={["First Name", "Last Name",
                                    "Active", "Comments About Guest"]}
                                index={index}
                                items={guests}
                            />
                        </Row>

                        <Row className="mb-2 ml-1">
                            Enter all or part of either name to select the
                            Guest for which you wish to retrieve Guest History.
                        </Row>

                    </>

                    ) : (

                    <>

                        <Row className="ml-1 mr-1 mt-3 mb-3">
                            <Col className="text-left">
                                {(new Date()).toLocaleString()}
                            </Col>
                            <Col className="text-right">
                                <Button onClick={onBack}>Back</Button>
                            </Col>
                        </Row>

                        <Row className="ml-1 mr-1 mt-2">
                            <List
                                fields={["registrationDate",
                                    "matNumberAndFeatures",
                                    "paymentType",
                                    "paymentAmount", "showerTime",
                                    "wakeupTime", "comments"]}
                                headers={["Date", "Mat", "$$", "Amount",
                                    "Shower", "Wakeup", "Comments"]}
                                heading={heading}
                                index={-1}
                                items={registrations}
                                showFooter
                            />
                        </Row>

                    </>

                )}

            </Container>

        </>
    )

}

export default GuestHistoryView;
