package com.leslie.library_system.dto.requestsResponse;

public record RejectRequest(
        Long adminId,
        String reason
){}
