package com.leslie.library_system.dto;

import java.time.LocalDateTime;

public record ErrorResponse(
        LocalDateTime timestamp,
        int status,
        String error
) {
}