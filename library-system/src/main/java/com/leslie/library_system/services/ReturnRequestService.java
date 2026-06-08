package com.leslie.library_system.services;

import com.leslie.library_system.dto.returnRequest.CreateReturnRequest;
import com.leslie.library_system.dto.returnRequest.ReturnRequestResponse;
import com.leslie.library_system.exception.InvalidRequestException;
import com.leslie.library_system.exception.ResourceNotFoundException;
import com.leslie.library_system.model.*;
import com.leslie.library_system.repository.BorrowRecordRepository;
import com.leslie.library_system.repository.ReturnRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ReturnRequestService {
    private final ReturnRequestRepository returnRequestRepository;
    private final BorrowRecordRepository borrowRecordRepository;
    private final BorrowRecordService borrowRecordService;
    private final UserService userService;

    public ReturnRequestResponse createReturnRequest(CreateReturnRequest request){
        BorrowRecord record = borrowRecordService.getBorrowRecordEntity(request.borrowRecordId());

        if (record.getStatus() != BorrowRecordStatus.BORROWING){
            throw new InvalidRequestException("Book is not currently borrowed");
        }

        // save status of borrow record as return_pending
        record.setStatus(BorrowRecordStatus.RETURN_PENDING);
        borrowRecordRepository.save(record);

        // return request response
        ReturnRequest returnRequest = ReturnRequest.builder()
                .borrowRecord(record)
                .student(record.getStudent())
                .status(RequestStatus.PENDING)
                .requestDate(LocalDateTime.now())
                .build();

        return toResponse(returnRequestRepository.save(returnRequest));
    }

    public List<ReturnRequestResponse> getAllRequests() {
        return returnRequestRepository.findAll()
                .stream().map(this::toResponse)
                .toList();
    }

    public ReturnRequestResponse approveRequest(Long requestId, Long adminId){
        ReturnRequest request = findReturnRequestEntity(requestId);
        User admin = userService.findUserEntityById(adminId);

        if (request.getStatus() != RequestStatus.PENDING){
            throw new InvalidRequestException("Borrow request has already been processed.");
        }

        BorrowRecord record = request.getBorrowRecord();
        Book book = record.getBook();

        // return exactly number of books when borrowed
        book.returnBook(record.getQuantity());

        // update record
        record.setStatus(BorrowRecordStatus.RETURNED);
        record.setReturnDate(LocalDateTime.now());

        // update request
        request.setStatus(RequestStatus.APPROVED);
        request.setProcessedBy(admin);
        request.setProcessedDate(LocalDateTime.now());

        borrowRecordRepository.save(record);
        return toResponse(returnRequestRepository.save(request));

    }

    public ReturnRequestResponse rejectRequest(Long requestId, Long adminId, String reason){
        ReturnRequest request = findReturnRequestEntity(requestId);
        User admin = userService.findUserEntityById(adminId);

        if (request.getStatus() != RequestStatus.PENDING){
            throw new InvalidRequestException("Borrow request has already been processed.");
        }

        // update request
        request.setStatus(RequestStatus.REJECTED);
        request.setProcessedBy(admin);
        request.setProcessedDate(LocalDateTime.now());
        request.setRejectionReason(reason);

        return toResponse(returnRequestRepository.save(request));
    }

    public ReturnRequest findReturnRequestEntity(Long id){
        return returnRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Return request not found"));
    }

    private ReturnRequestResponse toResponse(ReturnRequest request){
        return new ReturnRequestResponse(
                request.getId(),
                request.getBorrowRecord().getId(),
                request.getBorrowRecord().getBook().getTitle(),
                request.getStudent().getName(),
                request.getStatus()
        );
    }


    public List<ReturnRequestResponse> getStudentRequests(Long studentId) {
        return returnRequestRepository.findByStudentId(studentId)
                .stream().map(this::toResponse)
                .toList();
    }
}
