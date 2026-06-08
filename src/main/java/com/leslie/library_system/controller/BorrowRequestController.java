package com.leslie.library_system.controller;

import com.leslie.library_system.dto.borrowRequest.BorrowRequestResponse;
import com.leslie.library_system.dto.borrowRequest.CreateBorrowRequest;
import com.leslie.library_system.services.BorrowRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/borrow-requests")
public class BorrowRequestController {

    private final BorrowRequestService borrowRequestService;

    @PostMapping
    public BorrowRequestResponse createRequest(@RequestBody CreateBorrowRequest request) {
        return borrowRequestService.createRequest(request);
    }
}
