package com.leslie.library_system.dto.borrowRecord;

import com.leslie.library_system.model.BorrowRecordStatus;

import java.time.LocalDateTime;

public record BorrowRecordResponse(
        Long id,
        Long studentId,
        String studentName,
        Long bookId,
        String bookTitle,
        int quantity,
        BorrowRecordStatus status,
        LocalDateTime borrowDate,
        LocalDateTime returnDate
) {}
