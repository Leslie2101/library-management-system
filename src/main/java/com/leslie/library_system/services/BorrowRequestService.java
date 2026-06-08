package com.leslie.library_system.services;

import com.leslie.library_system.dto.borrowRequest.BorrowRequestResponse;
import com.leslie.library_system.dto.borrowRequest.CreateBorrowRequest;
import com.leslie.library_system.exception.InsufficientResourceException;
import com.leslie.library_system.model.Book;
import com.leslie.library_system.model.BorrowRequest;
import com.leslie.library_system.model.RequestStatus;
import com.leslie.library_system.model.User;
import com.leslie.library_system.repository.BorrowRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class BorrowRequestService {
    private final BorrowRequestRepository borrowRequestRepository;
    private final UserService userService;
    private final BookService bookService;

    public BorrowRequestResponse createRequest(CreateBorrowRequest request) {
        User student = userService.findUserEntityById(request.studentId());
        Book book = bookService.findBookEntityById(request.bookId());

        int availableStock = book.getTotalStock() - book.getUsedStock();

        // Check if enough book to be rented
        if (request.quantity() > availableStock){
            throw new InsufficientResourceException(
                    String.format(
                            "Only %d copies available, but %d requested",
                            availableStock,
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
