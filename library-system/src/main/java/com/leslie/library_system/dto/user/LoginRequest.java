package com.leslie.library_system.dto.user;

public record LoginRequest(
        String email,
        String password
) { }
