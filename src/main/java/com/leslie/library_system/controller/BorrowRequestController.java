package com.leslie.library_system.controller;

import com.leslie.library_system.dto.borrowRecord.BorrowRecordResponse;
import com.leslie.library_system.dto.borrowRequest.ApproveBorrowRequest;
import com.leslie.library_system.dto.borrowRequest.BorrowRequestResponse;
import com.leslie.library_system.dto.borrowRequest.CreateBorrowRequest;
import com.leslie.library_system.dto.borrowRequest.RejectBorrowRequest;
import com.leslie.library_system.services.BorrowRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/borrow-requests")
public class BorrowRequestController {

    private final BorrowRequestService borrowRequestService;

    @PostMapping
    public BorrowRequestResponse createRequest(@RequestBody CreateBorrowRequest request) {
        return borrowRequestService.createRequest(request);
    }

    @GetMapping
    public List<BorrowRequestResponse> getAllBorrowRequest(){
        return borrowRequestService.getAllBorrowRequests();
    }

    @PutMapping("/{id}/approve")
    public BorrowRequestResponse approveRequest(@PathVariable Long id, @RequestBody ApproveBorrowRequest request){
        return borrowRequestService.approveRequest(id, request.adminId());
    }

    @PutMapping("/{id}/reject")
    public BorrowRequestResponse rejectRequest(@PathVariable Long id, @RequestBody RejectBorrowRequest request){
        return borrowRequestService.rejectRequest(id, request.adminId(), request.reason());
    }

    @GetMapping("/student/{studentId}")
    public List<BorrowRequestResponse> getStudentRequests(@PathVariable Long studentId){
        return borrowRequestService.getStudentRequests(studentId);
    }
}
