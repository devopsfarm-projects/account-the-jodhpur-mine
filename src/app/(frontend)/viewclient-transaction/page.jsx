// pages/view-client-transaction.jsx
// "use client"; // Required in Next.js for client-side features like useEffect, useRoute
// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Table, Button, Modal, Form, InputGroup } from "react-bootstrap";
// import { useRouter } from "next/navigation";
// import { FaEye as EyeFill, FaClipboard, FaRupeeSign, FaSearch, FaWrench } from "react-icons/fa";
// import Header from "../components/Header";
// import { PencilSquare } from "react-bootstrap-icons";

// const ViewClientTransaction = () => {
//   const router = useRouter();

//   const [transactions, setTransactions] = useState([]);
//   const [filteredTransactions, setFilteredTransactions] = useState([]);

//   const [searchName, setSearchName] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // ⬇️ Load transactions from localStorage on first load
//   useEffect(() => {
//     const allTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
//     setTransactions(allTransactions);
//     setFilteredTransactions(allTransactions);
//   }, []);

//   // 🔍 Search filter
//   const handleSearch = (e) => {
//     const name = e.target.value.toLowerCase();
//     setSearchName(name);
//     applyFilters(name, startDate, endDate);
//   };

//   // 📅 Filter handlers
//   const handleStartDate = (e) => {
//     const value = e.target.value;
//     setStartDate(value);
//     applyFilters(searchName, value, endDate);
//   };

//   const handleEndDate = (e) => {
//     const value = e.target.value;
//     setEndDate(value);
//     applyFilters(searchName, startDate, value);
//   };

//   // 🧠 Filter function for name + date range
//   const applyFilters = (name, start, end) => {
//     const filtered = transactions.filter((txn) => {
//       const matchesName = txn.client.toLowerCase().includes(name);

//       const [datePart] = txn.transactioncreated.split(" ");
//       const [day, month, year] = datePart.split("/");
//       const txnDateObj = new Date(`${year}-${month}-${day}`);

//       const startDateObj = start ? new Date(start) : null;
//       const endDateObj = end ? new Date(end) : null;

//       const matchesStart = startDateObj ? txnDateObj >= startDateObj : true;
//       const matchesEnd = endDateObj ? txnDateObj <= endDateObj : true;

//       return matchesName && matchesStart && matchesEnd;
//     });

//     setFilteredTransactions(filtered);
//   };

//   // 👁️ View modal
//   const handleView = (txn) => {
//     setSelectedTransaction(txn);
//     setShowModal(true);
//   };

//   // ✏️ Navigate to edit transaction page
//   const handleEdit = (id) => {
//     router.push(`/editclient-transaction/${id}`);
//   };

//   return (
//     <>
//       <Header />

//       <Container className="mt-4">
//         <h4 className="text-center mb-4">
//           <FaClipboard /> View Client All Transactions
//         </h4>

//         {/* Search & Filter */}
//         <Form className="mb-4">
//           <Row className="gy-3 gx-3 align-items-end">
//             <Col xs={12} md={4}>
//               <InputGroup>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search by vendor name..."
//                   value={searchName}
//                   onChange={handleSearch}
//                 />
//                 <InputGroup.Text><FaSearch /></InputGroup.Text>
//               </InputGroup>
//             </Col>
//             <Col xs={12} md={4}>
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={startDate}
//                 onChange={handleStartDate}
//               />
//             </Col>
//             <Col xs={12} md={4}>
//               <Form.Label>End Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={endDate}
//                 onChange={handleEndDate}
//               />
//             </Col>
//           </Row>
//         </Form>

//         {/* 📊 Table of Transactions */}
//         <Table
//           striped
//           bordered
//           hover
//           responsive
//           className="text-center align-middle fs-6 fw-medium"
//         >
//           <thead className="table-dark">
//             <tr>
//               <th>Client Name</th>
//               <th>Date & Time</th>
//               <th><FaRupeeSign /> Total</th>
//               <th><FaRupeeSign /> Credit</th>
//               <th><FaRupeeSign /> Remaining</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredTransactions.length > 0 ? (
//               filteredTransactions.map((txn, index) => (
//                 <tr key={index}>
//                   <td>{txn.client}</td>
//                   <td>{txn.transactioncreated}</td>
//                   <td><FaRupeeSign /> {txn.totalAmount}</td>
//                   <td><FaRupeeSign /> {txn.totalCredits}</td>
//                   <td><FaRupeeSign /> {txn.remainingAmount}</td>
//                   <td>
//                     <Button
//                       variant="info"
//                       size="sm"
//                       className="me-0 me-md-2 mb-1 mb-md-0 justify-content-center align-items-center"
//                       onClick={() => handleView(txn)}
//                     >
//                       <EyeFill />
//                     </Button>
//                     <Button
//                       variant="warning"
//                       size="sm"
//                       onClick={() => handleEdit(index)}
//                     >
//                       <PencilSquare />
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6">No Client Transactions found</td>
//               </tr>
//             )}
//           </tbody>
//         </Table>

//         {/* 📦 Transaction Details Modal */}
//         <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Transaction Details</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedTransaction && (
//               <>
//                 <p><strong>Date & Time:</strong> {selectedTransaction.transactioncreated}</p>
//                 <p><strong>Client:</strong> {selectedTransaction.client}</p>
//                 <p><strong>Total Amount:</strong> <FaRupeeSign /> {selectedTransaction.totalAmount}</p>
//                 <p><strong>Token Amount:</strong> <FaRupeeSign /> {selectedTransaction.tokenAmount}</p>
//                 <p><strong>Total Credits:</strong> <FaRupeeSign /> {selectedTransaction.totalCredits}</p>
//                 <p><strong>Remaining Amount:</strong> <FaRupeeSign /> {selectedTransaction.remainingAmount}</p>
//                 <p><strong>Description:</strong> {selectedTransaction.description}</p>
//                 <hr />
//                 <h6><FaWrench /> Working Stages:</h6>
//                 <ul>
//                   {selectedTransaction.workingStages.map((stage, idx) => (
//                     <li key={idx}>
//                       {stage.work}: <FaRupeeSign /> {stage.amount}
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           </Modal.Body>
//         </Modal>
//       </Container>
//     </>
//   );
// };
// export default ViewClientTransaction;

"use client"; // Required in Next.js for client-side features like useEffect, useRouter
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FaEye as EyeFill, FaClipboard, FaRupeeSign, FaSearch, FaWrench } from "react-icons/fa";
import { PencilSquare } from "react-bootstrap-icons";
import Header from "../components/Header";

// A helper function to format dates to DD/MM/YYYY and time to HH:MM:SS AM/PM (Indian timezone)
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: "Asia/Kolkata", };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const formatTime = (dateString) => {
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: "Asia/Kolkata", };
  return new Date(dateString).toLocaleTimeString('en-US', options);
};

const ViewClientTransaction = () => {
  const router = useRouter();

  // Store all fetched transactions
  const [transactions, setTransactions] = useState([]);

  // Filtered transactions based on search and date
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // States for filters
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // For viewing details in modal
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Loading state to enhance UX
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Payload CMS when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/client-transaction");
        const data = await res.json();
        const txnData = data.docs || [];

        // Save in state
        setTransactions(txnData);
        setFilteredTransactions(txnData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // 🔍 Handle search by client name
  const handleSearch = (e) => {
    const name = e.target.value.toLowerCase();
    setSearchName(name);
    applyFilters(name, startDate, endDate);
  };

  // 📅 Handle start and end date filtering
  const handleStartDate = (e) => {
    const value = e.target.value;
    setStartDate(value);
    applyFilters(searchName, value, endDate);
  };

  const handleEndDate = (e) => {
    const value = e.target.value;
    setEndDate(value);
    applyFilters(searchName, startDate, value);
  };

  // 🧠 Apply filtering logic based on name and date
  const applyFilters = (name, start, end) => {
    const filtered = transactions.filter((txn) => {
      const clientName = txn.clientName?.clientName?.toLowerCase() || "";

      const matchesName = clientName.includes(name);

      const txnDate = new Date(txn.clientCreatedAt);

      const startDateObj = start ? new Date(start) : null;
      const endDateObj = end ? new Date(end) : null;

      const matchesStart = startDateObj ? txnDate >= startDateObj : true;
      const matchesEnd = endDateObj ? txnDate <= endDateObj : true;

      return matchesName && matchesStart && matchesEnd;
    });

    setFilteredTransactions(filtered);
  };

  // 👁️ Show full transaction details in modal
  const handleView = (txn) => {
    setSelectedTransaction(txn);
    setShowModal(true);
  };

  // ✏️ Navigate to edit page using dynamic ID
  const handleEdit = (id) => {
    console.log(id);
    router.push(`/editclient-transaction/${id}`);
  };

  return (
    <>
      <Header />

      <Container className="mt-4 mb-5">
        <h4 className="text-center mb-4">
          <FaClipboard /> View Client All Transactions
        </h4>

        {/* 🔍 Search and Filters */}
        <Form className="mb-4">
          <Row className="gy-3 gx-3 align-items-end">
            <Col xs={12} md={4}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search by client name..."
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

        {/* ⏳ Loading Spinner */}
        {isLoading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p>Loading all the client transactions...</p>
          </div>
        ) : (
          // 📊 Transactions Table
          <div className="table-responsive">
            <Table className="table-bordered table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Client Name</th>
                  <th>Date of creation</th>
                  <th>Time of creation</th>
                  <th><FaRupeeSign /> Total Amount</th>
                  <th><FaRupeeSign /> Total Credit</th>
                  <th><FaRupeeSign /> Remaining Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((txn, index) => {
                    const date = formatDate(txn.clientCreatedAt);
                    const time = formatTime(txn.clientCreatedAt);
                    return (
                      <tr key={txn.id}>
                        <td>{index + 1}</td>
                        <td>{txn.clientName?.clientName || "N/A"}</td>
                        <td>{date}</td>
                        <td>{time}</td>
                        <td><FaRupeeSign /> {txn.totalAmount.toFixed(2)}</td>
                        <td><FaRupeeSign /> {txn.totalCredit.toFixed(2)}</td>
                        <td><FaRupeeSign /> {txn.remainingAmount.toFixed(2)}</td>
                        <td>
                          <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                            <Button variant="info" onClick={() => handleView(txn)}>
                              <EyeFill className="fs-5 fw-bold"/>
                            </Button>
                            <Button variant="warning" onClick={() => handleEdit(txn.id)}>
                              <PencilSquare className="fs-5 fw-bold"/>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-secondary fw-bold fs-5">No client transactions found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}

        {/* 🧾 Transaction Detail Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Transaction Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTransaction && (
              <>
                <p><strong>Last Updated Date & Time:</strong> {formatDate(selectedTransaction.clientUpdatedAt)} {formatTime(selectedTransaction.clientUpdatedAt)}</p>
                <p><strong>Client Name:</strong> {selectedTransaction.clientName?.clientName}</p>
                <p><strong>Total Amount:</strong> <FaRupeeSign /> {selectedTransaction.totalAmount}</p>
                <p><strong>Token Amount:</strong> <FaRupeeSign /> {selectedTransaction.tokenAmount}</p>
                <p><strong>Total Credit:</strong> <FaRupeeSign /> {selectedTransaction.totalCredit}</p>
                <p><strong>Remaining Amount:</strong> <FaRupeeSign /> {selectedTransaction.remainingAmount}</p>
                <p><strong>Description:</strong> {selectedTransaction.description}</p>

                {/* 🛠️ Working Stages */}
                <hr />
                <h6><FaWrench /> Working Stages</h6>
                <ul>
                  {selectedTransaction.workingStage?.map((stage, idx) => (
                    <li key={idx}>
                      <strong>{stage.workingStage}</strong>: {stage.workingDescription}
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
};

export default ViewClientTransaction;
