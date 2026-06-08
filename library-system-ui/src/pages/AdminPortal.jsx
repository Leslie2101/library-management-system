import { useEffect, useState } from "react";
import {
  getBorrowRequests,
  approveBorrowRequest,
  rejectBorrowRequest,
} from "../api/borrowRequestApi";

function AdminPortal() {
    const [adminId, setAdminId] = useState("");
    const [borrowRequests, setBorrowRequests] = useState([]);

    const loadBorrowRequests = async () => {
        try {
            const response = await getBorrowRequests();
            setBorrowRequests(response.data);
        } catch (error) {
            alert(error.response?.data?.error || "Failed to load borrow requests");
        }
    };

    useEffect(() => {
        loadBorrowRequests();
    }, []);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPortal;