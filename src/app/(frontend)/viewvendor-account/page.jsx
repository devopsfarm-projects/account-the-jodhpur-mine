//pages/viewvendor-account.jsx
// 'use client'; // Important for client-side logic like localStorage
// import React, { useEffect, useState } from 'react';
// import {Container,Table,Button,Modal,Card,Row,Col,Form,Badge,InputGroup,} from 'react-bootstrap';
// import { FaEye, FaTrash, FaSearch } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClipboard } from '@fortawesome/free-solid-svg-icons';
// import Header from '../components/Header';

// const ViewVendorAccount = () => {
//   const [vendorAccounts, setVendorAccounts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredVendorAccounts, setFilteredVendorAccounts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedVendorAccount, setSelectedVendorAccount] = useState(null);

//   // Load from localStorage on component mount
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem('vendorAccounts') || '[]');
//     setVendorAccounts(stored);
//     setFilteredVendorAccounts(stored);
//   }, []);

//   // Search handler
//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     const results = vendorAccounts.filter((acc) =>
//       acc.name.toLowerCase().includes(term)
//     );
//     setFilteredVendorAccounts(results);
//   };

//   // Delete vendor
//   const deleteVendorAccount = (indexToDelete) => {
//     const updated = vendorAccounts.filter((_, i) => i !== indexToDelete);
//     setVendorAccounts(updated);
//     setFilteredVendorAccounts(updated);
//     localStorage.setItem('vendorAccounts', JSON.stringify(updated));
//   };

//   // Toggle status (Active/Inactive)
//   const toggleStatus = (index) => {
//     const updated = [...vendorAccounts];
//     updated[index].status = !updated[index].status;
//     setVendorAccounts(updated);
//     setFilteredVendorAccounts(updated);
//     localStorage.setItem('vendorAccounts', JSON.stringify(updated));
//   };

//   // View account in modal
//   const handleView = (account) => {
//     setSelectedVendorAccount(account);
//     setShowModal(true);
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt-4 text-capitalize">
//         {/* 🔍 Title and Search */}
//         <Row className="mb-4 justify-content-between align-items-center px-2">
//           <Col xs={12} md={6} className="mb-3 mb-md-0 text-center text-md-start">
//             <h4 className="fw-bold">
//               <FontAwesomeIcon icon={faClipboard} /> View All Vendor's Account
//             </h4>
//           </Col>
//           <Col xs={12} md={6}>
//             <InputGroup>
//               <InputGroup.Text><FaSearch /></InputGroup.Text>
//               <Form.Control
//                 type="text"
//                 placeholder="Search Vendor's By Name"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </InputGroup>
//           </Col>
//         </Row>

//         {/* 📋 Vendor Table */}
//         <Table
//           striped
//           bordered
//           hover
//           responsive
//           className="text-center align-middle table-striped border-dark"
//         >
//           <thead className="table-dark">
//             <tr>
//               <th>S.No</th>
//               <th>Name</th>
//               <th>Mobile</th>
//               <th>Query License</th>
//               <th>Mining License</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredVendorAccounts.length > 0 ? (
//               filteredVendorAccounts.map((account, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{account.name}</td>
//                   <td>{account.mobile}</td>
//                   <td>{account.queryLicense}</td>
//                   <td>{account.miningLicense}</td>
//                   <td>
//                     <Button
//                       size="sm"
//                       variant={account.status ? 'success' : 'danger'}
//                       onClick={() => toggleStatus(index)}
//                     >
//                       {account.status ? 'Active' : 'Inactive'}
//                     </Button>
//                   </td>
//                   <td>
//                     <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
//                       <Button
//                         size="sm"
//                         variant="info"
//                         onClick={() => handleView(account)}
//                       >
//                         <FaEye />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="warning"
//                         onClick={() => deleteVendorAccount(index)}
//                       >
//                         <FaTrash />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center text-muted fs-5">
//                   No Vendor accounts found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>

//         {/* 👁️ View Modal */}
//         <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Vendor Details</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedVendorAccount && (
//               <Card className="shadow-sm border-0">
//                 <Card.Body>
//                   <Row className="mb-3">
//                     <Col xs={12} md={6}>
//                       <strong>Name:</strong> {selectedVendorAccount.name}
//                     </Col>
//                     <Col xs={12} md={6}>
//                       <strong>Mobile:</strong> {selectedVendorAccount.mobile}
//                     </Col>
//                   </Row>
//                   <Row className="mb-3">
//                     <Col xs={12} md={6}>
//                       <strong>Query License:</strong> {selectedVendorAccount.queryLicense}
//                     </Col>
//                     <Col xs={12} md={6}>
//                       <strong>Mining License:</strong> {selectedVendorAccount.miningLicense}
//                     </Col>
//                   </Row>
//                   <Row className="mb-3">
//                     <Col xs={12} md={6}>
//                       <strong>Village:</strong> {selectedVendorAccount.village}
//                     </Col>
//                     <Col xs={12} md={6}>
//                       <strong>Tehsil:</strong> {selectedVendorAccount.tehsil}
//                     </Col>
//                   </Row>
//                   <Row className="mb-3">
//                     <Col xs={12} md={4}>
//                       <strong>District:</strong> {selectedVendorAccount.district}
//                     </Col>
//                     <Col xs={12} md={4}>
//                       <strong>State:</strong> {selectedVendorAccount.state}
//                     </Col>
//                     <Col xs={12} md={4}>
//                       <strong>Country:</strong> {selectedVendorAccount.country}
//                     </Col>
//                   </Row>
//                   <Row className="border-top pt-3">
//                     <Col>
//                       <strong>Status:</strong>
//                       <Badge
//                         bg={selectedVendorAccount.status ? 'success' : 'danger'}
//                         className="ms-2 px-3 py-2 fs-6"
//                       >
//                         {selectedVendorAccount.status ? 'Active' : 'Inactive'}
//                       </Badge>
//                     </Col>
//                   </Row>
//                   <Row className="border-top pt-3 mt-2">
//                     <Col>
//                       <strong>Created At:</strong> {selectedVendorAccount.createdAt}
//                     </Col>
//                   </Row>
//                 </Card.Body>
//               </Card>
//             )}
//           </Modal.Body>
//         </Modal>
//       </Container>
//     </>
//   );
// };
// export default ViewVendorAccount;

//viewvendor-account page.jsx
// 'use client'; // Enables client-side interactivity in Next.js
// import React, { useEffect, useState } from 'react';
// import { Table, Button, Container, Modal, Card, Row, Col, Form, InputGroup, Spinner, Alert } from 'react-bootstrap';
// import { FaEye, FaTrash, FaSearch, FaClipboard } from 'react-icons/fa'; // Using FaClipboard from react-icons
// import Header from '../components/Header'; // Reusing the Header component
// import axios from 'axios'; // Importing axios for easier API calls
// import { useRouter } from 'next/navigation'; // Import useRouter for redirection

// // Helper function to format date to DD/MM/YYYY (Indian timezone)
// const formatDate = (dateString) => {
//   const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: "Asia/Kolkata" };
//   try {
//     return new Date(dateString).toLocaleDateString('en-GB', options); // British format = DD/MM/YYYY
//   } catch (e) {
//     console.error("Invalid date string for formatDate:", dateString, e);
//     return "Invalid Date";
//   }
// };
// // Helper function to format time to HH:MM:SS AM/PM (Indian timezone)
// const formatTime = (dateString) => {
//   const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: "Asia/Kolkata" };
//   try {
//     return new Date(dateString).toLocaleTimeString('en-US', options); // US format = HH:MM:SS AM/PM
//   } catch (e) {
//     console.error("Invalid date string for formatTime:", dateString, e);
//     return "Invalid Time";
//   }
// };
// const ViewVendorAccount = () => {
//   const router = useRouter(); // Initialize Next.js router for navigation

//   // State to store the user's role for access control
//   const [userRole, setUserRole] = useState(null);

//   // State to hold all vendor accounts fetched from the API (the master list)
//   const [vendorAccounts, setVendorAccounts] = useState([]);
//   // State to hold vendor accounts after applying search filter
//   const [filteredVendorAccounts, setFilteredVendorAccounts] = useState([]);
//   // State to store the user's search input
//   const [searchTerm, setSearchTerm] = useState('');
//   // State to control the loading spinner visibility
//   const [loading, setLoading] = useState(true);
//   // State to store and display any error messages
//   const [error, setError] = useState('');
//   // State to control the visibility of the detailed view modal
//   const [showModal, setShowModal] = useState(false);
//   // State to store the vendor account data to be displayed in the modal
//   const [selectedVendorAccount, setSelectedVendorAccount] = useState(null);

//   // 🚀 ACCESS CONTROL: Check user role immediately on component mount
//   useEffect(() => {
//     if (typeof window !== "undefined") { // Ensure this code runs only in the browser environment
//       const userData = localStorage.getItem("user");
//       let role = null;
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           role = parsedUser.role;
//           setUserRole(role); // Set the role to state
//         } catch (parseError) {
//           console.error("Error parsing user data from localStorage in ViewVendorAccount:", parseError);
//           // If parsing fails, default to an unauthorized state
//         }
//       }

//       // If the user's role is not 'admin' or 'manager', redirect them.
//       // This is a client-side gate; server-side validation is also paramount.
//       if (role !== 'admin' && role !== 'manager') {
//         console.log(`Unauthorized access attempt to ViewVendorAccount by user with role: ${role || 'undefined'}. Redirecting...`);
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


//   // 🚀 PERFORMANCE / DATA FETCHING: Fetch vendor data when the component first loads
//   // This useEffect will run only if the userRole is determined to be 'admin' or 'manager'
//   useEffect(() => {
//     // Only fetch vendor accounts if the user is authorized (admin or manager)
//     if (userRole === 'admin' || userRole === 'manager') {
//       const fetchVendorAccounts = async () => {
//         setLoading(true); // Start loading before fetching data
//         setError(''); // Clear any previous errors
//         try {
//           // Make GET request to the vendor API endpoint
//           const response = await axios.get('/api/vendor');
//           // Payload CMS usually returns data in a 'docs' array
//           const data = response.data.docs || [];
//           setVendorAccounts(data); // Update the main vendor accounts list
//           setFilteredVendorAccounts(data); // Initialize filtered list with all accounts
//         } catch (err) {
//           // If there's an error, set the error message
//           setError('Failed to load vendor accounts. Please try again.');
//           console.error('Error fetching vendors:', err);
//         } finally {
//           // Always stop loading, whether success or error
//           setLoading(false);
//         }
//       };

//       fetchVendorAccounts(); // Call the fetch function
//     } else if (userRole !== null) { // If userRole is determined but not authorized
//       setLoading(false); // Stop loading as no data will be fetched
//     }
//   }, [userRole]); // Empty dependency array means this runs once on component mount

//   // Function to handle changes in the search input field
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase(); // Get input value and convert to lowercase
//     setSearchTerm(value); // Update search term state

//     // Filter the vendor accounts based on the search term
//     const results = vendorAccounts.filter(
//       (vendor) =>
//         vendor.vendorName?.toLowerCase().includes(value) || // Search by vendor name
//         vendor.vendorMobile?.includes(value) || // Search by vendor mobile
//         vendor.query_license?.toLowerCase().includes(value) || // Search by query license
//         vendor.mining_license?.toLowerCase().includes(value) // Search by mining license
//     );
//     setFilteredVendorAccounts(results); // Update the filtered list
//   };

//   // Function to handle deleting a vendor account
//   const deleteVendorAccount = async (vendorId) => {
//     // Ask for confirmation before deleting
//     if (window.confirm('Are you sure you want to delete this vendor account?')) {
//       try {
//         // Make DELETE request to the API endpoint with the vendor ID
//         await axios.delete(`/api/vendor/${vendorId}`);
//         // If deletion is successful, update the state by removing the deleted vendor
//         const updatedList = vendorAccounts.filter((v) => v.id !== vendorId);
//         setVendorAccounts(updatedList);
//         setFilteredVendorAccounts(updatedList);
//         alert('Vendor account deleted successfully!'); // Provide user feedback
//       } catch (error) {
//         // If there's an error during deletion, show an alert
//         alert('Error deleting vendor account. Please try again.');
//         console.error('Error deleting vendor:', error);
//       }
//     }
//   };

//   // Function to handle viewing a vendor's detailed information in a modal
//   const handleView = (vendor) => {
//     setSelectedVendorAccount(vendor); // Set the selected vendor data
//     setShowModal(true); // Open the modal
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
//             <FaClipboard className="me-2" />
//             You do not have permission to access this page. Redirecting...
//           </Alert>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header /> {/* Renders the common Header component */}

//       <Container fluid className="py-3 text-capitalize"> {/* Main container for the page */}
//         {/* Page Title and Search Bar Section */}
//         <Row className="text-center align-items-center mb-3">
//           <Col xs={12} md={6}>
//             <h4 className="fw-bold">
//               <FaClipboard className="me-2" /> {/* Clipboard icon */}
//               View All Vendor's Accounts
//             </h4>
//           </Col>
//           <Col xs={12} md={6} className="mt-2 mt-md-0">
//             <InputGroup className="mx-auto w-75">
//               <InputGroup.Text>
//                 <FaSearch /> {/* Search icon */}
//               </InputGroup.Text>
//               <Form.Control
//                 type="text"
//                 placeholder="Search by Name, Mobile, License" // Placeholder text for search
//                 value={searchTerm}
//                 onChange={handleSearch} // Call handleSearch when input changes
//               />
//             </InputGroup>
//           </Col>
//         </Row>

//         {/* Conditional Rendering: Loading, Error, or Table */}
//         {error ? ( // Show error alert if there was an error fetching data
//           <Alert variant="danger" className="text-center">{error}</Alert>
//         ) : (
//           // Display the table if data is loaded successfully
//           <div className="table-responsive">
//             <Table className="table-bordered table-hover text-center align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Name</th>
//                   <th>Mobile</th>
//                   <th>Query License</th>
//                   <th>Nearby Village</th>
//                   <th>Created Date</th>
//                   <th>Created Time</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredVendorAccounts.length > 0 ? ( // Check if there are accounts to display
//                   filteredVendorAccounts.map((vendor, index) => (
//                     <tr key={vendor.id}>
//                       <td>{index + 1}</td>
//                       <td>{vendor.vendorName || "N/A"}</td>
//                       <td>{vendor.vendorMobile || "N/A"}</td>
//                       <td>{vendor.query_license||"NA"}</td>
//                       <td>{vendor.near_village||"NA"}</td>
//                       <td>{formatDate(vendor.createdAt)}</td> {/* Formatted creation date */}
//                       <td>{formatTime(vendor.createdAt)}</td> {/* Formatted creation time */}
//                       <td>
//                         <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
//                           <Button variant="info" onClick={() => handleView(vendor)}>
//                             <FaEye className="fs-5 fw-bold" /> {/* View icon */}
//                           </Button>
//                           <Button variant="danger" onClick={() => deleteVendorAccount(vendor.id)}>
//                             <FaTrash className="fs-5 fw-bold" /> {/* Delete icon */}
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   // Display message if no vendor accounts are found after filtering
//                   <tr>
//                     <td colSpan="8" className="text-secondary fw-bold fs-5">
//                       No Vendor Accounts Found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         )}
//       </Container>

//       {/* Modal for displaying detailed Vendor Account Information */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Vendor Account Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedVendorAccount && ( // Only render if a vendor account is selected
//             <Card className="shadow-sm border-0">
//               <Card.Body>
//                 <Row className="mb-2">
//                   <Col md={6}>
//                     <strong>Name:</strong> {selectedVendorAccount.vendorName || "N/A"}
//                   </Col>
//                   <Col md={6}>
//                     <strong>Mobile:</strong> {selectedVendorAccount.vendorMobile || "N/A"}
//                   </Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}>
//                     <strong>Query License:</strong> {selectedVendorAccount.query_license || "NA"}
//                   </Col>
//                   <Col md={6}>
//                     <strong>Mining License:</strong> {selectedVendorAccount.mining_license || "NA"}
//                   </Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}>
//                     <strong>Nearby Village:</strong> {selectedVendorAccount.near_village || "NA"}
//                   </Col>
//                   <Col md={6}>
//                     <strong>Tehsil:</strong> {selectedVendorAccount.tehsil || "NA"}
//                   </Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}>
//                     <strong>District:</strong> {selectedVendorAccount.district || "NA"}
//                   </Col>
//                   <Col md={6}>
//                     <strong>State:</strong> {selectedVendorAccount.state || "NA"}
//                   </Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}>
//                     <strong>Country:</strong> {selectedVendorAccount.country || "NA"}
//                   </Col>
//                   <Col md={6}>
//                     <strong>Created Date:</strong> {formatDate(selectedVendorAccount.createdAt)}
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col>
//                     <strong>Created Time:</strong> {formatTime(selectedVendorAccount.createdAt)}
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
// export default ViewVendorAccount;


'use client';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal, Card, Row, Col, Form,InputGroup, Spinner, Alert } from 'react-bootstrap';
import { FaEye, FaTrash, FaSearch, FaClipboard, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Header from '../components/Header';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: "Asia/Kolkata" };
  try {
    return new Date(dateString).toLocaleDateString('en-GB', options);
  } catch {
    return "Invalid Date";
  }
};

const formatTime = (dateString) => {
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: "Asia/Kolkata" };
  try {
    return new Date(dateString).toLocaleTimeString('en-US', options);
  } catch {
    return "Invalid Time";
  }
};

const ViewVendorAccount = () => {
  const router = useRouter();

  const [userRole, setUserRole] = useState(null);
  const [allVendorAccounts, setAllVendorAccounts] = useState([]);
  const [filteredVendorAccounts, setFilteredVendorAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedVendorAccount, setSelectedVendorAccount] = useState(null);

  // 🔁 New delete confirmation states
  const [vendorToConfirmDelete, setVendorToConfirmDelete] = useState(null);
  const [message, setMessage] = useState('');

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUserRole(parsed.role);
        if (parsed.role !== "admin" && parsed.role !== "manager") {
          setError("You do not have permission to access this page. Redirecting...");
          setTimeout(() => {
            localStorage.clear();
            router.push("/api/logout");
          }, 1500);
        } else {
          setLoading(false);
        }
      } catch {
        setError("Login again.");
      }
    }
  }, [router]);

  useEffect(() => {
    if (userRole === "admin" || userRole === "manager") {
      const fetchVendors = async () => {
        setLoading(true);
        try {
          const response = await axios.get("/api/vendor?limit=10000");
          const data = response.data.docs || [];
          setAllVendorAccounts(data);
          setFilteredVendorAccounts(data);
        } catch {
          setError("Failed to load vendor accounts. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchVendors();
    }
  }, [userRole]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(1);
    const filtered = allVendorAccounts.filter((vendor) =>
      vendor.vendorName?.toLowerCase().includes(value) ||
      vendor.vendorMobile?.includes(value) ||
      vendor.query_license?.toLowerCase().includes(value) ||
      vendor.mining_license?.toLowerCase().includes(value)
    );
    setFilteredVendorAccounts(filtered);
  };

  const confirmDelete = (vendor) => {
    setVendorToConfirmDelete(vendor);
    setMessage(`Are you sure you want to delete the account for "${vendor.vendorName}"?`);
  };

  const cancelDelete = () => {
    setVendorToConfirmDelete(null);
    setMessage('');
  };

  const deleteVendorAccount = async (vendorId) => {
    try {
      await axios.delete(`/api/vendor/${vendorId}`);
      const updatedAll = allVendorAccounts.filter((v) => v.id !== vendorId);
      setAllVendorAccounts(updatedAll);

      const updatedFiltered = updatedAll.filter(
        (vendor) =>
          vendor.vendorName?.toLowerCase().includes(searchTerm) ||
          vendor.vendorMobile?.includes(searchTerm) ||
          vendor.query_license?.toLowerCase().includes(searchTerm) ||
          vendor.mining_license?.toLowerCase().includes(searchTerm)
      );
      setFilteredVendorAccounts(updatedFiltered);
      setMessage("Vendor account deleted successfully.");
    } catch (error) {
      console.error('Error deleting vendor:', error);
      setMessage("Failed to delete vendor account. Please try again.");
    } finally {
      setVendorToConfirmDelete(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleView = (vendor) => {
    setSelectedVendorAccount(vendor);
    setShowModal(true);
  };

  const totalPages = Math.ceil(filteredVendorAccounts.length / itemsPerPage);
  const currentVendors = filteredVendorAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPagination = () => {
    const pages = [];

    if (currentPage > 1) pages.push(<Button key="prev" onClick={() => setCurrentPage(currentPage - 1)}><FaAngleLeft /> Prev</Button>);
    if (currentPage > 2) pages.push(<span key="start-ellipsis">...</span>);

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(
          <Button
            key={i}
            variant={i === currentPage ? "dark" : "outline-primary"}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Button>
        );
      }
    }

    if (currentPage < totalPages - 1) pages.push(<span key="end-ellipsis">...</span>);
    if (currentPage < totalPages) pages.push(<Button key="next" onClick={() => setCurrentPage(currentPage + 1)}>Next <FaAngleRight /></Button>);

    return <div className="d-flex flex-wrap gap-2 justify-content-center my-3">{pages}</div>;
  };

  if (loading || userRole === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
        <p className="ms-2">Loading...</p>
      </div>
    );
  }

  if (userRole !== "admin" && userRole !== "manager") {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger"><FaClipboard className="me-2" /> {error}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container fluid className="py-3 text-capitalize">
        <Row className="text-center align-items-center mb-3">
          <Col xs={12} md={6}>
            <h4 className="fw-bold">
              <FaClipboard className="me-2" />
              View All Vendor's Accounts
            </h4>
          </Col>
          <Col xs={12} md={6}>
            <InputGroup className="mx-auto w-75">
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by Name, Mobile, License"
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* ✅ Message / Confirmation Alert */}
        {message && (
          <Row className="mb-3">
            <Col xs={12} md={{ span: 10, offset: 1 }}>
              <Alert
                variant={
                  vendorToConfirmDelete ? "warning" :
                    message.toLowerCase().includes("success") ? "success" : "danger"
                }
                className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 p-3 shadow-sm rounded text-center text-md-start"
              >
                <div className="flex-grow-1">
                  <p className="mb-0 fw-bold fs-5">{message}</p>
                </div>
                {vendorToConfirmDelete && (
                  <div className="d-flex gap-2 mt-2 mt-md-0">
                    <Button variant="danger" onClick={() => deleteVendorAccount(vendorToConfirmDelete.id)}>
                      Confirm
                    </Button>
                    <Button variant="outline-secondary" onClick={cancelDelete}>
                      Cancel
                    </Button>
                  </div>
                )}
              </Alert>
            </Col>
          </Row>
        )}

        <div className="table-responsive">
          <Table className="table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Query License</th>
                <th>Nearby Village</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentVendors.length > 0 ? (
                currentVendors.map((vendor, index) => (
                  <tr key={vendor.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{vendor.vendorName || "N/A"}</td>
                    <td>{vendor.vendorMobile || "N/A"}</td>
                    <td>{vendor.query_license || "NA"}</td>
                    <td>{vendor.near_village || "NA"}</td>
                    <td>{formatDate(vendor.createdAt)}</td>
                    <td>{formatTime(vendor.createdAt)}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <Button variant="info" onClick={() => handleView(vendor)}><FaEye /></Button>
                        <Button variant="danger" onClick={() => confirmDelete(vendor)}><FaTrash /></Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-secondary fw-bold fs-5">No Vendor Accounts Found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {renderPagination()}
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Vendor Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVendorAccount && (
            <Card>
              <Card.Body>
                <Row className="mb-2">
                  <Col md={6}><strong>Name:</strong> {selectedVendorAccount.vendorName}</Col>
                  <Col md={6}><strong>Mobile:</strong> {selectedVendorAccount.vendorMobile}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Query License:</strong> {selectedVendorAccount.query_license}</Col>
                  <Col md={6}><strong>Mining License:</strong> {selectedVendorAccount.mining_license || "NA"}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Nearby Village:</strong> {selectedVendorAccount.near_village || "NA"}</Col>
                  <Col md={6}><strong>Tehsil:</strong> {selectedVendorAccount.tehsil || "NA"}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>District:</strong> {selectedVendorAccount.district || "NA"}</Col>
                  <Col md={6}><strong>State:</strong> {selectedVendorAccount.state || "NA"}</Col>
                </Row>
                <Row>
                  <Col md={6}><strong>Country:</strong> {selectedVendorAccount.country || "NA"}</Col>
                  <Col md={6}><strong>Created At:</strong> {formatDate(selectedVendorAccount.createdAt)} {formatTime(selectedVendorAccount.createdAt)}</Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewVendorAccount;


