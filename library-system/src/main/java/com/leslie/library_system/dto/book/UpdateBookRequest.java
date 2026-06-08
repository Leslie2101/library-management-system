package com.leslie.library_system.dto.book;


public record UpdateBookRequest (
    String title,
    String author,
    String isbn,
    String description,
    int totalStock
){}
