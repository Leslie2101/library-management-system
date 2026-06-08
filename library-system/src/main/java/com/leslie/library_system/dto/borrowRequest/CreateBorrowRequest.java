package com.leslie.library_system.dto.borrowRequest;

public record CreateBorrowRequest(
        Long studentId,
        Long bookId,
        int quantity
) {}
