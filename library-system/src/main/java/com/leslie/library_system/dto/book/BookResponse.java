package com.leslie.library_system.dto.book;

public record BookResponse(
        Long id,
        String title,
        String author,
        String isbn,
        String description,
        int totalStock,
        int usedStock
) {}
