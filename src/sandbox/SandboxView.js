import React, { useState } from "react";
//import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { CheckboxElement, SelectElement, TextElement } from "../components/react.elements";

const SandboxView = () => {

    const [checkbox1, setCheckbox1] = useState(true);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(true);
    const [select1, setSelect1] = useState(-1);
    const [select2, setSelect2] = useState(1);
    const [select3, setSelect3] = useState(2);
    const [select4, setSelect4] = useState(3);
    const [value1, setValue1] = useState("Initial Value String");
    const [value2, setValue2] = useState("2020-10-22");
    const [value3, setValue3] = useState("2020-01");
    const [value4, setValue4] = useState("13:55");
    const [value5, setValue5] = useState("fred@flinstones.org");
    const [value6, setValue6] = useState("503-555-1212");

    const options = [
        { value: -1, description: "(Select)" },
        { value: 1,  description: "First" },
        { value: 2,  description: "Second" },
        { value: 3,  description: "Third" },
    ];

    let onBlur1 = (event) => {
        console.info("onBlur1(" + event.target.value + ")");
    }

    let onBlur2 = (event) => {
        console.info("onBlur2(" + event.target.value + ")");
    }

    let onBlur3 = (event) => {
        console.info("onBlur3(" + event.target.value + ")");
    }

    let onBlur4 = (event) => {
        console.info("onBlur4(" + event.target.value + ")");
    }

    let onBlur5 = (event) => {
        console.info("onBlur5(" + event.target.value + ")");
    }

    let onBlur6 = (event) => {
        console.info("onBlur6(" + event.target.value + ")");
    }

    let onBlurCheckbox1 = (event) => {
        console.info("onBlurCheckbox1(" + event.target.value + ")");
    }

    let onBlurCheckbox2 = (event) => {
        console.info("onBlurCheckbox2(" + event.target.value + ")");
    }

    let onBlurCheckbox3 = (event) => {
        console.info("onBlurCheckbox3(" + event.target.value + ")");
    }

    let onBlurSelect1 = (event) => {
        console.info("onBlurSelect1(" + event.target.value + ")");
    }

    let onBlurSelect2 = (event) => {
        console.info("onBlurSelect2(" + event.target.value + ")");
    }

    let onBlurSelect3 = (event) => {
        console.info("onBlurSelect3(" + event.target.value + ")");
    }

    let onBlurSelect4 = (event) => {
        console.info("onBlurSelect4(" + event.target.value + ")");
    }

    let onChange1 = (event) => {
        console.info("onChange1(" + event.target.value + ")");
        setValue1(event.target.value);
    }

    let onChange2 = (event) => {
        console.info("onChange2(" + event.target.value + ")");
        setValue2(event.target.value);
    }

    let onChange3 = (event) => {
        console.info("onChange3(" + event.target.value + ")");
        setValue3(event.target.value);
    }

    let onChange4 = (event) => {
        console.info("onChange4(" + event.target.value + ")");
        setValue4(event.target.value);
    }

    let onChange5 = (event) => {
        console.info("onChange5(" + event.target.value + ")");
        setValue5(event.target.value);
    }

    let onChange6 = (event) => {
        console.info("onChange6(" + event.target.value + ")");
        setValue6(event.target.value);
    }

    let onChangeCheckbox1 = (event) => {
        console.info("onChangeCheckbox1(" + event.target.value + ")");
        setCheckbox1(!checkbox1);
    }

    let onChangeCheckbox2 = (event) => {
        console.info("onChangeCheckbox2(" + event.target.value + ")");
        setCheckbox2(!checkbox2);
    }

    let onChangeCheckbox3 = (event) => {
        console.info("onChangeCheckbox3(" + event.target.value + ")");
        setCheckbox3(!checkbox3);
    }

    let onChangeSelect1 = (event) => {
        console.info("onChangeSelect1(" + event.target.value + ")");
        setSelect1(event.target.value);
    }

    let onChangeSelect2 = (event) => {
        console.info("onChangeSelect2(" + event.target.value + ")");
        setSelect2(event.target.value);
    }

    let onChangeSelect3 = (event) => {
        console.info("onChangeSelect3(" + event.target.value + ")");
        setSelect3(event.target.value);
    }

    let onChangeSelect4 = (event) => {
        console.info("onChangeSelect4(" + event.target.value + ")");
        setSelect4(event.target.value);
    }

    let onClick1 = (event) => {
        console.info("onClick1(" + event.target.value + ")");
        setValue1(event.target.value);
    }

    let onClick2 = (event) => {
        console.info("onClick2(" + event.target.value + ")");
        setValue2(event.target.value);
    }

    let onClick3 = (event) => {
        console.info("onClick3(" + event.target.value + ")");
        setValue3(event.target.value);
    }

    let onClick4 = (event) => {
        console.info("onClick4(" + event.target.value + ")");
        setValue4(event.target.value);
    }

    let onClick5 = (event) => {
        console.info("onClick5(" + event.target.value + ")");
        setValue5(event.target.value);
    }

    let onClick6 = (event) => {
        console.info("onClick6(" + event.target.value + ")");
        setValue6(event.target.value);
    }

    let onClickCheckbox1 = (event) => {
        console.info("onClickCheckbox1(" + event.target.value + ")");
    }

    let onClickCheckbox2 = (event) => {
        console.info("onClickCheckbox2(" + event.target.value + ")");
    }

    let onClickCheckbox3 = (event) => {
        console.info("onClickCheckbox3(" + event.target.value + ")");
    }

    let onClickSelect1 = (event) => {
        console.info("onClickSelect1(" + event.target.value + ")");
    }

    let onClickSelect2 = (event) => {
        console.info("onClickSelect2(" + event.target.value + ")");
    }

    let onClickSelect3 = (event) => {
        console.info("onClickSelect3(" + event.target.value + ")");
    }

    let onClickSelect4 = (event) => {
        console.info("onClickSelect4(" + event.target.value + ")");
    }

    let onKeyDown1 = (event) => {
        console.info("onKeyDown1(" + event.target.value + ")");
    }

    let onKeyDown2 = (event) => {
        console.info("onKeyDown2(" + event.target.value + ")");
    }

    let onKeyDown3 = (event) => {
        console.info("onKeyDown3(" + event.target.value + ")");
    }

    let onKeyDown4 = (event) => {
        console.info("onKeyDown4(" + event.target.value + ")");
    }

    let onKeyDown5 = (event) => {
        console.info("onKeyDown5(" + event.target.value + ")");
    }

    let onKeyDown6 = (event) => {
        console.info("onKeyDown6(" + event.target.value + ")");
    }

    return (

        <Container fluid>

            <Tabs id="elements-examples">

                <Tab eventKey="checkbox" title="CheckboxElement Examples">

                    <Table
                        className="table-bordered table-hover table-striped"
                        size="sm"
                    >
                        <thead>
                        <tr>
                            <th>Use Case</th>
                            <th>Rendered Element</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>CheckboxElement with action button</td>
                            <td>
                                <CheckboxElement
                                    action="Checkbox 1"
                                    actionClassName="col-3"
                                    actionVariant="info"
                                    fieldClassName="col-6"
                                    fieldName="checkbox1"
                                    fieldValue={checkbox1}
                                    label="First Checkbox"
                                    labelClassName="col-2"
                                    onBlur={onBlurCheckbox1}
                                    onChange={onChangeCheckbox1}
                                    onClick={onClickCheckbox1}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>CheckboxElement with no action button</td>
                            <td>
                                <CheckboxElement
                                    fieldClassName="col-10"
                                    fieldName="checkbox2"
                                    fieldValue={checkbox2}
                                    label="Second Checkbox"
                                    labelClassName="col-2"
                                    onBlur={onBlurCheckbox2}
                                    onChange={onChangeCheckbox2}
                                    onClick={onClickCheckbox2}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>CheckboxElement disabled</td>
                            <td>
                                <CheckboxElement
                                    disabled
                                    fieldClassName="col-7"
                                    fieldName="checkbox3"
                                    fieldValue={checkbox3}
                                    label="Third Checkbox"
                                    labelClassName="col-2"
                                    onBlur={onBlurCheckbox3}
                                    onChange={onChangeCheckbox3}
                                    onClick={onClickCheckbox3}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </Table>

                </Tab>

                <Tab eventKey="select" title="SelectElement Examples">

                    <Table
                        className="table-bordered table-hover table-striped"
                        size="sm"
                    >
                        <thead>
                        <tr>
                            <th>Use Case</th>
                            <th>Rendered Element</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>SelectElement with action button</td>
                            <td>
                                <SelectElement
                                    action="Select 1"
                                    actionClassName="col-3"
                                    actionVariant="secondary"
                                    fieldClassName="col-6"
                                    fieldName="select1"
                                    fieldValue={select1}
                                    label="First Select"
                                    labelClassName="col-3"
                                    onBlur={onBlurSelect1}
                                    onChange={onChangeSelect1}
                                    onClick={onClickSelect1}
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>SelectElement with no action button</td>
                            <td>
                                <SelectElement
                                    fieldClassName="col-6"
                                    fieldName="select2"
                                    fieldValue={select2}
                                    label="Second Select"
                                    labelClassName="col-3"
                                    onBlur={onBlurSelect2}
                                    onChange={onChangeSelect2}
                                    onClick={onClickSelect2}
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>SelectElement disabled with action button</td>
                            <td>
                                <SelectElement
                                    action="Select 3"
                                    actionClassName="col-3"
                                    actionVariant="dark"
                                    disabled
                                    fieldClassName="col-6"
                                    fieldName="select3"
                                    fieldValue={select3}
                                    label="Third Select"
                                    labelClassName="col-3"
                                    onBlur={onBlurSelect3}
                                    onChange={onChangeSelect3}
                                    onClick={onClickSelect3}
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>SelectElement with no action button or label</td>
                            <td>
                                <SelectElement
                                    fieldClassName="col-6"
                                    fieldName="select4"
                                    fieldValue={select4}
                                    onBlur={onBlurSelect4}
                                    onChange={onChangeSelect4}
                                    onClick={onClickSelect4}
                                    options={options}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </Table>

                </Tab>

                <Tab eventKey="text" title="TextElement Examples">

                    <Table
                        className="table-bordered table-hover table-striped"
                        size="sm"
                    >
                        <thead>
                        <tr>
                            <th>Use Case</th>
                            <th>Rendered Element</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>"text" TextElement with label and action</td>
                            <td>
                                <TextElement
                                    action="Action 1"
                                    actionClassName="col-3"
                                    actionVariant="outline-primary"
                                    fieldClassName="col-7"
                                    fieldName="text1"
                                    fieldValue={value1}
                                    label="Field 1:"
                                    labelClassName="col-2"
                                    onBlur={onBlur1}
                                    onChange={onChange1}
                                    onClick={onClick1}
                                    onKeyDown={onKeyDown1}
                                    type="text"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>"date" TextElement with label (min 2020-07-15, max 2020-11-15)</td>
                            <td>
                                <TextElement
                                    fieldClassName="col-10"
                                    fieldName="date2"
                                    fieldValue={value2}
                                    label="Field 2:"
                                    labelClassName="col-2"
                                    max="2020-11-15"
                                    min="2020-07-15"
                                    onBlur={onBlur2}
                                    onChange={onChange2}
                                    onClick={onClick2}
                                    onKeyDown={onKeyDown2}
                                    type="date"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>"month" TextElement with nothing (min 2019-07, max 2020-11)</td>
                            <td>
                                <TextElement
                                    fieldName="month3"
                                    fieldValue={value3}
                                    max="2020-11"
                                    min="2019-07"
                                    onBlur={onBlur3}
                                    onChange={onChange3}
                                    onClick={onClick3}
                                    onKeyDown={onKeyDown3}
                                    type="month"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>"time" TextElement with action</td>
                            <td>
                                <TextElement
                                    fieldClassName="col-10"
                                    fieldName="time3"
                                    fieldValue={value4}
                                    label="Field 4:"
                                    labelClassName="col-2"
                                    name="text4"
                                    onBlur={onBlur4}
                                    onChange={onChange4}
                                    onClick={onClick4}
                                    onKeyDown={onKeyDown4}
                                    type="time"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>"email" TextElement with label and action</td>
                            <td>
                                <TextElement
                                    action="Action 5"
                                    actionClassName="col-3"
                                    actionVariant="primary"
                                    fieldClassName="col-7"
                                    fieldName="text5"
                                    fieldValue={value5}
                                    label="Field 5:"
                                    labelClassName="col-2"
                                    onBlur={onBlur5}
                                    onChange={onChange5}
                                    onClick={onClick5}
                                    onKeyDown={onKeyDown5}
                                    type="email"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>"tel" TextElement with label and action</td>
                            <td>
                                <TextElement
                                    action="Action 6"
                                    actionClassName="col-3"
                                    actionVariant="primary"
                                    fieldClassName="col-7"
                                    fieldName="text6"
                                    fieldValue={value6}
                                    label="Field 6:"
                                    labelClassName="col-2"
                                    onBlur={onBlur6}
                                    onChange={onChange6}
                                    onClick={onClick6}
                                    onKeyDown={onKeyDown6}
                                    type="tel"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </Table>

                </Tab>

                <Tab eventKey="combined" title="Combined Example">

                    <Table
                        className="table-bordered table-hover table-striped"
                        size="sm"
                    >
                        <thead>
                        <tr>
                            <th>Use Case</th>
                            <th>Rendered Element</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>CheckboxElement with action button</td>
                            <td>
                                <CheckboxElement
                                    action="Checkbox 1"
                                    actionClassName="col-3"
                                    actionVariant="info"
                                    fieldClassName="col-7"
                                    fieldName="checkbox1a"
                                    fieldValue={checkbox1}
                                    label="First Checkbox"
                                    labelClassName="col-2"
                                    onBlur={onBlurCheckbox1}
                                    onChange={onChangeCheckbox1}
                                    onClick={onClickCheckbox1}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>SelectElement with action button</td>
                            <td>
                                <SelectElement
                                    action="Select 1"
                                    actionClassName="col-3"
                                    actionVariant="secondary"
                                    fieldClassName="col-7"
                                    fieldName="select1a"
                                    fieldValue={select1}
                                    label="First Select:"
                                    labelClassName="col-2"
                                    onBlur={onBlurSelect1}
                                    onChange={onChangeSelect1}
                                    onClick={onClickSelect1}
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>"text" TextElement with action button</td>
                            <td>
                                <TextElement
                                    action="Text 1"
                                    actionClassName="col-3"
                                    actionVariant="outline-primary"
                                    fieldClassName="col-7"
                                    fieldName="text1a"
                                    fieldValue={value1}
                                    label="First Text:"
                                    labelClassName="col-2"
                                    onBlur={onBlur1}
                                    onChange={onChange1}
                                    onClick={onClick1}
                                    onKeyDown={onKeyDown1}
                                    type="text"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </Table>

                </Tab>

                <Tab eventKey="tableless" title="Tableless Example">

                    <Container fluid>
                        <Row className="mb-4"/>
                        <Row>
                            <CheckboxElement
                                action="Checkbox 1"
                                actionClassName="col-3"
                                actionVariant="info"
                                fieldClassName="col-7"
                                fieldName="checkbox1b"
                                fieldValue={checkbox1}
                                label="First Checkbox"
                                labelClassName="col-2"
                                onBlur={onBlurCheckbox1}
                                onChange={onChangeCheckbox1}
                                onClick={onClickCheckbox1}
                            />
                        </Row>
                        <Row>
                            <SelectElement
                                action="Select 1"
                                actionClassName="col-3"
                                actionVariant="secondary"
                                fieldClassName="col-7"
                                fieldName="select1b"
                                fieldValue={select1}
                                label="First Select:"
                                labelClassName="col-2"
                                onBlur={onBlurSelect1}
                                onChange={onChangeSelect1}
                                onClick={onClickSelect1}
                                options={options}
                            />
                        </Row>
                        <Row>
                            <TextElement
                                action="Text 1"
                                actionClassName="col-3"
                                actionVariant="outline-primary"
                                fieldClassName="col-7"
                                fieldName="text1b"
                                fieldValue={value1}
                                label="First Text:"
                                labelClassName="col-2"
                                onBlur={onBlur1}
                                onChange={onChange1}
                                onClick={onClick1}
                                onKeyDown={onKeyDown1}
                                type="text"
                            />
                        </Row>
                    </Container>

                </Tab>

            </Tabs>

        </Container>

    );

}

export default SandboxView;
