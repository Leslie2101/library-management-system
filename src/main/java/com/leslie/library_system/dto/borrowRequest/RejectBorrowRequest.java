package com.leslie.library_system.dto.borrowRequest;

public record RejectBorrowRequest(
        Long adminId,
        String reason
){}
