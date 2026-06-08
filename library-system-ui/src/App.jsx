import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import BooksPage from "./pages/BooksPage";
import UsersPage from "./pages/UsersPage";
import BorrowRequestsPage from "./pages/BorrowRequestsPage";
import BorrowRecordsPage from "./pages/BorrowRecordsPage";
import ReturnRequestsPage from "./pages/ReturnRequestsPage";
import StudentPortal from "./pages/StudentPortal";
import AdminPortal from "./pages/AdminPortal";

function App() {
  return (
    <BrowserRouter>
      <h1>Library System</h1>

      <nav>
        <Link to="/">Books</Link> |{" "}
        <Link to="/student">Student Portal</Link> |{" "}
        <Link to="/admin">Admin Portal</Link> |{" "}
        <Link to="/users">Users</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/borrow-requests" element={<BorrowRequestsPage />} />
        <Route path="/borrow-records" element={<BorrowRecordsPage />} />
        <Route path="/return-requests" element={<ReturnRequestsPage />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;