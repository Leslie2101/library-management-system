import { useEffect, useState } from "react";
import { getBooks, createBook, updateBook, deleteBook } from "../api/bookApi";

function BooksPage() {
    const [books, setBooks] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        author: "",
        isbn: "",
        description: "",
        totalStock: 1
    });

    const loadBooks = async () => {
        const response = await getBooks();
        setBooks(response.data);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const bookData = {
                ...form,
                totalStock: Number(form.totalStock),
            };

            if (editingId) {
                await updateBook(editingId, bookData);
            } else {
                await createBook(bookData);
            }

            setForm({
                title: "",
                author: "",
                isbn: "",
                description: "",
                totalStock: 1,
            });

            setEditingId(null);
            loadBooks();
        } catch (error) {
            alert(error.response?.data?.error || "Failed to save book");
        }
    };

    const handleEdit = (book) => {
        setEditingId(book.id);

        setForm({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            description: book.description,
            totalStock: book.totalStock,
        });
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this book?")) {
            return;
        }

        try {
            await deleteBook(id);
            loadBooks();
        } catch (error) {

         alert(
            error.response?.data?.error ||
            "Failed to delete book"
        );

        }
    };

    return (
    <div>

      <h2>Books</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
        />

        <input
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="totalStock"
          type="number"
          value={form.totalStock}
          onChange={handleChange}
        />

        <button type="submit">
            {editingId ? "Update Book" : "Add Book"}
        </button>

        {editingId && (
            <button
                type="button"
                onClick={() => {
                setEditingId(null);
                setForm({
                    title: "",
                    author: "",
                    isbn: "",
                    description: "",
                    totalStock: 1,
                });
                }}
            >
                Cancel Edit
            </button>
        )}
      </form>


      <table border="1">

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Total</th>
            <th>Used</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.totalStock}</td>
              <td>{book.usedStock}</td>
              <td>{book.totalStock - book.usedStock}</td>
              <td>
                <button onClick={() => handleEdit(book)}>
                    Edit
                </button>

                <button onClick={() => handleDelete(book.id)}>
                    Delete
                </button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BooksPage;