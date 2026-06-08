# Setup Guide

## Prerequisites

* Java 17 
* Maven
* MySQL
* Node.js
* npm

## Clone repository
```bash
git clone git@github.com:Leslie2101/library-management-system.git
```


## Backend Setup

Create database:

```sql
CREATE DATABASE library_system;
```

Configure env at `library_system/.env`:

```env
DATASOURCE_URL=jdbc:mysql://localhost:3306/library_system
DATASOURCE_USER=root
DATASOURCE_PASSWORD=your_password
```

Navigate to backend directory:
```bash
cd library-system
```
Run:

```bash
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```


## Frontend Setup

Navigate to frontend directory:

```bash
cd library-system-ui
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```


## Example Users

### Student

```json
{
  "name": "Student User",
  "email": "student@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```

### Admin

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "ADMIN"
}
```


## Running the System

1. Start MySQL.
2. Start Spring Boot backend.
3. Start React frontend.
4. Create users.
5. Create borrow request with student id.
6. Approve request using admin id.
7. Create return request.
8.  Approve return request.
