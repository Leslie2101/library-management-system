package com.leslie.library_system.dto.user;

import com.leslie.library_system.model.Role;

public record UserResponse (
        Long id,
        String name,
        String email,
        Role role
) {}
