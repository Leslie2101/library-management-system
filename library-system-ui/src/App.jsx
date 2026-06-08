import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import BooksPage from "./pages/BooksPage";
import UsersPage from "./pages/UsersPage";
import BorrowRequestsPage from "./pages/BorrowRequestsPage";
import BorrowRecordsPage from "./pages/BorrowRecordsPage";
import ReturnRequestsPage from "./pages/ReturnRequestsPage";

function App() {
  return (
    <BrowserRouter>
      <h1>Library System</h1>

      <nav>
        <Link to="/">Books</Link> |{" "}
        <Link to="/users">Users</Link> |{" "}
        <Link to="/borrow-requests">Borrow Requests</Link> |{" "}
        <Link to="/borrow-records">Borrow Records</Link> |{" "}
        <Link to="/return-requests">Return Requests</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/borrow-requests" element={<BorrowRequestsPage />} />
        <Route path="/borrow-records" element={<BorrowRecordsPage />} />
        <Route path="/return-requests" element={<ReturnRequestsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;