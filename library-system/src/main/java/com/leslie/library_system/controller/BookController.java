package com.leslie.library_system.controller;

import com.leslie.library_system.dto.book.BookResponse;
import com.leslie.library_system.dto.book.CreateBookRequest;
import com.leslie.library_system.dto.book.UpdateBookRequest;
import com.leslie.library_system.services.BookService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<BookResponse> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public BookResponse getBookById(@PathVariable Long id){
        return bookService.getBookResponseById(id);
    }

    @PostMapping
    public BookResponse createBook(@RequestBody CreateBookRequest request){
        return bookService.createBook(request);
    }

    @PutMapping("/{id}")
    public BookResponse updateBook(@PathVariable Long id, @RequestBody UpdateBookRequest updatedBook){
        return bookService.updateBook(id, updatedBook);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id){
        bookService.deleteBook(id);
    }


}
