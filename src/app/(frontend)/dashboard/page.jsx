"use client"; // Required for using useState and useRouter in Next.js

import React from "react";
import { Container, Row, Col, Card, Navbar, Nav, Button } from "react-bootstrap";
import { FaExchangeAlt, FaWallet, FaReceipt, FaExclamationTriangle } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Used instead of react-router
import "../styles.css"; // Update path based on your project setup

const Dashboard = () => {
  const router = useRouter();

  // Get role from localStorage (admin or manager)
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : "";

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    router.push("/login"); // Redirect to login page
  };

  return (
    <div style={{ backgroundColor: "navy", minHeight: "100vh", color: "white" }}>
      {/* Top Navbar with greeting and logout button */}
      <Navbar bg="warning" variant="dark" className="px-2 py-2 d-flex justify-content-end align-items-center flex-wrap">
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <FaExclamationTriangle className="me-2 text-dark fs-2" />
          <span className="text-dark fs-5 fw-bold">
            Welcome, {role === "admin" ? "Administrator" : role === "manager" ? "Manager" : "Client"}
          </span>
        </div>
        <Nav className="ms-2">
          <Button variant="dark" onClick={handleLogout} className="fs-6 fw-bolder rounded-5">
            Logout
          </Button>
        </Nav>
      </Navbar>

      {/* Branding Section */}
      <Container className="text-center py-4">
        <h2 className="fw-bold text-warning">JODHPUR MINES</h2>
        <p className="text-light fs-5 fw-medium">
          Financial Management System Dashboard
        </p>
      </Container>

      {/* Dashboard Cards Section */}
      <Container fluid className="pb-5">
        <Row className="gx-4 gy-4 d-flex flex-wrap justify-content-center">
          {/* Each Col adjusts responsively without causing overflow */}
          {role === "manager" && (
            <>
              {/* Client Transactions Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card
                  bg="warning"
                  text="dark"
                  className="text-center w-100 shadow rounded-5"
                  onClick={() => router.push("/viewclient-transaction")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaExchangeAlt size={60} className="mb-3 text-dark" />
                    <Card.Title className="fs-5 fw-bold">Clients Transaction</Card.Title>
                    <Card.Text className="fs-6 fw-bold">View all client transactions</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Vendor Transactions Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card
                  bg="dark"
                  text="warning"
                  className="text-center w-100 shadow border border-4 border-warning rounded-5"
                  onClick={() => router.push("/viewvendor-transaction")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaExchangeAlt size={60} className="mb-3 text-warning" />
                    <Card.Title className="fs-5 fw-bold">Vendor Transactions</Card.Title>
                    <Card.Text className="fs-6 fw-bold">View all vendor transactions</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Client Accounts Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card
                  bg="warning"
                  text="dark"
                  className="text-center w-100 shadow rounded-5"
                  onClick={() => router.push("/viewclient-account")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaWallet size={60} className="mb-3 text-dark" />
                    <Card.Title className="fs-5 fw-bold">Client Accounts</Card.Title>
                    <Card.Text className="fs-6 fw-bold">Manage client accounts</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Vendor Accounts Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card
                  bg="dark"
                  text="warning"
                  className="text-center w-100 shadow border border-4 border-warning rounded-5"
                  onClick={() => router.push("/viewvendor-account")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaWallet size={60} className="mb-3 text-warning" />
                    <Card.Title className="fs-5 fw-bold">Vendor Accounts</Card.Title>
                    <Card.Text className="fs-6 fw-bold">Manage vendor accounts</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )

          }
          

          {/* Expense Card (Only for Admin) */}
          {role === "admin" && (
            <>
              {/* Client Transactions Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card
                  bg="warning"
                  text="dark"
                  className="text-center w-100 shadow rounded-5"
                  onClick={() => router.push("/viewclient-transaction")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaExchangeAlt size={60} className="mb-3 text-dark" />
                    <Card.Title className="fs-5 fw-bold">Clients Transaction</Card.Title>
                    <Card.Text className="fs-6 fw-bold">View all client transactions</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Vendor Transactions Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card
                  bg="dark"
                  text="warning"
                  className="text-center w-100 shadow border border-4 border-warning rounded-5"
                  onClick={() => router.push("/viewvendor-transaction")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaExchangeAlt size={60} className="mb-3 text-warning" />
                    <Card.Title className="fs-5 fw-bold">Vendor Transactions</Card.Title>
                    <Card.Text className="fs-6 fw-bold">View all vendor transactions</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Client Accounts Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card
                  bg="warning"
                  text="dark"
                  className="text-center w-100 shadow rounded-5"
                  onClick={() => router.push("/viewclient-account")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaWallet size={60} className="mb-3 text-dark" />
                    <Card.Title className="fs-5 fw-bold">Client Accounts</Card.Title>
                    <Card.Text className="fs-6 fw-bold">Manage client accounts</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Vendor Accounts Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card
                  bg="dark"
                  text="warning"
                  className="text-center w-100 shadow border border-4 border-warning rounded-5"
                  onClick={() => router.push("/viewvendor-account")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaWallet size={60} className="mb-3 text-warning" />
                    <Card.Title className="fs-5 fw-bold">Vendor Accounts</Card.Title>
                    <Card.Text className="fs-6 fw-bold">Manage vendor accounts</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card
                  className="text-center w-100 shadow border-4 border-warning"
                  style={{ backgroundColor: "navy", cursor: "pointer" }}
                  text="warning"
                  onClick={() => router.push("/view-expense")}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaReceipt size={65} className="mb-3 text-warning" />
                    <Card.Title className="fs-3 fw-bold">Expenses</Card.Title>
                    <Card.Text className="fs-6 fw-bold">Track and manage expenses</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}

          {/* Client Transaction Card (Only for Client) */}
          {role === "client" && (
            <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
              <Card
                className="text-center w-100 shadow border-4 border-warning"
                style={{ backgroundColor: "navy", cursor: "pointer" }}
                text="warning"
                onClick={() => router.push("/client-transaction")}
              >
                <Card.Body className="d-flex flex-column align-items-center">
                  <FaReceipt size={65} className="mb-3 text-warning" />
                  <Card.Title className="fs-3 fw-bold">Client Transaction</Card.Title>
                  <Card.Text className="fs-6 fw-bold">Add a client transactions</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
