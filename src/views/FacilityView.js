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
import FacilityForm from "../forms/FacilityForm";

const FacilityView = () => {

    const facilityContext = useContext(FacilityContext);

    const [facility, setFacility] = useState(null);
    const [facilities, setFacilities] = useState([]);
    const [index, setIndex] = useState(-1);
    const [searchText, setSearchText] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        retrieveAllItems();
    }, []);

    const handleHide = () => {
        console.log("FacilityView.handleHide()");
        setIndex(-1);
        setShow(false);
    }

    const handleInsert = (facility) => {
        console.log("FacilityView.handleInsert(" +
            JSON.stringify(facility, ["id", "name"]) + ")");
        setShow(false);
        retrieveItems(searchText);
        facilityContext.refreshFacilities();
    }

    const handleRemove = (facility) => {
        console.log("FacilityView.handleRemove(" +
            JSON.stringify(facility, ["id", "name"]) + ")");
        setShow(false);
        retrieveItems(searchText);
        facilityContext.refreshFacilities();
    }

    const handleSelectedItem = (newIndex) => {
        if (newIndex === index) {
            console.log("FacilityView.handleSelectedItem(-1)");
            setFacility(null);
            setIndex(-1);
            setShow(false);
        } else {
            console.log("FacilityView.handleSelectedItem(" + newIndex + ", " +
                JSON.stringify(facilities[newIndex], ["id", "name"]) + ")");
            setFacility(facilities[newIndex]);
            setIndex(newIndex);
            setShow(true);
        }
    }

    const handleUpdate = (facility) => {
        console.log("FacilityView.handleUpdate(" +
            JSON.stringify(facility, ["id", "name"]) + ")");
        setShow(false);
        retrieveItems(searchText);
        facilityContext.refreshFacilities();
    }

    const onAdd = () => {
        console.log("FacilityView.onAdd()");
        setFacility(null);
        setShow(true);
    }

   const onSearchChange = (event) => {
        console.log("FacilityView.onSearchChange(" + event.target.value + ")");
        setSearchText(event.target.value);
        retrieveItems(event.target.value);
    }

    const onSearchClick = () => {
        console.log("FacilityView.onSearchClick()");
        retrieveItems(searchText);
    }

    const retrieveAllItems = () => {
        FacilityClient.all()
            .then(response => {
                console.log("FacilityView.retrieveAllItems(" +
                    JSON.stringify(response.data, ["id", "name"]) + ")");
                setFacilities(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        setIndex(-1);
    }

    const retrieveItems = (newSearchText) => {
        if (newSearchText === "") {
            retrieveAllItems();
        } else {
            retrieveMatchingItems(newSearchText);
        }
    }

    const retrieveMatchingItems = (newSearchText) => {
        FacilityClient.name(newSearchText)
            .then(response => {
                console.log("FacilityView.retrieveMatchingItems(" +
                    JSON.stringify(response.data, ["id", "name"]) + ")");
                setFacilities(response.data);
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
                        <strong>Facilities</strong>
                        <Button
                            className="ml-2"
                            onClick={onAdd}
                            size="sm"
                            variant="primary"
                        >Add</Button>
                    </Col>
                    <Col className="col-8">
                        <SearchBar
                            onChange={onSearchChange}
                            onClick={onSearchClick}
                            placeholder="Search by name ..."
                            value={searchText}
                            withClear
                            withSearch
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <List
                            fields={["name", "active", "city", "state",
                                     "zipCode", "phone", "email"]}
                            handleSelect={handleSelectedItem}
                            headers={["Name", "Active", "City", "State",
                                      "Zip Code", "Phone Number", "Email Address"]}
                            index={index}
                            items={facilities}
                        />
                    </Col>
                </Row>

                <Row className="ml-1">
                    Click &nbsp;<strong>Add</strong>&nbsp; for a new Facility, or
                    click on a row in the table to edit an existing one.
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

                { (facility) ? (
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Existing Facility</Modal.Title>
                    </Modal.Header>
                ) : (
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Facility</Modal.Title>
                    </Modal.Header>
                )}

                <Modal.Body>
                    <FacilityForm
                        facility={facility}
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

};

export default FacilityView;
