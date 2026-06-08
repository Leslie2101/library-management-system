import { useEffect, useState } from "react";
import {
  getBorrowRequests,
  createBorrowRequest,
  approveBorrowRequest,
  rejectBorrowRequest,
} from "../api/borrowRequestApi";

function BorrowRequestsPage() {
  const [requests, setRequests] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    bookId: "",
    quantity: 1,
  });

  const [adminId, setAdminId] = useState("");

  const loadRequests = async () => {
    const response = await getBorrowRequests();
    setRequests(response.data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createBorrowRequest({
        studentId: Number(form.studentId),
        bookId: Number(form.bookId),
        quantity: Number(form.quantity),
      });

      setForm({
        studentId: "",
        bookId: "",
        quantity: 1,
      });

      loadRequests();
    } catch (error) {
        console.log(error);
        alert(error.response?.data?.error || "Failed to create borrow request");
    }
  };

  const handleApprove = async (id) => {
    if (!adminId) {
      alert("Please enter admin ID first");
      return;
    }

    try {
      await approveBorrowRequest(id, Number(adminId));
      loadRequests();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to approve request");
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
      await rejectBorrowRequest(id, Number(adminId), reason);
      loadRequests();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to reject request");
    }
  };

  return (
    <div>
        <h2>Borrow Requests</h2>

        <h3>Create Borrow Request</h3>

        <form onSubmit={handleCreate}>
            <input
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={handleChange}
            />

            <input
            name="bookId"
            placeholder="Book ID"
            value={form.bookId}
            onChange={handleChange}
            />

            <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            />

            <button type="submit">Create Request</button>
        </form>


        <h3>Admin Action</h3>

        <input
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
        />

        <hr />

        <h3>All Borrow Requests</h3>

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
            {requests.map((request) => (
                <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.studentName}</td>
                <td>{request.bookTitle}</td>
                <td>{request.quantity}</td>
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
                <td>{request.processorName}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
}

export default BorrowRequestsPage;