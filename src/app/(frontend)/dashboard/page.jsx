// "use client"; // Required to use client-side features like useState, useEffect, localStorage, etc.

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Container, Row, Col, Card, Navbar, Nav, Button, Spinner } from "react-bootstrap";

// // Icons for different user roles and actions
// import { FaExchangeAlt, FaWallet, FaReceipt } from "react-icons/fa";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { GrUserManager } from "react-icons/gr";
// import { MdAdminPanelSettings } from "react-icons/md";

// import "../styles.css"; // Import global styles

// const Dashboard = () => {
//   const router = useRouter();

//   // These will hold the user's authentication state
//   const [userRole, setUserRole] = useState(null); // e.g., admin, manager, guest
//   const [loading, setLoading] = useState(true);   // Flag to wait until userRole is loaded

//   // Load user role after component mounts
//   useEffect(() => {
//     // This runs only on the client
//     if (typeof window !== "undefined") {
//       const userData = localStorage.getItem("user");
//       const token = localStorage.getItem("token");

//       // If token is missing, redirect to login
//       if (!token || !userData) {
//         router.replace("/");
//         return;
//       }

//       try {
//         const parsedUser = JSON.parse(userData);
//         const role = parsedUser.role;
//         setUserRole(role);
//       } catch (err) {
//         console.error("Error parsing user:", err);
//         console.log("User Role:", userRole);
//         setUserRole(null); // Fallback
//       }

//       setLoading(false); // Done loading after setting role
//     }
//   }, [router]);

//   // Log out handler
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     router.replace("/"); // Back to login page
//   };

//   // Show spinner while loading role
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-warning">
//         <Spinner animation="border" variant="warning" role="status" />
//         <span className="ms-3 fs-5">Loading dashboard...</span>
//       </div>
//     );
//   }

//   return (
//     <div style={{ backgroundColor: "navy", minHeight: "100vh", color: "white" }}>
//       {/* Top navbar */}
//       <Navbar bg="warning" variant="dark" className="px-2 py-2 d-flex justify-content-end align-items-center flex-wrap">
//         <div className="d-flex align-items-center mb-2 mb-md-0">
//           {/* Role-based Icon */}
//           {userRole === "admin" ? (
//             <MdAdminPanelSettings className="me-2 text-dark fs-2" />
//           ) : userRole === "manager" ? (
//             <GrUserManager className="me-2 text-dark fs-2" />
//           ) : userRole === "" ? (
//             <FaMoneyBillTransfer className="me-2 text-dark fs-2" />
//           ) : (
//             <span className="me-2 text-dark fs-2" />
//           )}
//           {/* Role-based Welcome Message */}
//           <span className="text-dark fs-5 fw-bold">
//             Welcome, {userRole === "admin" ? "Administrator" : userRole === "manager" ? "Manager" : userRole === "guest" ? "Client" : ""}
//           </span>
//         </div>

//         {/* Logout Button */}
//         <Nav>
//           <Button variant="dark" onClick={handleLogout} className="ms-0 ms-md-2 fs-6 fw-bolder rounded-5">
//             Logout
//           </Button>
//         </Nav>
//       </Navbar>

//       {/* Brand Name */}
//       <Container className="text-center py-4">
//         <h2 className="fw-bold text-warning">JODHPUR MINES</h2>
//         <p className="text-light fs-5 fw-medium">Financial Management System Dashboard</p>
//       </Container>

//       {/* Dashboard Cards Section */}
//       <Container fluid className="pb-5">
//         <Row className="gx-4 gy-4 d-flex flex-wrap justify-content-center">
//           {/* Manager or Admin shared cards */}
//           {(userRole === "admin" || userRole === "manager") && (
//             <>
//               {/* Client Transactions */}
//               <DashboardCard title="Clients Transaction" desc="View all client transactions" icon={<FaExchangeAlt size={60} />} bg="warning" text="dark" onClick={() => router.push("/viewclient-transaction")} />

//               {/* Vendor Transactions */}
//               <DashboardCard title="Vendor Transactions" desc="View all vendor transactions" icon={<FaExchangeAlt size={60} />} bg="dark" text="warning" onClick={() => router.push("/viewvendor-transaction")} />

//               {/* Client Accounts */}
//               <DashboardCard title="Client Accounts" desc="Manage client accounts" icon={<FaWallet size={60} />} bg="warning" text="dark" onClick={() => router.push("/viewclient-account")} />

//               {/* Vendor Accounts */}
//               <DashboardCard title="Vendor Accounts" desc="Manage vendor accounts" icon={<FaWallet size={60} />} bg="dark" text="warning" onClick={() => router.push("/viewvendor-account")} />
//             </>
//           )}

//           {/* Admin-only Expense Card */}
//           {userRole === "admin" && (
//             <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
//               <Card className="text-center w-100 shadow border-4 border-warning cursor-pointer"
//                 style={{ backgroundColor: "navy" }} text="warning"
//                 onClick={() => router.push("/view-expense")}>
//                 <Card.Body className="d-flex flex-column align-items-center">
//                   <FaReceipt size={65} className="mb-3 text-warning" />
//                   <Card.Title className="fs-3 fw-bold">Expenses</Card.Title>
//                   <Card.Text className="fs-6 fw-bold">Track and manage expenses</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           )}

//           {/* Guest (Client) Card */}
//           {userRole === "guest" && (
//             <DashboardCard title="Client Transaction" desc="Add a client transaction" icon={<FaReceipt size={65} />} bg="warning" text="dark" onClick={() => router.push("/client-transaction")} />
//           )}
//         </Row>
//       </Container>
//     </div>
//   );
// };
// // Reusable Dashboard Card Component
// const DashboardCard = ({ title, desc, icon, onClick, bg = "warning", text = "dark" }) => (
//   <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
//     <Card
//       className={`text-center bg-${bg} text-${text} w-100 shadow rounded-5`}
//       style={{ cursor: "pointer", transition: "all 0.3s ease" }}
//       onClick={onClick}
//     >
//       <Card.Body className="d-flex flex-column align-items-center">
//         <div className={`mb-3 text-${text}`}>{icon}</div>
//         <Card.Title className="fs-5 fw-bold">{title}</Card.Title>
//         <Card.Text className="fs-6 fw-bold">{desc}</Card.Text>
//       </Card.Body>
//     </Card>
//   </Col>
// );

// export default Dashboard;
"use client"; // This line is crucial for Next.js to know this component runs on the client-side, allowing us to use hooks like useState and access browser-specific objects like localStorage.

import React from "react"; // We need React to build our component.
import { Container, Row, Col, Card, Navbar, Nav, Button } from "react-bootstrap";
// Importing specific components from react-bootstrap for layout and UI elements.

// Importing icons from react-icons. These are special components that render SVG icons.
import { FaExchangeAlt, FaWallet, FaReceipt } from "react-icons/fa"; // Common Font Awesome icons
import { FaMoneyBillTransfer } from "react-icons/fa6"; // Newer Font Awesome icon (Fa6)
import { GrUserManager } from "react-icons/gr"; // Grommet React icon for manager
import { MdAdminPanelSettings } from "react-icons/md"; // Material Design icon for admin

import { useRouter } from "next/navigation"; //This hook allows us to navigate between pages in Next.js.
import "../styles.css"; // Make sure this path is correct for your global styles.

// This is our main Dashboard functional component.
const Dashboard = () => {
  // Initialize the router. We'll use this to redirect users.
  const router = useRouter();
  // Get the user's Userdata from localStorage. localStorage is a browser feature that lets us store small pieces of data that persist even if the user closes and reopens the browser. We check `typeof window !== "undefined"` because localStorage is only available in the browser, not during server-side rendering in Next.js.

  let Userdata;
  let Token;
  if (typeof window !== "undefined") {
    // If it's in the browser, get the user data from localStorage
    Userdata = localStorage.getItem("user");
    Token = localStorage.getItem("token");
  } else {
    // If not in the browser (for example, on the server), keep it as null
    Userdata = null;
    Token = null;
  }

  // Set the user's role based on the data we got from localStorage If user data exists, parse it from JSON and get the role If there is no role or no user data, default to "client"
  let UserRole;
  if (Userdata) {
    const parsedUser = JSON.parse(Userdata); // Convert string to object
    UserRole = parsedUser.role ? parsedUser.role : ""; // Get role or set to "client"
    //console.log("User Role:", UserRole); // Show the role in the browser console for debugging
  }

  // Function to handle logging out the user.
  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/api/logout'
  }

  return (
    // The main container for our dashboard, with a dark blue background.
    <div style={{ backgroundColor: "navy", minHeight: "100vh", color: "white" }}>

      <Navbar bg="warning" variant="dark" className="px-2 py-2 d-flex justify-content-end align-items-center flex-wrap">
        {/* Container for the welcome message and icon */}
        <div className="d-flex align-items-center mb-2 mb-md-0">
          {/* Conditional rendering for the icon based on the user's Userdata */}
          {UserRole === "admin" ? (
            // If the Userdata is 'admin' or 'guest', show the Admin Panel Settings icon
            <MdAdminPanelSettings className="me-2 text-dark fs-2" />
          ) : UserRole === "manager" ? (
            // If the Userdata is 'manager', show the User Manager icon
            <GrUserManager className="me-2 text-dark fs-2" />
          ) : UserRole === "guest" ? (
            // If the Userdata is 'client' (or any other Userdata), show the Money Bill Transfer icon
            <FaMoneyBillTransfer className="me-2 text-dark fs-2" />
          ) : (
            // If the Userdata is 'client' (or any other Userdata), show the Money Bill Transfer icon
            <span className="me-2 text-dark fs-2" />
          )}

          {/* Welcome message text, also conditional based on Userdata */}
          <span className="text-dark fs-5 fw-bold">
            Welcome,{" "} {UserRole === "admin" ? "Administrator" : UserRole === "manager" ? "Manager" : UserRole === "guest" ? "Client" : ""}
          </span>
        </div>
        {/* Navigation section for the logout button */}
        <Nav className="ms-2">
          <Button variant="dark" onClick={handleLogout} className="fs-6 fw-bolder rounded-5">
            Logout
          </Button>
        </Nav>
      </Navbar>

      {/* Branding Section. In This section contains the brand name and tagline. */}
      <Container className="text-center py-4">
        <h2 className="fw-bold text-warning">JODHPUR MINES</h2>
        <p className="text-light fs-5 fw-medium">
          Financial Management System Dashboard
        </p>
      </Container>

      {/* Dashboard Cards Section. In This section contains interactive cards that link to different pages. */}
      <Container fluid className="pb-5">
        <Row className="gx-4 gy-4 d-flex flex-wrap justify-content-center">
          {/* Manager-Specific Cards */}
          {/* These cards are only shown if the user's role is "manager". */}
          {UserRole === "manager" && (
            <>
              {/* Client Transactions Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card className="text-center bg-warning text-dark w-100 shadow rounded-5 cursor-pointer hover:bg-dark hover:text-warning hover:shadow-lg" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => router.push("/viewclient-transaction")}>
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaExchangeAlt size={60} className="mb-3 text-dark hover:text-warning" /> {/* Icon */}
                    <Card.Title className="fs-5 fw-bold">Clients Transaction</Card.Title>
                    <Card.Text className="fs-6 fw-bold">View all client transactions</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Vendor Transactions Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card className="text-center bg-dark text-warning w-100 shadow rounded-5 cursor-pointer hover:bg-warning hover:text-dark hover:shadow-lg" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => router.push("/viewvendor-transaction")}>
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaExchangeAlt size={60} className="mb-3 text-warning hover:text-dark" />
                    <Card.Title className="fs-5 fw-bold">Vendor Transactions</Card.Title>
                    <Card.Text className="fs-6 fw-bold">View all vendor transactions</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Client Accounts Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card className="text-center bg-warning text-dark w-100 shadow rounded-5 cursor-pointer hover:bg-dark hover:text-warning hover:shadow-lg" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => router.push("/viewclient-account")}>
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaWallet size={60} className="mb-3 text-dark hover:text-warning" />
                    <Card.Title className="fs-5 fw-bold">Client Accounts</Card.Title>
                    <Card.Text className="fs-6 fw-bold">Manage client accounts</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Vendor Accounts Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card className="text-center bg-dark text-warning w-100 shadow rounded-5 cursor-pointer hover:bg-warning hover:text-dark hover:shadow-lg" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => router.push("/viewvendor-account")}>
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaWallet size={60} className="mb-3 text-warning hover:text-dark" />
                    <Card.Title className="fs-5 fw-bold">Vendor Accounts</Card.Title>
                    <Card.Text className="fs-6 fw-bold">Manage vendor accounts</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}

          {/* Admin-Specific Cards */}
          {/* These cards are only shown if the user's UserRole is "admin". */}
          {(UserRole === "admin") && (
            <>
              {/* Client Transactions Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card className="text-center bg-warning text-dark w-100 shadow rounded-5 cursor-pointer hover:bg-dark hover:text-warning hover:shadow-lg" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => router.push("/viewclient-transaction")} >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaExchangeAlt size={60} className="mb-3 text-dark hover:text-warning" /> {/* Icon */}
                    <Card.Title className="fs-5 fw-bold">Clients Transaction</Card.Title>
                    <Card.Text className="fs-6 fw-bold">View all client transactions</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Vendor Transactions Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card className="text-center bg-dark text-warning w-100 shadow rounded-5 cursor-pointer hover:bg-warning hover:text-dark hover:shadow-lg" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => router.push("/viewvendor-transaction")}>
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaExchangeAlt size={60} className="mb-3 text-warning hover:text-dark" />
                    <Card.Title className="fs-5 fw-bold">Vendor Transactions</Card.Title>
                    <Card.Text className="fs-6 fw-bold">View all vendor transactions</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Client Accounts Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card className="text-center bg-warning text-dark w-100 shadow rounded-5 cursor-pointer hover:bg-dark hover:text-warning hover:shadow-lg" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => router.push("/viewclient-account")}>
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaWallet size={60} className="mb-3 text-dark hover:text-warning" />
                    <Card.Title className="fs-5 fw-bold">Client Accounts</Card.Title>
                    <Card.Text className="fs-6 fw-bold">Manage client accounts</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Vendor Accounts Card */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card className="text-center bg-dark text-warning w-100 shadow rounded-5 cursor-pointer hover:bg-warning hover:text-dark hover:shadow-lg" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => router.push("/viewvendor-account")}>
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaWallet size={60} className="mb-3 text-warning hover:text-dark" />
                    <Card.Title className="fs-5 fw-bold">Vendor Accounts</Card.Title>
                    <Card.Text className="fs-6 fw-bold">Manage vendor accounts</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Expense Card (Specific to Admin) */}
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card className="text-center w-100 shadow border-4 border-warning cursor-pointer"
                  style={{ backgroundColor: "navy" }} text="warning" onClick={() => router.push("/view-expense")}>
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaReceipt size={65} className="mb-3 text-warning" />
                    <Card.Title className="fs-3 fw-bold">Expenses</Card.Title>
                    <Card.Text className="fs-6 fw-bold">Track and manage expenses</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}

          {/* Client-Specific Card. In this card is only shown if the user's Userdata is "guest". */}
          {UserRole === "guest" && (
            <>
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card className="text-center bg-warning text-dark w-100 shadow rounded-5 cursor-pointer hover:bg-dark hover:text-warning hover:shadow-lg" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => router.push("/client-transaction")}>
                  <Card.Body className="d-flex flex-column align-items-center">
                    <FaReceipt size={65} className="mb-3 text-dark hover:text-warning" />
                    <Card.Title className="fs-3 fw-bold">Client Transaction</Card.Title>
                    <Card.Text className="fs-6 fw-bold">Add a client transactions</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4} lg={2} className="d-flex">
  <Card className="text-center bg-warning text-dark w-100 shadow rounded-5 cursor-pointer hover:bg-dark hover:text-warning hover:shadow-lg" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => router.push("/add-account")}>  
    <Card.Body className="d-flex flex-column align-items-center">
      <FaWallet size={60} className="mb-3 text-dark hover:text-warning" />
      <Card.Title className="fs-5 fw-bold">Add Account</Card.Title>
      <Card.Text className="fs-6 fw-bold">Create a new account</Card.Text>
    </Card.Body>
  </Card>
</Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;