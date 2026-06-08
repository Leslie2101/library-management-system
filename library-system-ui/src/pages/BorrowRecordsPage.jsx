import { useState } from "react";
import { getBorrowRecordsByStudent } from "../api/borrowRecordApi";

function BorrowRecordsPage() {
  const [studentId, setStudentId] = useState("");
  const [records, setRecords] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await getBorrowRecordsByStudent(Number(studentId));
      setRecords(response.data);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to load borrow records");
    }
  };

  return (
    <div>
      <h2>Borrow Records</h2>

      <form onSubmit={handleSearch}>
        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <hr />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Book</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.studentName}</td>
              <td>{record.bookTitle}</td>
              <td>{record.quantity}</td>
              <td>{record.status}</td>
              <td>{record.borrowDate}</td>
              <td>{record.returnDate || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowRecordsPage;