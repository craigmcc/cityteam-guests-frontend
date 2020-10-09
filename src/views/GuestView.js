import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import FacilityClient from "../clients/FacilityClient";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import { FacilityContext } from "../contexts/FacilityContext";
import Pagination from "../components/Pagination";
import GuestForm from "../forms/GuestForm"

const GuestView = () => {

    const facilityContext = useContext(FacilityContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [guest, setGuest] = useState(null);
    const [guests, setGuests] = useState([]);
    const [index, setIndex] = useState(-1);
    const [pageSize] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        retrieveAllItems();
    }, [facilityContext.selectedFacility]);

    const handleHide = () => {
        console.log("GuestView.handleHide()");
        setIndex(-1);
        setShow(false);
    }

    const handleInsert = (guest) => {
        console.log("GuestView.handleInsert(" +
            JSON.stringify(guest, ["id", "firstName", "lastName"]) + ")");
        setShow(false);
        retrieveItems(searchText, currentPage);
    }

    const handleRemove = (guest) => {
        console.log("GuestView.handleRemove(" +
            JSON.stringify(guest, ["id", "name", "lastName"]) + ")");
        setShow(false);
        retrieveItems(searchText, currentPage);
    }

    const handleSelectedItem = (newIndex) => {
        if (newIndex === index) {
            console.log("GuestView.handleSelectedItem(-1)");
            setGuest(null);
            setIndex(-1);
            setShow(false);
        } else {
            console.log("GuestView.handleSelectedItem(" + newIndex + ", " +
                JSON.stringify(guests[newIndex], ["id", "firstName", "lastName"]) + ")");
            setGuest(guests[newIndex]);
            setIndex(newIndex);
            setShow(true);
        }
    }

    const handleUpdate = (guest) => {
        console.log("GuestView.handleUpdate(" +
            JSON.stringify(guest, ["id", "firstName", "lastName"]) + ")");
        setShow(false);
        retrieveItems(searchText, currentPage);
    }

    const onAdd = () => {
        console.log("GuestView.onAdd()");
        setGuest(null);
        setShow(true);
    }

    const onPageNext = () => {
        let newCurrentPage = currentPage + 1;
        setCurrentPage(newCurrentPage);
        retrieveItems(searchText, newCurrentPage);
    }

    const onPagePrevious = () => {
        let newCurrentPage = currentPage - 1;
        setCurrentPage(newCurrentPage);
        retrieveItems(searchText, newCurrentPage);
    }

    const onSearchChange = (event) => {
        console.log("GuestView.onSearchChange(" +
            event.target.value + ")");
        setCurrentPage(1);
        setSearchText(event.target.value);
        retrieveItems(event.target.value, currentPage);
    }

    const onSearchClick = () => {
        console.log("GuestView.onSearchClick(" +
            searchText + ")");
        retrieveItems(searchText, currentPage);
    }

    const retrieveAllItems = () => {
        setCurrentPage(1);
        setGuests([]);
        setIndex(-1);
    }

    const retrieveItems = (newSearchText, newCurrentPage) => {
        if (newSearchText === "") {
            retrieveAllItems();
        } else {
            retrieveMatchingItems(newSearchText, newCurrentPage);
        }
    }

    const retrieveMatchingItems = (newSearchText, newCurrentPage) => {
        console.log("GuestView.retrieveItems for(" +
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
                console.log("GuestView.retrieveItems got(" +
                    JSON.stringify(response.data,
                        ["id", "firstName", "lastName"]) +
                        ", " + newSearchText + ")");
                setGuests(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        setIndex(-1);
    }

    return (

        <>

            {/* List View */}
            <Container fluid>

                <Row className="mt-3 mb-3">
                    <Col className="col-4">
                        <strong>Guests for {facilityContext.selectedFacility.name}</strong>
                        <Button
                            className="ml-2"
                            onClick={onAdd}
                            size="sm"
                            variant="primary"
                        >Add</Button>
                    </Col>
                    <Col className="col-8">
                        <SearchBar
                            label="Filter"
                            onChange={onSearchChange}
                            onClick={onSearchClick}
                            placeholder="Enter all or part of either name ..."
                            value={searchText}
                            withClear
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Row className="mb-2 mt-1">
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
                        <Row>
                            <List
                                fields={["firstName", "lastName", "comments"]}
                                handleSelect={handleSelectedItem}
                                headers={["First Name", "Last Name",
                                          "Comments About Guest"]}
                                index={index}
                                items={guests}
                            />
                        </Row>

                    </Col>


                </Row>

            </Container>

            {/* Details Modal */}
            <Modal
                animation={false}
                backdrop="static"
                centered
                onHide={handleHide}
                show={show}
                size="lg"
            >

                { (guest) ? (
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Existing Guest</Modal.Title>
                    </Modal.Header>
                ) : (
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Guest</Modal.Title>
                    </Modal.Header>
                )}

                <Modal.Body>
                    <GuestForm
                        guest={guest}
                        handleInsert={handleInsert}
                        handleRemove={handleRemove}
                        handleUpdate={handleUpdate}
                    />
                </Modal.Body>

                <Modal.Footer>
                    Press <strong>&times;</strong> to exit with no changes
                </Modal.Footer>

            </Modal>

        </>

    );

}

export default GuestView;
