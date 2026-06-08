package com.leslie.library_system.services;

import com.leslie.library_system.dto.borrowRecord.BorrowRecordResponse;
import com.leslie.library_system.exception.ResourceNotFoundException;
import com.leslie.library_system.model.BorrowRecord;
import com.leslie.library_system.repository.BorrowRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BorrowRecordService {
    private final BorrowRecordRepository borrowRecordRepository;

    public BorrowRecord getBorrowRecordEntity(Long id) {
        return borrowRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Borrow record id %s not found")
                );
    }

    public List<BorrowRecordResponse> getBorrowedBooks(Long studentId){
        return borrowRecordRepository.findByStudentId(studentId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private BorrowRecordResponse toResponse(BorrowRecord record){
        return new BorrowRecordResponse(
                record.getId(),
                record.getStudent().getId(),
                record.getStudent().getName(),
                record.getBook().getId(),
                record.getBook().getTitle(),
                record.getQuantity(),
                record.getStatus(),
                record.getBorrowDate(),
                record.getReturnDate()
        );
    }
}
