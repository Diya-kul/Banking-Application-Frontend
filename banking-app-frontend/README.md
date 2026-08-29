# Banking Management System

A full-stack banking management application built as a final-year academic project, designed to replicate patterns used in real-world production banking systems — RESTful API design, layered architecture, JWT authentication, and concurrency-safe financial operations.

Built by a two-person team: backend (Spring Boot) and frontend (React), integrated via a documented REST API contract.

---

## Objective

To design and develop a secure, scalable Banking Management System that demonstrates core backend and frontend engineering competencies — RESTful API design, layered architecture, transactional integrity, JWT-based authentication, and concurrency-safe financial operations — while following clean, industry-standard practices on both ends of the stack.

---

## Core Features

### Customer Onboarding
- Customer registration with full field-level validation (Aadhar format, phone number format, email, past-date DOB)
- Aadhar ID masking on the backend (only last 4 digits ever exposed to the client)
- Password setup as a distinct step following profile creation
- Registration confirmation screen with print support

### Authentication
- JWT-based stateless authentication
- Login with email + password
- Token persisted across page refreshes (`localStorage`), automatically attached to every API request via an Axios interceptor
- Protected routes — unauthenticated users are redirected to login
- Logout clears session state and stored token

### Account Management
- Account creation for an existing customer, with a ₹1,000 minimum opening balance enforced on the backend
- Auto-generated account number and IFSC code (backend-controlled, never client-supplied)
- Account lookup by ID (balance, status, branch details)

### Transaction Engine
- Deposit funds into an account
- Withdraw funds, with minimum-balance enforcement
- Transfer funds between two accounts, wrapped in a backend `@Transactional` boundary
- Optimistic locking (JPA `@Version`) on the `Account` entity to prevent race conditions on concurrent balance updates

### Dashboard
- Quick-action cards for Open Account, Deposit, Withdraw, and Transfer
- Account lookup by ID to check balance and status

### Global Error Handling
- Structured JSON error responses from the backend (`GlobalExceptionHandler`) — no raw stack traces ever reach the client
- Field-level validation errors rendered directly next to the relevant form field
- Distinct handling for validation failures (400), authorization failures (401/403), and network failures (no response at all)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React (Vite) |
| Frontend Routing | React Router |
| HTTP Client | Axios (centralized instance + request interceptor) |
| Frontend State | React Context (`AuthContext`) |
| Backend Framework | Spring Boot |
| Backend Language | Java 21 |
| Persistence | Spring Data JPA (Hibernate) |
| Database | MySQL |
| Security | Spring Security + JWT (stateless sessions) |
| Validation | Jakarta Bean Validation |
| Boilerplate Reduction | Lombok |
| Build Tools | Vite (frontend), Maven (backend) |
| API Testing | Postman |
| Version Control | Git |

---

## Architecture

**Backend** follows a strict layered architecture with separation between persisted entities and exposed DTOs:

```
Client (React)
      ↓ HTTP + JSON
Controller   — validates request (@Valid), maps HTTP verbs to actions
      ↓ DTO
Service      — business logic, @Transactional boundaries
      ↓ Entity
Repository   — Spring Data JPA
      ↓ SQL
MySQL Database
```

**Frontend** follows an industry-standard folder structure with a centralized API layer:

```
src/
├── api/           → Axios instance + all backend call functions
├── components/    → Reusable UI pieces (ProtectedRoute, confirmation summaries)
├── pages/         → Full application screens
├── context/        → Global state (AuthContext)
├── styles/         → Shared CSS
└── utils/          → Helpers (JWT decoding, etc.)
```

Every API call flows through a single `axiosInstance`, which automatically attaches the JWT `Authorization` header via a request interceptor — no component ever manages auth headers manually.

---

## Getting Started

### Prerequisites
- Node.js 22.12+ (or 20.19+)
- Java 21
- MySQL 8.x
- Maven

### Backend Setup

```bash
cd banking-app-backend
```

Create a MySQL database:
```sql
CREATE DATABASE banking_db;
```

Set the following environment variables (or configure in `application.properties`):
```
DB_USERNAME=<your MySQL username>
DB_PASSWORD=<your MySQL password>
JWT_SECRET=<a secure secret string>
ALLOWED_ORIGIN=http://localhost:5173
```

Run the backend:
```bash
mvn spring-boot:run
```
The API will be available at `http://localhost:8080`.

### Frontend Setup

```bash
cd banking-app-frontend
npm install
```

Create a `.env` file in the project root:
```
VITE_API_BASE_URL=http://localhost:8080
```

Run the frontend:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | `/customers` | No | Register a new customer profile |
| GET | `/customers/{customerId}` | Yes | Get a customer by ID |
| POST | `/customers/{customerId}/register` | No | Set login credentials for a customer |
| POST | `/auth/login` | No | Authenticate and receive a JWT |
| POST | `/customers/{customerId}/accounts` | Yes | Open a new account for a customer |
| GET | `/accounts/{accountId}` | Yes | Get account details |
| POST | `/accounts/{accountId}/deposit` | Yes | Deposit funds |
| POST | `/accounts/{accountId}/withdraw` | Yes | Withdraw funds |
| POST | `/accounts/{accountId}/transfer` | Yes | Transfer funds to another account |

---

## Known Limitations / Future Work

- **OTP verification** was scoped out of the current version given project timeline constraints, in favor of prioritizing core transaction and concurrency correctness.
- **Transaction history with pagination** is planned but not yet implemented — depends on a backend listing endpoint.
- **Role-based access control** (e.g., distinguishing bank staff from customers) is out of scope for the current version.
- **HTTPS** is not configured for local development; a production deployment would require TLS termination.
- **Token refresh** is not implemented — the JWT simply expires after 1 hour, requiring re-login.

---

## Team

- **Backend:** Spring Boot, Spring Security, JPA, MySQL, concurrency control
- **Frontend:** React, Axios integration, authentication flow, UI/UX

---

## License

Academic project — built for educational purposes as part of a final-year submission.