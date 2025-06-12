"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Container, Row, Col, Alert, } from "react-bootstrap";
import Header from "../components/Header"; // Adjust if Header is elsewhere

const AddClientAccount = () => {
    const router = useRouter();

    // Form state
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        queryLicense: "",
        miningLicense: "",
        village: "",
        tehsil: "",
        district: "",
        state: "",
        country: "",
    });

    // Validation and alert states
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("success");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Format date for createdAt
    const getFormattedDate = () => {
        const now = new Date();
        const date = now.toLocaleDateString("en-GB");
        const time = now.toLocaleTimeString("en-IN");
        return `${date} ${time}`;
    };

    // Reset form fields
    const resetForm = () => {
        setForm({
            name: "",
            mobile: "",
            queryLicense: "",
            miningLicense: "",
            village: "",
            tehsil: "",
            district: "",
            state: "",
            country: "",
        });
        setValidated(false);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formElement = e.currentTarget;
        setValidated(true);

        // If the form has invalid fields, stop
        if (formElement.checkValidity() === false) {
            e.stopPropagation();
            return;
        }

        setIsSubmitting(true);

        // Get accounts from localStorage
        const existingAccounts = JSON.parse(localStorage.getItem("accounts") || "[]");

        // Check for duplicate mobile
        const mobileExists = existingAccounts.some((acc) => acc.mobile === form.mobile);

        if (mobileExists) {
            setAlertVariant("danger");
            setAlertMessage("An account with this mobile number already exists.");
            setShowAlert(true);
            setIsSubmitting(false);
            setTimeout(() => {
                setShowAlert(false);
                resetForm();
            }, 3000);
        } else {
            const newAccount = {
                ...form,
                createdAt: getFormattedDate(),
                status: true,
            };
            existingAccounts.push(newAccount);
            localStorage.setItem("accounts", JSON.stringify(existingAccounts));

            setAlertVariant("success");
            setAlertMessage("Account added successfully!");
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                resetForm();
                router.push("/viewclient-account"); // Next.js navigation
            }, 3000);
        }
    };

    return (
        <>
            <Header />
            <Container className="mt-4 w-75 mx-auto bg-light rounded-4 p-4 shadow">
                <h4 className="mb-3 text-center fw-bold fs-4">Add New Client Account</h4>

                {showAlert && (
                    <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        {/* Left Column */}
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label className="fw-bold">Client Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Enter full name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your name.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMobile">
                                <Form.Label className="fw-bold">Client Mobile <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="mobile"
                                    required
                                    placeholder="10-digit number"
                                    pattern="[0-9]{10}"
                                    value={form.mobile}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Enter a valid 10-digit mobile number.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formQueryLicense">
                                <Form.Label className="fw-bold">Query License <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="queryLicense"
                                    required
                                    placeholder="Enter query license ID"
                                    value={form.queryLicense}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Query License is required.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMiningLicense">
                                <Form.Label className="fw-bold">Mining License <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="miningLicense"
                                    required
                                    placeholder="Enter mining license ID"
                                    value={form.miningLicense}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Mining License is required.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formVillage">
                                <Form.Label className="fw-bold">Nearby Village <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="village"
                                    required
                                    placeholder="Village name"
                                    value={form.village}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the village name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        {/* Right Column */}
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formTehsil">
                                <Form.Label className="fw-bold">Tehsil <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tehsil"
                                    required
                                    placeholder="Tehsil name"
                                    value={form.tehsil}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Tehsil is required.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDistrict">
                                <Form.Label className="fw-bold">District <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="district"
                                    required
                                    placeholder="District name"
                                    value={form.district}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    District is required.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formState">
                                <Form.Label className="fw-bold">State <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="state"
                                    required
                                    placeholder="State name"
                                    value={form.state}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    State is required.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCountry">
                                <Form.Label className="fw-bold">Country <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    required
                                    placeholder="Country name"
                                    value={form.country}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Country is required.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="text-center mt-4 d-flex gap-2 justify-content-center align-items-center flex-wrap ">
                        <Button type="submit" variant="primary" className="px-4 fw-bold rounded-3"
                            disabled={isSubmitting}>
                            {isSubmitting ? "Processing..." : "Create Account"}
                        </Button>
                        <Button variant="secondary" className="px-4 fw-bold rounded-3" onClick={resetForm}>
                            Reset Form
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default AddClientAccount;
