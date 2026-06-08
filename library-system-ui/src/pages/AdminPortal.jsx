import { useEffect, useState } from "react";
import {
  getBorrowRequests,
  approveBorrowRequest,
  rejectBorrowRequest,
} from "../api/borrowRequestApi";

import {
  getReturnRequests,
  approveReturnRequest,
  rejectReturnRequest,
} from "../api/returnRequestApi";
import BooksPage from "./BooksPage";


function AdminPortal() {

    const [borrowRequests, setBorrowRequests] = useState([]);
    const [returnRequests, setReturnRequests] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const [adminId, setAdminId] = useState("");


    useEffect(() => {
        loadBorrowRequests();
        loadReturnRequests();
    }, []);

    const loadReturnRequests = async () => {
        try {
            const response = await getReturnRequests();
            setReturnRequests(response.data);
        } catch (error) {
            alert(error.response?.data?.error || "Failed to load return requests");
        }
    };

    
    const loadBorrowRequests = async () => {
        try {
            const response = await getBorrowRequests();
            setBorrowRequests(response.data);
        } catch (error) {
            alert(error.response?.data?.error || "Failed to load borrow requests");
        }
    };

    const handleApproveReturn = async (requestId) => {
        if (!adminId) {
            alert("Please enter admin ID first");
            return;
        }

        try {
            await approveReturnRequest(requestId, Number(adminId));
            loadReturnRequests();
            loadBorrowRequests();
        } catch (error) {
            alert(error.response?.data?.error || "Failed to approve return request");
        }
    };

    const handleRejectReturn = async (requestId) => {
        if (!adminId) {
            alert("Please enter admin ID first");
            return;
        }

        const reason = prompt("Enter rejection reason:");
        if (!reason) return;

        try {
            await rejectReturnRequest(requestId, Number(adminId), reason);
            loadReturnRequests();
        } catch (error) {
            alert(error.response?.data?.error || "Failed to reject return request");
        }
    };


    const handleApproveBorrow = async (requestId) => {
        if (!adminId) {
            alert("Please enter admin ID first");
            return;
        }

        try {
            await approveBorrowRequest(requestId, Number(adminId));
            loadBorrowRequests();
        } catch (error) {
            alert(error.response?.data?.error || "Failed to approve request");
        }
    };

  const handleRejectBorrow = async (requestId) => {
        if (!adminId) {
            alert("Please enter admin ID first");
            return;
        }

        const reason = prompt("Enter rejection reason:");
        if (!reason) return;

        try {
            await rejectBorrowRequest(requestId, Number(adminId), reason);
            loadBorrowRequests();
        } catch (error) {
            alert(error.response?.data?.error || "Failed to reject request");
        }
  };

  return (
    <>
        <div>
            <h2>Admin Portal</h2>

            <label>Admin ID: </label>
            <input
                placeholder="Enter admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
            />

            <hr />

            <h3>Borrow Requests</h3>

            <button onClick={loadBorrowRequests}>Refresh Borrow Requests</button>

            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Book</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Processed By</th>
                </tr>
                </thead>

                <tbody>
                {borrowRequests.map((request) => (
                    <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.studentName}</td>
                    <td>{request.bookTitle}</td>
                    <td>{request.quantity}</td>
                    <td>{request.status}</td>
                    <td>
                        {request.status === "PENDING" ? (
                        <>
                            <button onClick={() => handleApproveBorrow(request.id)}>
                            Approve
                            </button>

                            <button onClick={() => handleRejectBorrow(request.id)}>
                            Reject
                            </button>
                        </>
                        ) : (
                        "Processed"
                        )}
                    </td>
                    <td>{request.processorName}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <hr />

            <h3>Return Requests</h3>

            <button onClick={loadReturnRequests}>Refresh Return Requests</button>

            <table border="1">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Borrow Record ID</th>
                    <th>Student</th>
                    <th>Book</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Processed By</th>
                    <th>Rejection Reason</th>
                    </tr>
                </thead>

                <tbody>
                    {returnRequests.map((request) => (
                    <tr key={request.id}>
                        <td>{request.id}</td>
                        <td>{request.borrowRecordId}</td>
                        <td>{request.studentName}</td>
                        <td>{request.bookTitle}</td>
                        <td>{request.status}</td>
                        <td>
                        {request.status === "PENDING" ? (
                            <>
                            <button onClick={() => handleApproveReturn(request.id)}>
                                Approve
                            </button>

                            <button onClick={() => handleRejectReturn(request.id)}>
                                Reject
                            </button>
                            </>
                        ) : (
                            "Processed"
                        )}
                        </td>
                        <td>{request.processorName}</td>
                        <td>{request.rejectionReason || "-"}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* <BooksPage /> */}
    </>
  );
}

export default AdminPortal;