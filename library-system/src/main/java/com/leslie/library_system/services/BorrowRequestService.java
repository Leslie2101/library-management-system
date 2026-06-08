package com.leslie.library_system.services;

import com.leslie.library_system.dto.borrowRequest.BorrowRequestResponse;
import com.leslie.library_system.dto.borrowRequest.CreateBorrowRequest;
import com.leslie.library_system.exception.InvalidRequestException;
import com.leslie.library_system.exception.ResourceNotFoundException;
import com.leslie.library_system.model.*;
import com.leslie.library_system.repository.BorrowRecordRepository;
import com.leslie.library_system.repository.BorrowRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BorrowRequestService {
    private final BorrowRequestRepository borrowRequestRepository;
    private final BorrowRecordRepository borrowRecordRepository;
    private final UserService userService;
    private final BookService bookService;

    public List<BorrowRequestResponse> getAllBorrowRequests(){
        return borrowRequestRepository.findAll().stream().map(this::toResponse).toList();
    }

    public BorrowRequestResponse createRequest(CreateBorrowRequest request) {
        User student = userService.findUserEntityById(request.studentId());
        Book book = bookService.findBookEntityById(request.bookId());


        // Check if enough book to be rented
        if (request.quantity() > book.getAvailableStock()){
            throw new InvalidRequestException(
                    String.format(
                            "Only %d copies available, but %d requested",
                            book.getAvailableStock(),
                            request.quantity()
                    )
            );
        }

        BorrowRequest borrowRequest = BorrowRequest.builder()
                .student(student)
                .book(book)
                .quantity(request.quantity())
                .status(RequestStatus.PENDING)
                .requestDate(LocalDateTime.now())
                .build();

        return toResponse(borrowRequestRepository.save(borrowRequest));
    }

    public BorrowRequestResponse approveRequest(Long requestId, Long adminId){
        BorrowRequest request = findBorrowRequestEntity(requestId);

        if (request.getStatus() != RequestStatus.PENDING){
            throw new InvalidRequestException("Borrow request has already been processed");
        }

        User admin = userService.findUserEntityById(adminId);
        Book book = request.getBook();

        // borrow book logic
        book.borrow(request.getQuantity());
        request.setStatus(RequestStatus.APPROVED);
        request.setProcessedDate(LocalDateTime.now());
        request.setProcessedBy(admin);

        // save record
        BorrowRecord record = BorrowRecord.builder()
                .student(request.getStudent())
                .book(book)
                .quantity(request.getQuantity())
                .borrowDate(LocalDateTime.now())
                .status(BorrowRecordStatus.BORROWING)
                .build();

        borrowRecordRepository.save(record);
        return toResponse(borrowRequestRepository.save(request));

    }

    public BorrowRequestResponse rejectRequest(Long requestId, Long adminId, String reason){
        BorrowRequest request = findBorrowRequestEntity(requestId);
        if (request.getStatus() != RequestStatus.PENDING){
            throw new InvalidRequestException("Borrow request has already been processed");
        }

        User admin = userService.findUserEntityById(adminId);
        request.setStatus(RequestStatus.REJECTED);
        request.setProcessedBy(admin);
        request.setProcessedDate(LocalDateTime.now());
        request.setRejectionReason(reason);

        return toResponse(borrowRequestRepository.save(request));
    }

    public BorrowRequest findBorrowRequestEntity(Long id){
        return borrowRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow request not found"));
    }

    public List<BorrowRequestResponse> getStudentRequests(Long studentId) {
        return borrowRequestRepository.findByStudentId(studentId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private BorrowRequestResponse toResponse(BorrowRequest request){
        return new BorrowRequestResponse(
                request.getId(),
                request.getStudent().getName(),
                request.getBook().getTitle(),
                request.getQuantity(),
                request.getStatus()
        );
    }

}
