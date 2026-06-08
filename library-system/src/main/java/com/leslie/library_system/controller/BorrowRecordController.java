package com.leslie.library_system.controller;

import com.leslie.library_system.dto.borrowRecord.BorrowRecordResponse;
import com.leslie.library_system.model.BorrowRecord;
import com.leslie.library_system.services.BorrowRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/borrow-records")
public class BorrowRecordController {
    private final BorrowRecordService borrowRecordService;

    @GetMapping("/student/{studentId}")
    public List<BorrowRecordResponse> getBorrowedBooks(@PathVariable Long studentId){
        return borrowRecordService.getBorrowedBooks(studentId);
    }
}
