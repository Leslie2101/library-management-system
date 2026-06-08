package com.leslie.library_system.dto.borrowRequest;


import com.leslie.library_system.model.RequestStatus;

public record BorrowRequestResponse(
        Long id,
        String studentName,
        String bookTitle,
        int quantity,
        RequestStatus status
) {}
