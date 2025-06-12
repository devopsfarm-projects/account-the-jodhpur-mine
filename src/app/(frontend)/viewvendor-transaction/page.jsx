'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Table, Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import { EyeFill, PencilSquare } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faClipboard, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";
import Header from "../components/Header";  // Adjust path if needed

const ViewVendorTransaction = () => {
    const router = useRouter();

    const [vendorTxns, setVendorTxns] = useState([]);
    const [filteredTxns, setFilteredTxns] = useState([]);

    const [searchName, setSearchName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [selectedTxn, setSelectedTxn] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Load data from localStorage on first render
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("VendorTransactions") || "[]");
        setVendorTxns(data);
        setFilteredTxns(data);
    }, []);

    // Apply filters for name and date
    function applyFilters(name, start, end) {
        const filtered = vendorTxns.filter(txn => {
            const matchesName = txn.vendorName.toLowerCase().includes(name.toLowerCase());
            const [datePart] = txn.createdAt.split(" ");
            const [dd, mm, yyyy] = datePart.split("/");
            const txnDate = new Date(`${yyyy}-${mm}-${dd}`);

            const startObj = start ? new Date(start) : null;
            const endObj = end ? new Date(end) : null;

            const afterStart = startObj ? txnDate >= startObj : true;
            const beforeEnd = endObj ? txnDate <= endObj : true;

            return matchesName && afterStart && beforeEnd;
        });
        setFilteredTxns(filtered);
    }

    const handleSearch = (e) => {
        setSearchName(e.target.value);
        applyFilters(e.target.value, startDate, endDate);
    };

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
        applyFilters(searchName, e.target.value, endDate);
    };

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
        applyFilters(searchName, startDate, e.target.value);
    };

    const handleView = (txn) => {
        setSelectedTxn(txn);
        setShowModal(true);
    };

    const handleEdit = (id) => {
        router.push(`/editvendor-transaction/${id}`);
    };

    return (
        <>
            <Header />

            <Container className="mt-4 mb-5">
                <h4 className="text-center mb-4">
                    <FontAwesomeIcon icon={faClipboard} /> View Vendor All Transactions
                </h4>

                {/* Search & Filter */}
                <Form className="mb-4">
                    <Row className="gy-3 gx-3 align-items-end">
                        <Col xs={12} md={4}>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by vendor name..."
                                    value={searchName}
                                    onChange={handleSearch}
                                />
                                <InputGroup.Text><FaSearch /></InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={handleStartDate}
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={handleEndDate}
                            />
                        </Col>
                    </Row>
                </Form>

                {/* Transactions Table */}
                <div className="table-responsive">
                    <Table
                        striped
                        bordered
                        hover
                        className="text-center align-middle fs-6 fw-medium"
                    >
                        <thead className="table-dark">
                            <tr>
                                <th>Vendor Name</th>
                                <th>Date & Time</th>
                                <th><FontAwesomeIcon icon={faIndianRupeeSign} /> Total</th>
                                <th><FontAwesomeIcon icon={faIndianRupeeSign} /> Credits</th>
                                <th><FontAwesomeIcon icon={faIndianRupeeSign} /> Remaining</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTxns.length > 0 ? filteredTxns.map((txn, idx) => (
                                <tr key={idx}>
                                    <td>{txn.vendorName}</td>
                                    <td>{txn.createdAt}</td>
                                    <td><FontAwesomeIcon icon={faIndianRupeeSign} /> {txn.totalAmount}</td>
                                    <td><FontAwesomeIcon icon={faIndianRupeeSign} /> {txn.totalCredits}</td>
                                    <td><FontAwesomeIcon icon={faIndianRupeeSign} /> {txn.remainingAmount}</td>
                                    <td>
                                        <Button variant="info" size="sm" className="me-0 me-md-2 mb-2 mb-md-0 justify-content-center align-items-center "
                                            onClick={() => handleView(txn)}>
                                            <EyeFill />
                                        </Button>
                                        <Button variant="warning" size="sm" onClick={() => handleEdit(idx)}>
                                            <PencilSquare />
                                        </Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6">No Vendor Transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* Details Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Transaction Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedTxn && (
                            <>
                                <p><strong>Date & Time:</strong> {selectedTxn.createdAt}</p>
                                <p><strong>Vendor:</strong> {selectedTxn.vendorName}</p>
                                <p><strong>Total Amount:</strong> <FontAwesomeIcon icon={faIndianRupeeSign} /> {selectedTxn.totalAmount}</p>
                                <p><strong>Token:</strong> <FontAwesomeIcon icon={faIndianRupeeSign} /> {selectedTxn.tokenAmount}</p>
                                <p><strong>Credits:</strong> <FontAwesomeIcon icon={faIndianRupeeSign} /> {selectedTxn.totalCredits}</p>
                                <p><strong>Remaining:</strong> <FontAwesomeIcon icon={faIndianRupeeSign} /> {selectedTxn.remainingAmount}</p>
                                <p><strong>Description:</strong> {selectedTxn.description}</p>
                                <hr />
                                <h6>
                                    <FontAwesomeIcon icon={faScrewdriverWrench} /> Work Items:
                                </h6>
                                <ul>
                                    {selectedTxn.workingStages.map((s, i) => (
                                        <li key={i}>
                                            {s.work}: <FontAwesomeIcon icon={faIndianRupeeSign} /> {s.amount}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
}
export default ViewVendorTransaction;