//pages/view-client-account.jsx
// "use client";
// import { useEffect, useState } from "react";
// import { Table, Button, Container, Modal, Card, Row, Col, Form, Badge, InputGroup } from "react-bootstrap";
// import { FaEye, FaTrash, FaSearch, FaClipboard } from "react-icons/fa";
// import Header from "../components/Header"; // adjust path if needed

// const ViewClientAccount = () => {
//   const [accounts, setAccounts] = useState([]); // All accounts
//   const [filteredAccounts, setFilteredAccounts] = useState([]); // Filtered list for search
//   const [searchTerm, setSearchTerm] = useState(""); // Search input
//   const [showModal, setShowModal] = useState(false); // Modal open state
//   const [selectedAccount, setSelectedAccount] = useState(null); // Account to show in modal

//   // Load data from localStorage when component mounts (only in browser)
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const stored = JSON.parse(localStorage.getItem("accounts") || "[]");
//       setAccounts(stored);
//       setFilteredAccounts(stored);
//     }
//   }, []);

//   // Handle search filter
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = accounts.filter((acc) =>
//       acc.name.toLowerCase().includes(value) ||
//       acc.mobile.includes(value) ||
//       acc.queryLicense.toLowerCase().includes(value) ||
//       acc.miningLicense.toLowerCase().includes(value)
//     );
//     setFilteredAccounts(filtered);
//   };

//   // Toggle status active/inactive
//   const toggleStatus = (index) => {
//     const selected = filteredAccounts[index];
//     const updatedStatus = !selected.status;

//     // Update main accounts list
//     const updatedAccounts = accounts.map((acc) =>
//       acc.createdAt === selected.createdAt ? { ...acc, status: updatedStatus } : acc
//     );

//     // Save to localStorage and update state
//     localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
//     setAccounts(updatedAccounts);

//     // Update filtered list
//     const updatedFiltered = filteredAccounts.map((acc, i) =>
//       i === index ? { ...acc, status: updatedStatus } : acc
//     );
//     setFilteredAccounts(updatedFiltered);
//   };

//   // Delete account by matching createdAt
//   const deleteAccount = (index) => {
//     const toDelete = filteredAccounts[index];
//     const updated = accounts.filter(
//       (acc) => acc.createdAt !== toDelete.createdAt
//     );

//     localStorage.setItem("accounts", JSON.stringify(updated));
//     setAccounts(updated);
//     setFilteredAccounts(filteredAccounts.filter((_, i) => i !== index));
//   };

//   // Open modal with selected account
//   const handleView = (acc) => {
//     setSelectedAccount(acc);
//     setShowModal(true);
//   };

//   return (
//     <>
//       <Header />

//       {/* Title and Search */}
//       <Container fluid className="py-3">
//         <Row className="text-center align-items-center mb-3">
//           <Col xs={12} md={6}>
//             <h4 className="fw-bold">
//               <FaClipboard /> View All Client's Account
//             </h4>
//           </Col>
//           <Col xs={12} md={6} className="mt-2 mt-md-0">
//             <InputGroup className="mx-auto" style={{ maxWidth: "400px" }}>
//               <InputGroup.Text>
//                 <FaSearch />
//               </InputGroup.Text>
//               <Form.Control
//                 type="text"
//                 placeholder="Search by Name, Mobile, License"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </InputGroup>
//           </Col>
//         </Row>

//         {/* Responsive Table */}
//         <div className="table-responsive">
//           <Table className="table-bordered table-hover text-center align-middle">
//             <thead className="table-dark">
//               <tr>
//                 <th>S.No</th>
//                 <th>Name</th>
//                 <th>Mobile</th>
//                 <th>Query License</th>
//                 <th>Mining License</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredAccounts.length > 0 ? (
//                 filteredAccounts.map((acc, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{acc.name}</td>
//                     <td>{acc.mobile}</td>
//                     <td>{acc.queryLicense}</td>
//                     <td>{acc.miningLicense}</td>
//                     <td>
//                       <Button
//                         variant={acc.status ? "success" : "danger"}
//                         size="sm"
//                         onClick={() => toggleStatus(index)}
//                       >
//                         {acc.status ? "Active" : "Inactive"}
//                       </Button>
//                     </td>
//                     <td>
//                       <Button
//                         variant="info"
//                         size="sm"
//                         className="me-0 me-md-2 mb-1 mb-md-0 justify-content-center align-items-center"
//                         onClick={() => handleView(acc)}
//                       >
//                         <FaEye />
//                       </Button>
//                       <Button
//                         variant="warning"
//                         size="sm"
//                         onClick={() => deleteAccount(index)}
//                       >
//                         <FaTrash />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-secondary fw-bold fs-5">
//                     No Client Accounts Found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </Container>

//       {/* Modal View */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Account Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedAccount && (
//             <Card className="shadow-sm border-0">
//               <Card.Body>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Name:</strong> {selectedAccount.name}</Col>
//                   <Col md={6}><strong>Mobile:</strong> {selectedAccount.mobile}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Query License:</strong> {selectedAccount.queryLicense}</Col>
//                   <Col md={6}><strong>Mining License:</strong> {selectedAccount.miningLicense}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Village:</strong> {selectedAccount.village}</Col>
//                   <Col md={6}><strong>Tehsil:</strong> {selectedAccount.tehsil}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>District:</strong> {selectedAccount.district}</Col>
//                   <Col md={6}><strong>State:</strong> {selectedAccount.state}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Country:</strong> {selectedAccount.country}</Col>
//                   <Col md={6}>
//                     <strong>Status:</strong>{" "}
//                     <Badge bg={selectedAccount.status ? "success" : "danger"}>
//                       {selectedAccount.status ? "Active" : "Inactive"}
//                     </Badge>
//                   </Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col><strong>Created At:</strong> {selectedAccount.createdAt}</Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           )}
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };
// export default ViewClientAccount;


// "use client"; // Enables client-side interactivity in Next.js
// import React, { useEffect, useState } from "react";
// import { Table, Button, Container, Modal, Card, Row, Col, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
// import { FaEye, FaTrash, FaSearch, FaClipboard } from "react-icons/fa"; // Icons for View, Delete, Search, Clipboard
// import { useRouter } from "next/navigation"; // For programmatic redirection
// import Header from "../components/Header"; // Reuse your Header component
// import axios from "axios"; // Using axios for API calls for consistency and features
// // Helper function to format date to DD/MM/YYYY for Indian context
// const formatDate = (dateString) => {
//   const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: "Asia/Kolkata" };
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-GB", options); // British format = DD/MM/YYYY
// };
// // Helper function to format time to HH:MM:SS AM/PM for Indian context
// const formatTime = (dateString) => {
//   const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: "Asia/Kolkata" };
//   const time = new Date(dateString);
//   return time.toLocaleTimeString("en-US", options); // US format = HH:MM:SS AM/PM
// };

// const ViewClientAccount = () => {
//   const router = useRouter(); // Initialize router for navigation
//   const [userRole, setUserRole] = useState(null); // State to store the user's role for access control

//   const [accounts, setAccounts] = useState([]); // Stores all client accounts fetched from the API
//   const [filteredAccounts, setFilteredAccounts] = useState([]); // Stores accounts after applying search filter
//   const [searchTerm, setSearchTerm] = useState(""); // User's input for the search bar

//   const [loading, setLoading] = useState(true); // Controls the display of a loading spinner
//   const [error, setError] = useState(""); // Stores and displays any error messages

//   const [showModal, setShowModal] = useState(false); // Controls the visibility of the client details modal
//   const [selectedAccount, setSelectedAccount] = useState(null); // Stores the data of the client account selected for viewing in the modal

//   // 🚀 ACCESS CONTROL: Check user role immediately on component mount
//   useEffect(() => {
//     if (typeof window !== "undefined") { // Ensure this code runs only in the browser
//       const userData = localStorage.getItem("user");
//       let role = null;
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           role = parsedUser.role;
//           setUserRole(role); // Set the role to state
//         } catch (parseError) {
//           console.error("Error parsing user data from localStorage in ViewClientAccount:", parseError);
//           // If parsing fails, default to an unauthorized state
//         }
//       }

//       // If the user's role is not 'admin' or 'manager', redirect them.
//       // This is a client-side gate; server-side validation is also paramount.
//       if (role !== 'admin' && role !== 'manager') {
//         console.warn(`Unauthorized access attempt to ViewClientAccount by user with role: ${role || 'undefined'}. Redirecting...`);
//         setError("You do not have permission to access this page. Redirecting...");
//         // Use a slight delay for user to see the message before redirect
//         setTimeout(() => {
//           localStorage.clear()
//           window.location.href = '/api/logout'
//         }, 1500); // Redirect after 1.5 seconds
//       } else {
//         // If authorized, proceed to fetch data
//         setLoading(false); // End initial loading for role check
//       }
//     }
//   }, [router]); // Re-run if router object changes (rare)

//   // 🚀 PERFORMANCE / DATA FETCHING: Fetch data from Payload CMS when the component mounts
//   // This useEffect will run only if the userRole is determined to be 'admin' or 'manager'
//   useEffect(() => {
//     // Only fetch accounts if the user is authorized (admin or manager)
//     if (userRole === 'admin' || userRole === 'manager') {
//       const fetchAccounts = async () => {
//         setLoading(true); // Start loading before fetching data
//         setError(""); // Clear previous errors
//         try {
//           // Make a GET request to your client-accounts API endpoint
//           const response = await axios.get("/api/client-accounts");
//           console.log(response.data);
//           const data = response.data.docs; // Payload CMS typically returns data in a 'docs' array
//           setAccounts(data); // Store all fetched accounts
//           setFilteredAccounts(data); // Initialize filtered accounts with all accounts
//         } catch (err) {
//           console.error("Failed to fetch client accounts:", err);
//           setError("Failed to load client accounts. Please try again.");
//         } finally {
//           setLoading(false); // End loading after fetch attempt
//         }
//       };

//       fetchAccounts();
//     } else if (userRole !== null) { // If userRole is determined but not authorized
//       setLoading(false); // Stop loading as no data will be fetched
//     }
//   }, [userRole]); // Dependency on userRole ensures fetch happens after role is set

//   // Handle user search input and filter accounts dynamically
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase(); // Get search term and convert to lower case for case-insensitive search
//     setSearchTerm(value); // Update search term state

//     // Filter the original 'accounts' array, not the already filtered one
//     const filtered = accounts.filter((acc) =>
//       // Check if clientName, clientMobile, query_license, or mining_license includes the search term
//       acc.clientName?.toLowerCase().includes(value) ||
//       acc.clientMobile?.includes(value) ||
//       acc.query_license?.toLowerCase().includes(value) ||
//       acc.mining_license?.toLowerCase().includes(value)
//     );

//     setFilteredAccounts(filtered); // Update the displayed accounts
//   };

//   // Handle delete operation by calling DELETE API
//   const deleteAccount = async (id) => {
//     // Confirmation dialog before deletion
//     if (window.confirm("Are you sure you want to delete this client account? This action cannot be undone.")) {
//       try {
//         await axios.delete(`/api/client-accounts/${id}`); // Send DELETE request to the API
//         // Update both accounts and filteredAccounts states to reflect the deletion immediately
//         const updated = accounts.filter((acc) => acc.id !== id);
//         setAccounts(updated);
//         setFilteredAccounts(updated);
//         alert("Client account deleted successfully!"); // Success feedback
//       } catch (err) {
//         console.error("Error deleting client account:", err);
//         alert("Error deleting client account. Please try again."); // Error feedback
//       }
//     }
//   };

//   // Open modal and set the selected client account data to be displayed
//   const handleView = (acc) => {
//     setSelectedAccount(acc); // Store the account object
//     setShowModal(true); // Show the modal
//   };

//   // 🚀 PERFORMANCE: Show loading spinner while initial data or user role is being determined
//   if (loading || userRole === null) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="border" variant="primary" />
//         <p className="fw-semibold my-2 ms-2">Loading Please Wait...</p>
//       </div>
//     );
//   }

//   // Display unauthorized message if user role is not admin or manager
//   if (userRole !== 'admin' && userRole !== 'manager') {
//     return (
//       <>
//         <Container className="mt-5 text-center">
//           <Alert variant="danger" className="fw-semibold">
//             <FaClipboard className="me-2" /> {/* Reused icon for consistency with original code */}
//             You do not have permission to access this page. Redirecting...
//           </Alert>
//         </Container>
//       </>
//     );
//   }

//   // Main component render for authorized users
//   return (
//     <>
//       <Header /> {/* Renders the consistent navigation header */}

//       <Container fluid className="py-3">
//         <Row className="text-center align-items-center mb-3">
//           <Col xs={12} md={6}>
//             <h4 className="fw-bold">
//               <FaClipboard className="me-2" /> {/* Icon for visual appeal */}
//               View All Client's Accounts
//             </h4>
//           </Col>
//           <Col xs={12} md={6} className="mt-2 mt-md-0">
//             <InputGroup className="mx-auto" style={{ maxWidth: "400px" }}>
//               <InputGroup.Text><FaSearch /></InputGroup.Text> {/* Search icon */}
//               <Form.Control
//                 type="text"
//                 placeholder="Search by Name, Mobile, or License"
//                 value={searchTerm}
//                 onChange={handleSearch} // Triggers filtering on input change
//               />
//             </InputGroup>
//           </Col>
//         </Row>

//         {/* Conditional rendering based on loading state, error state, or data availability */}
//         {loading ? (
//           // Display spinner while data is being fetched
//           <div className="text-center py-5">
//             <Spinner animation="border" variant="primary" />
//             <p className="mt-3">Loading client accounts...</p>
//           </div>
//         ) : error ? (
//           // Display error message if API call failed
//           <Alert variant="danger" className="text-center">{error}</Alert>
//         ) : (
//           // Display table if data is loaded successfully
//           <div className="table-responsive">
//             <Table className="table-bordered table-hover text-center align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Name</th>
//                   <th>Mobile</th>
//                   <th>Query License</th>
//                   <th>Nearby Village</th>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAccounts.length > 0 ? (
//                   // Map through filteredAccounts to display each client account row
//                   filteredAccounts.map((acc, index) => (
//                     <tr key={acc.id}>
//                       <td>{index + 1}</td>
//                       <td>{acc.clientName}</td>
//                       <td>{acc.clientMobile}</td>
//                       <td>{acc.query_license}</td>
//                       <td>{acc.near_village}</td>
//                       <td>{formatDate(acc.clientCreatedAt)}</td> {/* Formatted date */}
//                       <td>{formatTime(acc.clientCreatedAt)}</td> {/* Formatted time */}
//                       <td>
//                         <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
//                           {/* View button to open modal with full details */}
//                           <Button variant="info" onClick={() => handleView(acc)}>
//                             <FaEye className="fs-5 fw-bold" />
//                           </Button>
//                           {/* Delete button to remove the account */}
//                           <Button variant="danger" onClick={() => deleteAccount(acc.id)}>
//                             <FaTrash className="fs-5 fw-bold" />
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   // Message displayed when no accounts match the search or no accounts exist
//                   <tr>
//                     <td colSpan="8" className="text-secondary fw-bold fs-5">
//                       No Client Accounts Found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         )}
//       </Container>

//       {/* Modal component to display detailed client account information */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Client Account Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedAccount && ( // Only render if an account is selected
//             <Card className="shadow-sm border-0">
//               <Card.Body>
//                 {/* Display client details in a structured way using Bootstrap Rows and Cols */}
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Name:</strong> {selectedAccount.clientName}</Col>
//                   <Col md={6}><strong>Mobile:</strong> {selectedAccount.clientMobile}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Query License:</strong> {selectedAccount.query_license}</Col>
//                   <Col md={6}><strong>Nearby Village:</strong> {selectedAccount.near_village}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Mining License:</strong> {selectedAccount.mining_license || "NA"}</Col>
//                   <Col md={6}><strong>Tehsil:</strong> {selectedAccount.tehsil || "NA"}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>District:</strong> {selectedAccount.district || "NA"}</Col>
//                   <Col md={6}><strong>State:</strong> {selectedAccount.state || "NA"}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Country:</strong> {selectedAccount.country || "NA"}</Col>
//                   <Col md={6}><strong>Created At:</strong> {formatDate(selectedAccount.clientCreatedAt)} {formatTime(selectedAccount.clientCreatedAt)}
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           )}
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };
// export default ViewClientAccount;


"use client"; // Ensures this component uses client-side features (like localStorage, router)

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form, InputGroup, Spinner, Alert, Modal, Card } from "react-bootstrap";
import { FaEye, FaTrash, FaSearch, FaClipboard, FaAngleLeft, FaAngleRight } from "react-icons/fa"; // Icons
import Header from "../components/Header";
import axios from "axios";
import { useRouter } from "next/navigation";

// 📆 Format date as DD/MM/YYYY for Indian format
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

// 🕓 Format time as HH:MM:SS AM/PM
const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

const ViewClientAccount = () => {
  const router = useRouter();

  // 🧠 Track user role for access control
  const [userRole, setUserRole] = useState(null);

  // 🌐 Fetched accounts (current page only)
  const [accounts, setAccounts] = useState([]);

  // 🔎 Filtered accounts shown in search results (on current page)
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  // 📥 Modal handling
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // 📊 Pagination state
  const [page, setPage] = useState(1); // current page
  const [totalPages, setTotalPages] = useState(1); // total number of pages

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Check user access from localStorage on page load
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUserRole(parsed.role);

        // Redirect if unauthorized
        if (parsed.role !== "admin" && parsed.role !== "manager") {
          setError("You do not have permission. Redirecting...");
          setTimeout(() => {
            localStorage.clear();
            router.push("/api/logout");
          }, 1500);
        }
      } catch (err) {
        console.error("Role parse failed:", err);
      }
    } else {
      setUserRole("unauthorized");
    }
  }, []);

  // 🔁 Fetch accounts based on current page
  useEffect(() => {
    const fetchAccounts = async () => {
      if (userRole === "admin" || userRole === "manager") {
        setLoading(true);
        try {
          const res = await axios.get(`/api/client-accounts?page=${page}&limit=5`);
          const data = res.data.docs;
          setAccounts(data);
          setFilteredAccounts(data);
          setTotalPages(res.data.totalPages || 1); // Fallback if not sent
        } catch (err) {
          setError("Failed to load client accounts.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAccounts();
  }, [userRole, page]);

  // 🔎 Filter by name on current page
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = accounts.filter((acc) =>
      acc.clientName?.toLowerCase().includes(term)
    );
    setFilteredAccounts(filtered);
  };

  // ❌ Delete client account
  const deleteAccount = async (id) => {
    if (confirm("Are you sure? This can't be undone.")) {
      try {
        await axios.delete(`/api/client-accounts/${id}`);
        const updated = accounts.filter((acc) => acc.id !== id);
        setAccounts(updated);
        setFilteredAccounts(updated);
        alert("Deleted successfully.");
      } catch (err) {
        alert("Deletion failed.");
      }
    }
  };

  // 👁️ Show client details in modal
  const handleView = (acc) => {
    setSelectedAccount(acc);
    setShowModal(true);
  };

  // 🧭 Build pagination buttons
  const renderPagination = () => {
    const buttons = [];

    if (page > 1) {
      buttons.push(
        <Button key="prev" onClick={() => setPage(page - 1)}>
          <FaAngleLeft /> Prev
        </Button>
      );
    }
    
    // Always show first page button
    buttons.push(
      <Button 
        key="page-1" 
        onClick={() => setPage(1)}
        variant={page === 1 ? 'dark' : undefined}
      >
        1
      </Button>
    );

    // Show previous page button if not adjacent to first page
    if (page - 1 > 2) {
      buttons.push(<span key="ellipsis1" className="align-self-center">...</span>);
    }

    // Show previous page button if not first page
    if (page > 2) {
      buttons.push(
        <Button key={`page-${page - 1}`} onClick={() => setPage(page - 1)}>
          {page - 1}
        </Button>
      );
    }

    // Show current page if not first or last
    if (page > 1 && page < totalPages) {
      buttons.push(
        <Button key={`page-${page}`} variant="dark" disabled>
          {page}
        </Button>
      );
    }

    // Show next page button if not last page
    if (page < totalPages - 1) {
      buttons.push(
        <Button key={`page-${page + 1}`} onClick={() => setPage(page + 1)}>
          {page + 1}
        </Button>
      );
    }

    // Show ellipsis if needed
    if (page < totalPages - 2) {
      buttons.push(<span key="ellipsis2" className="align-self-center">...</span>);
    }

    // Show last page button if not already shown
    if (totalPages > 1 && !buttons.some(btn => btn.key === `page-${totalPages}`)) {
      buttons.push(
        <Button 
          key={`page-${totalPages}`} 
          onClick={() => setPage(totalPages)}
          variant={page === totalPages ? 'dark' : undefined}
        >
          {totalPages}
        </Button>
      );
    }

    // Next button
    if (page < totalPages) {
      buttons.push(
        <Button key="next" onClick={() => setPage(page + 1)}>
          Next <FaAngleRight />
        </Button>
      );
    }

    return (
      <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
        {buttons}
      </div>
    );
  };
  // 🌀 Show spinner while loading
  if (loading || userRole === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
        <p className="ms-3">Loading, please wait...</p>
      </div>
    );
  }

  // 🚫 Unauthorized fallback
  if (userRole !== "admin" && userRole !== "manager") {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">
          <FaClipboard className="me-2" />
          {error || "Access Denied"}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Header />

      <Container fluid className="py-3">
        <Row className="mb-3 align-items-center text-center">
          <Col xs={12} md={6}>
            <h4><FaClipboard className="me-2" />View Client Accounts</h4>
          </Col>
          <Col xs={12} md={6}>
            <InputGroup className="mx-auto" style={{ maxWidth: 400 }}>
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by Client Name..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
          </Col>
        </Row>

        {error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <div className="table-responsive">
              <Table bordered hover responsive className="text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Query License</th>
                    <th>Village</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((acc, i) => (
                      <tr key={acc.id}>
                        <td>{i + 1}</td>
                        <td>{acc.clientName}</td>
                        <td>{acc.clientMobile}</td>
                        <td>{acc.query_license}</td>
                        <td>{acc.near_village}</td>
                        <td>{formatDate(acc.clientCreatedAt)}</td>
                        <td>{formatTime(acc.clientCreatedAt)}</td>
                        <td className="d-flex gap-2 justify-content-center flex-wrap">
                          <Button variant="info" onClick={() => handleView(acc)}>
                            <FaEye />
                          </Button>
                          <Button variant="danger" onClick={() => deleteAccount(acc.id)}>
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-secondary fw-semibold">
                        No matching records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {/* Pagination */}
            {renderPagination()}
          </>
        )}
      </Container>

      {/* View Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAccount && (
            <Card>
              <Card.Body>
                <Row className="mb-2">
                  <Col md={6}><strong>Name:</strong> {selectedAccount.clientName}</Col>
                  <Col md={6}><strong>Mobile:</strong> {selectedAccount.clientMobile}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Query License:</strong> {selectedAccount.query_license}</Col>
                  <Col md={6}><strong>Mining License:</strong> {selectedAccount.mining_license || "NA"}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Village:</strong> {selectedAccount.near_village}</Col>
                  <Col md={6}><strong>Tehsil:</strong> {selectedAccount.tehsil || "NA"}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>District:</strong> {selectedAccount.district || "NA"}</Col>
                  <Col md={6}><strong>State:</strong> {selectedAccount.state || "NA"}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Country:</strong> {selectedAccount.country || "NA"}</Col>
                  <Col md={6}><strong>Created At:</strong> {formatDate(selectedAccount.clientCreatedAt)} {formatTime(selectedAccount.clientCreatedAt)}</Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewClientAccount;
