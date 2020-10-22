import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import FacilityClient from "../clients/FacilityClient";
import List from "../components/List";
import RegistrationDateSelector from "../components/RegistrationDateSelector";
import { FacilityContext } from "../contexts/FacilityContext";
import { reportError } from "../util/error.handling";
import { withFlattenedObjects } from "../util/transformations";

const MonthlySummaryView = () => {

    const facilityContext = useContext(FacilityContext);

    const [details, setDetails] = useState(null);
    const [headingSummaries, setHeadingSummaries] = useState("");
    const [headingSummary, setHeadingSummary] = useState("");
    const [indexDetails, setIndexDetails] = useState(-1);
    const [indexSummaries, setIndexSummaries] = useState(-1);
    // TODO - More reasonable defaults for dates plus handle them better
    const [registrationDateFrom, setRegistrationDateFrom] = useState("2020-01-01");
    const [registrationDateTo, setRegistrationDateTo] = useState("2020-01-31");
    const [summaries, setSummaries] = useState(null);
    const [summary, setSummary] = useState(null);

    useEffect(() => {

    }, [details, summaries, summary]);

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

    const handleBackSummaries = () => {
        console.info("MonthlySummary.handleBackSummaries()");
        setIndexSummaries(-1);
        setSummaries(null);
        setSummary(null);
    }

    const handleBackSummary = () => {
        console.info("MonthlySummary.handleBackSummary()");
        setDetails(null);
        setIndexDetails(-1);
        setSummary(null);
    }

    const handleRegistrationDateFrom = (newRegistrationDateFrom) => {
        console.info("MonthlySummary.handleRegistrationDateFrom("
            + newRegistrationDateFrom
            + ")");
        setRegistrationDateFrom(newRegistrationDateFrom);
    }

    const handleRegistrationDateTo = (newRegistrationDateTo) => {
        console.info("MonthlySummary.handleRegistrationDateTo("
            + newRegistrationDateTo
            + ")");
        setRegistrationDateTo(newRegistrationDateTo);
    }

    const handleReport = () => {
        console.info("MonthlySummary.handleReport()");
        FacilityClient.registrationSummary(facilityContext.selectedFacility.id,
            registrationDateFrom, registrationDateTo)
            .then(response => {
                console.info("MonthlySummary.handleReport("
                    + JSON.stringify(response.data, ["facilityId", "registrationDate", "totalAssigned"])
                    + ")"
                );
                setHeadingSummaries("Monthly Summary for "
                    + facilityContext.selectedFacility.name
                    + " (" + registrationDateFrom
                    + " - " + registrationDateTo + ")"
                )
                setSummaries(response.data);
            })
            .catch(err => {
                reportError("MonthlySummary.handleReport()", err);
            })
    }

    const handleSelectSummary = (newIndex) => {
        if (newIndex === indexSummaries) {
            console.info("MonthlySummary.handleSelectSummary(-1)");
            setDetails(null);
            setIndexSummaries(-1);
            setSummary(null);
        } else {
            console.info("MonthlySummary.handleSelectSummary(" + newIndex + ")");
            setHeadingSummary("Daily Details for "
                + facilityContext.selectedFacility.name
                + " (" + summaries[newIndex].registrationDate + ")");
            setIndexSummaries(newIndex);
            setSummary(summaries[newIndex]);
            FacilityClient.registrationDate(
                facilityContext.selectedFacility.id,
                summaries[newIndex].registrationDate,
                { withGuest: "" }
            )
                .then(response => {
                    let registrations = flattenedRegistrations(response.data);
                    console.info("MonthlySummary.handleSelectSummary("
                        + JSON.stringify(registrations,
                            ["id", "registrationDate", "matNumberAndFeatures"])
                        + ")");
                    setDetails(registrations);
                })
                .catch(err => {
                    reportError("MonthlySummary.handleSelectSummary()", err);
                })
        }
    }

    return (

        <Container fluid>

            {(!summaries && !details) ? (

                <>

                    <Row className="ml-1 mr-1 mt-3">
                        <Col className="col-4">
                            <strong>Guest History for {facilityContext.selectedFacility.name}</strong>
                        </Col>
                        {/*// TODO - Funky formatting in RegistrationDateSelector*/}
                        <Col className="justify-content-center">
                            <RegistrationDateSelector
                                autoFocus
                                handleRegistrationDate={handleRegistrationDateFrom}
                                label="From Date"
                                registrationDate={registrationDateFrom}
                            />
                            <RegistrationDateSelector
                                handleRegistrationDate={handleRegistrationDateTo}
                                label="To Date"
                                registrationDate={registrationDateTo}
                            />
                        </Col>
                        <Col className="justify-content-end">
                            <Button onClick={handleReport}>Report</Button>
                        </Col>
                    </Row>

                </>

            ) : ( null )}

            {(summaries && !details) ? (

                <>

                    <Row className="ml-1 mr-1 mt-3 mb-3">
                        <Col className="text-left">
                            {(new Date()).toLocaleString()}
                        </Col>
                        <Col className="text-right">
                            <Button onClick={handleBackSummaries}>Back</Button>
                        </Col>
                    </Row>

                    <Row className="ml-1 mr-1 mt-2">
                        <List
                            fields={[
                                "registrationDate",
                                "total$$",
                                "totalAG",
                                "totalCT",
                                "totalFM",
                                "totalMM",
                                "totalSW",
                                "totalUK",
                                "totalAssigned",
                                "totalUnassigned",
                                "totalAmount"
                            ]}
                            handleSelect={handleSelectSummary}
                            headers={[
                                "Date",
                                "$$",
                                "AG",
                                "CT",
                                "FM",
                                "MM",
                                "SW",
                                "UK",
                                "Assigned",
                                "Unassigned",
                                "Total $$"
                            ]}
                            heading={headingSummaries}
                            index={indexSummaries}
                            items={summaries}
                            showFooter
                        />
                    </Row>

                </>

            ) : ( null )}

            {(details) ? (

                <>
                    <Row className="ml-1 mr-1 mt-3 mb-3">
                        <Col className="text-left">
                            {(new Date()).toLocaleString()}
                        </Col>
                        <Col className="text-right">
                            <Button onClick={handleBackSummary}>Back</Button>
                        </Col>
                    </Row>

                    <Row className="ml-1 mr-1 mt-2">
                        <List
                            fields={[
                                "matNumberAndFeatures",
                                "guest.firstName",
                                "guest.lastName",
                                "paymentType",
                                "paymentAmount",
                                "showerTime",
                                "wakeupTime",
                                "comments"]}
                            headers={[
                                "Mat",
                                "First Name",
                                "Last Name",
                                "$$",
                                "Amount",
                                "Shower",
                                "Wakeup",
                                "Comments"]}
                            heading={headingSummary}
                            index={indexDetails}
                            items={details}
                            showFooter
                        />
                    </Row>

                </>

            ) : ( null) }

        </Container>

    );

}

export default MonthlySummaryView;
