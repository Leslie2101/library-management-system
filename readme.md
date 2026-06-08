# Library Borrowing Management System

## Overview

The Library Borrowing Management System is a full-stack web application built using Spring Boot and React.

The system allows students to borrow books, view borrowing records, and request returns. Administrators can manage books and users while approving or rejecting borrowing and return requests.

## Features

### Student Portal

* Login
* Create borrow requests
* View borrow requests
* View borrowed books
* Request book returns

### Admin Portal

* Login
* Manage books (Create, Read, Update, Delete)
* Manage users
* Approve or reject borrow requests
* Approve or reject return requests

## Technology Stack

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* Hibernate
* MySQL

### Frontend

* React
* Vite
* Axios
* React Router

## Documentation

* [Setup Guide](setup.md)
* [Architecture Documentation](architecture.md)

## System Workflow

```text
Student Login
    ↓
Create Borrow Request
    ↓
Admin Approves Request
    ↓
Borrow Record Created
    ↓
Student Requests Return
    ↓
Admin Approves Return (if Admin rejects, student can make another return request)
    ↓
Book Returned
```
