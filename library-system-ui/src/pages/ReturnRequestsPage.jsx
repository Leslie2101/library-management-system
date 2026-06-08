import { useEffect, useState } from "react";
import {
  getReturnRequests,
  createReturnRequest,
  approveReturnRequest,
  rejectReturnRequest,
} from "../api/returnRequestApi";

function ReturnRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [borrowRecordId, setBorrowRecordId] = useState("");
  const [adminId, setAdminId] = useState("");

  const loadRequests = async () => {
    const response = await getReturnRequests();
    setRequests(response.data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createReturnRequest({
        borrowRecordId: Number(borrowRecordId),
      });

      setBorrowRecordId("");
      loadRequests();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to create return request");
    }
  };

  const handleApprove = async (id) => {
    if (!adminId) {
      alert("Please enter admin ID first");
      return;
    }

    try {
      await approveReturnRequest(id, Number(adminId));
      loadRequests();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to approve return request");
    }
  };

  const handleReject = async (id) => {
    if (!adminId) {
      alert("Please enter admin ID first");
      return;
    }

    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    try {
      await rejectReturnRequest(id, Number(adminId), reason);
      loadRequests();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to reject return request");
    }
  };

  return (
    <div>
      <h2>Return Requests</h2>

      <h3>Create Return Request</h3>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Borrow Record ID"
          value={borrowRecordId}
          onChange={(e) => setBorrowRecordId(e.target.value)}
        />

        <button type="submit">Create Return Request</button>
      </form>

      <hr />

      <h3>Admin Action</h3>

      <input
        placeholder="Admin ID"
        value={adminId}
        onChange={(e) => setAdminId(e.target.value)}
      />

      <hr />

      <h3>All Return Requests</h3>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Borrow Record ID</th>
            <th>Student</th>
            <th>Book</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.borrowRecordId}</td>
              <td>{request.studentName}</td>
              <td>{request.bookTitle}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "PENDING" ? (
                  <>
                    <button onClick={() => handleApprove(request.id)}>
                      Approve
                    </button>

                    <button onClick={() => handleReject(request.id)}>
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

export default ReturnRequestsPage;