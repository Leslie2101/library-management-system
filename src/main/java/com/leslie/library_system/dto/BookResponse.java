package com.leslie.library_system.dto;

public record BookResponse(
        Long id,
        String title,
        String author,
        String isbn,
        String description,
        int totalStock,
        int usedStock
) {}
