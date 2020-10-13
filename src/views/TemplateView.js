import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import FacilityClient from "../clients/FacilityClient";
import List from "../components/List";
import { FacilityContext } from "../contexts/FacilityContext";
import TemplateForm from "../forms/TemplateForm";

const TemplateView = () => {

    const facilityContext = useContext(FacilityContext);

    const [index, setIndex] = useState(-1);
    const [show, setShow] = useState(false);
    const [template, setTemplate] = useState(null);
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        retrieveAllItems();
        // eslint-disable-next-line
    }, [facilityContext.selectedFacility]);

    const handleHide = () => {
        console.log("TemplateView.handleHide()");
        setIndex(-1);
        setShow(false);
    }

    const handleInsert = (template) => {
        console.log("TemplateView.handleInsert(" +
            JSON.stringify(template, ["id", "name"]) + ")");
        setShow(false);
        retrieveAllItems();
    }

    const handleRemove = (template) => {
        console.log("TemplateView.handleRemove(" +
            JSON.stringify(template, ["id", "name"]) + ")");
        setShow(false);
        retrieveAllItems();
    }

    const handleSelectedItem = (newIndex) => {
        if (newIndex === index) {
            console.log("TemplateView.handleSelectedItem(-1)");
            setIndex(-1);
            setShow(false);
            setTemplate(null);
        } else {
            console.log("TemplateView.handleSelectedItem(" + newIndex + ", " +
                JSON.stringify(templates[newIndex], ["id", "name"]) + ")");
            setIndex(newIndex);
            setShow(true);
            setTemplate(templates[newIndex]);
        }
    }

    const handleUpdate = (template) => {
        console.log("TemplateView.handleUpdate(" +
            JSON.stringify(template, ["id", "name"]) + ")");
        setShow(false);
        retrieveAllItems();
    }

    const onAdd = () => {
        console.log("TemplateView.onAdd()");
        setShow(true);
        setTemplate(null);
    }

    const retrieveAllItems = () => {
        console.log("TemplateView.retrieveAllItems for(" +
            JSON.stringify(facilityContext.selectedFacility,
                ["id", "name"]) + ")");
        FacilityClient.templateAll
                (facilityContext.selectedFacility.id)
            .then(response => {
                console.log("TemplateView.retrieveAllItems got(" +
                    JSON.stringify(response.data,
                        ["id", "name"]) + ")");
                setTemplates(response.data);
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
                    <Col>
                        <strong>Templates for {facilityContext.selectedFacility.name}</strong>
                        <Button
                            className="ml-2"
                            onClick={onAdd}
                            size="sm"
                            variant="primary"
                        >Add</Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <List
                            fields={["name", "active", "allMats",
                                     "handicapMats", "socketMats"]}
                            handleSelect={handleSelectedItem}
                            headers={["Name", "Active", "All Mats",
                                      "Handicap Mats", "Socket Mats"]}
                            index={index}
                            items={templates}
                        />
                    </Col>
                </Row>

                <Row className="ml-1">
                    Click &nbsp;<strong>Add</strong>&nbsp; for a new Template, or
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

                { (template) ? (
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Existing Template</Modal.Title>
                    </Modal.Header>
                ) : (
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Template</Modal.Title>
                    </Modal.Header>
                )}

                <Modal.Body>
                    <TemplateForm
                        handleInsert={handleInsert}
                        handleRemove={handleRemove}
                        handleUpdate={handleUpdate}
                        template={template}
                    />
                </Modal.Body>

                <Modal.Footer>
                    Press <strong>&times;</strong> to exit with no changes
                </Modal.Footer>

            </Modal>

        </>

    );

};

export default TemplateView;
