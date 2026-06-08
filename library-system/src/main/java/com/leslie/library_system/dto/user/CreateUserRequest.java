package com.leslie.library_system.dto.user;

import com.leslie.library_system.model.Role;

public record CreateUserRequest (
   String name,
   String email,
   String password,
   Role role
) {}
