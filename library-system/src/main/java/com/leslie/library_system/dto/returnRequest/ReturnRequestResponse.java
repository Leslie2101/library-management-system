package com.leslie.library_system.dto.returnRequest;

import com.leslie.library_system.model.RequestStatus;

public record ReturnRequestResponse(
        Long id,
        Long borrowRecordId,
        String bookTitle,
        String studentName,
        RequestStatus status,
        String processorName,
        String rejectionReason
) {}
