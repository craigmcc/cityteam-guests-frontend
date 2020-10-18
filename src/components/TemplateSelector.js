import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import FacilityClient from "../clients/FacilityClient";
import { FacilityContext } from "../contexts/FacilityContext";
import { reportError } from "../util/error.handling";

// actionLabel               Label for action button [Select]
// handleTemplate            Handle selected (template) when action button is clicked
export const TemplateSelector = (props) => {

    const facilityContext = useContext(FacilityContext);

    const [actionLabel] = useState(props.actionLabel || "Select")
    const [index, setIndex] = useState(-1);
    const [templates, setTemplates] = useState([]);

    useEffect( () => {
        retrieveAllItems();
        // eslint-disable-next-line
    }, [facilityContext.selectedFacility]);

    const handleChange = (event) => {
        let newIndex = Number(event.target.value);
        console.info("TemplateSelector.handleChange(" + newIndex + ", "
            + JSON.stringify(templates[newIndex], ["id", "name"])
            + ")");
        setIndex(newIndex);
    }

    const handleClick = (event) => {
        console.info("TemplateSelector.handleClick("
            + JSON.stringify(templates[index], ["id", "name"])
            + ")");
        if (props.handleTemplate) {
            props.handleTemplate(templates[index]);
        }
    }

    const retrieveAllItems = () => {
        if (!facilityContext.selectedFacility || facilityContext.selectedFacility.id < 1) {
            setTemplates([]);
            setIndex(-1);
            return;
        }
        console.log("TemplateSelector.retrieveAllItems for("
            + JSON.stringify(facilityContext.selectedFacility, ["id", "name"])
            + ")");
        FacilityClient.templateAll(facilityContext.selectedFacility.id)
            .then(response => {
                console.log("TemplateSelector.retrieveAllItems got(" +
                    JSON.stringify(response.data, ["id", "name"]) + ")");
                setTemplates(response.data);
                setIndex(0);
            })
            .catch(err => {
                reportError("TemplateSelector.retrieveAllItems()", err);
            });
    }

    return (

        <Container fluid>
            <Row>
                <label
                    className="mr-2"
                    htmlFor="currentTemplate"
                >
                    Use Template:
                </label>
                <select
                    className="mr-2"
                    id="currentTemplate"
                    name="currentTemplate"
                    onChange={handleChange}
                    value={(index >= 0) ? templates[index].id : -1}
                >
                    {templates.map(template => (
                        <option
                            key={template.id}
                            value={template.id}
                        >
                            {template.name}
                        </option>
                    ))}
                </select>
                <Button
                    onClick={handleClick}
                    size="sm"
                    variant="outline-info"
                >
                    {actionLabel}
                </Button>
            </Row>
        </Container>

    );

}

export default TemplateSelector;
