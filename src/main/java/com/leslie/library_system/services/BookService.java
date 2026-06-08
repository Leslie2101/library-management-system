package com.leslie.library_system.services;

import com.leslie.library_system.dto.BookResponse;
import com.leslie.library_system.dto.CreateBookRequest;
import com.leslie.library_system.dto.UpdateBookRequest;
import com.leslie.library_system.exception.ResourceNotFoundException;
import com.leslie.library_system.model.Book;
import com.leslie.library_system.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class BookService {
    private final BookRepository bookRepository;

    public List<BookResponse> getAllBooks(){
        return bookRepository
                .findAll()
                .stream().map(this::toResponse).toList();
    }

    private Book getBookById(Long id){
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public BookResponse getBookResponseById(Long id) {
        return bookRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public BookResponse createBook(CreateBookRequest request) {
        if (bookRepository.findByIsbn(request.isbn()).isPresent()){
            throw new RuntimeException("ISBN already exists");
        }
        Book book = Book.builder()
                .title(request.title())
                .author(request.author())
                .isbn(request.isbn())
                .description(request.description())
                .totalStock(request.totalStock())
                .usedStock(0)
                .build();

        return toResponse(bookRepository.save(book));
    }


    public BookResponse updateBook(Long id, UpdateBookRequest updatedBook) {
        Book book = getBookById(id);
        book.setTitle(updatedBook.title());
        book.setAuthor(updatedBook.author());
        book.setTotalStock(updatedBook.totalStock());
        book.setDescription(updatedBook.description());
        book.setIsbn(updatedBook.isbn());
        return toResponse(bookRepository.save(book));
    }

    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Book with id " + id + " not found"
                        ));

        bookRepository.delete(book);
    }

    private BookResponse toResponse(Book book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getIsbn(),
                book.getDescription(),
                book.getTotalStock(),
                book.getUsedStock()
        );
    }
}
