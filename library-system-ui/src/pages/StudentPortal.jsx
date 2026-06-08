import { useState } from "react";
import { createBorrowRequest, getBorrowRequestsByStudent } from "../api/borrowRequestApi";
import { getBorrowRecordsByStudent } from "../api/borrowRecordApi";
import { createReturnRequest } from "../api/returnRequestApi";

function StudentPortal() {
    // const user =JSON.parse(localStorage.getItem("user"));
    const [studentId, setStudentId] = useState("");
    const [records, setRecords] = useState([]);
    const [borrowRequests, setBorrowRequests] = useState([]);

    const [borrowForm, setBorrowForm] = useState({
        bookId: "",
        quantity: 1,
    });

    const loadBorrowRequests = async () => {
        if (!studentId) {
            alert("Please enter student ID first");
            return;
        }

        try {
            const response = await getBorrowRequestsByStudent(Number(studentId));
            setBorrowRequests(response.data);
        } catch (error) {
            alert(error.response?.data?.error || "Failed to load borrow requests");
        }
    };

    const handleBorrowChange = (e) => {
        setBorrowForm({
            ...borrowForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleReturnRequest = async (borrowRecordId) => {
        try {
            await createReturnRequest({
            borrowRecordId,
            });

            alert("Return request created");

            loadBorrowRecords();
        } catch (error) {
            alert(
            error.response?.data?.error ||
            "Failed to create return request"
            );
        }
    };

    const handleLoad = () => {
        loadBorrowRecords();
        loadBorrowRequests();
    }

    const loadBorrowRecords = async () => {
        if (!studentId) {
            return;
        }

        try {

            const response =
            await getBorrowRecordsByStudent(
                Number(studentId)
            );

            setRecords(response.data);

        } catch (error) {

            alert(
            error.response?.data?.error ||
            "Failed to load records"
            );

        }
    };

    const handleCreateBorrowRequest = async (e) => {
        e.preventDefault();

        if (!studentId) {
            alert("Please enter student ID first");
            return;
        }

        try {
            await createBorrowRequest({
                studentId: Number(studentId),
                bookId: Number(borrowForm.bookId),
                quantity: Number(borrowForm.quantity),
            });

            alert("Borrow request created successfully");

            setBorrowForm({
                bookId: "",
                quantity: 1,
            });
        } catch (error) {
            alert(error.response?.data?.error || "Failed to create borrow request");
        }
    };

  return (
    <div>
        <h2>Student Portal</h2>

        <label>Student ID: </label>
        <input
            placeholder="Enter student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={handleLoad}>
            Load
        </button>

        <hr />

        <h3>Create Borrow Request</h3>

        <form onSubmit={handleCreateBorrowRequest}>
            <input
            name="bookId"
            placeholder="Book ID"
            value={borrowForm.bookId}
            onChange={handleBorrowChange}
            />

            <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={borrowForm.quantity}
            onChange={handleBorrowChange}
            />

            <button type="submit">Request Borrow</button>
        </form>

        <hr />

        <h3>My Borrow Requests</h3>
        <button onClick={loadBorrowRequests}>Refresh Borrow Requests</button>
        <table border="1">
        <thead>
            <tr>
            <th>ID</th>
            <th>Book</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Processed By</th>
            </tr>
        </thead>

        <tbody>
            {borrowRequests.map((request) => (
            <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.bookTitle}</td>
                <td>{request.quantity}</td>
                <td>{request.status}</td>
                <td>{request.processorName}</td>
            </tr>
            ))}
        </tbody>
        </table>

        <hr />

        <h3>My Borrowed Books</h3>
        <button onClick={loadBorrowRecords}>Refresh Borrow Records</button>
        <table border="1">

        <thead>
            <tr>
            <th>ID</th>
            <th>Book</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Borrow Date</th>
            <th>Action</th>
            <th>Returned Date</th>
            <th>Note</th>
            </tr>
        </thead>

        <tbody>

            {records.map(record => (

            <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.bookTitle}</td>
                <td>{record.quantity}</td>
                <td>{record.status}</td>
                <td>{record.borrowDate}</td>
                <td>
                    {record.status === "BORROWING" ? (
                        <button
                        onClick={() =>
                            handleReturnRequest(record.id)
                        }
                        >
                        Request Return
                        </button>
                    ) : (
                        "-"
                    )}
                </td>
                <td>{record.returnDate || "-"}</td>
                <td>{record.note || "-"}</td>
            </tr>

            ))}

        </tbody>

        </table>
    </div>
  );
}

export default StudentPortal;