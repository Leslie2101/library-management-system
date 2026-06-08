package com.leslie.library_system.controller;

import com.leslie.library_system.dto.borrowRequest.BorrowRequestResponse;
import com.leslie.library_system.dto.requestsResponse.ApproveRequest;
import com.leslie.library_system.dto.requestsResponse.RejectRequest;
import com.leslie.library_system.dto.returnRequest.CreateReturnRequest;
import com.leslie.library_system.dto.returnRequest.ReturnRequestResponse;
import com.leslie.library_system.services.ReturnRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/return-requests")
public class ReturnRequestController {
    private final ReturnRequestService returnService;

    @PostMapping
    public ReturnRequestResponse createReturnRequest(@RequestBody CreateReturnRequest request){
        return returnService.createReturnRequest(request);
    }

    @GetMapping
    public List<ReturnRequestResponse> getAllReturnRequests(){
        return returnService.getAllRequests();
    }

    @PutMapping("/{id}/approve")
    public ReturnRequestResponse approveRequest(@PathVariable Long id, @RequestBody ApproveRequest request){
        return returnService.approveRequest(id, request.adminId());
    }

    @PutMapping("/{id}/reject")
    public ReturnRequestResponse rejectRequest(@PathVariable Long id, @RequestBody RejectRequest request){
        return returnService.rejectRequest(id, request.adminId(), request.reason());
    }

    @GetMapping("/student/{studentId}")
    public List<ReturnRequestResponse> getStudentRequests(@PathVariable Long studentId){
        return returnService.getStudentRequests(studentId);
    }

}
