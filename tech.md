# Technology Stack & Implementation Standards (tech.md)

## 1. Introduction
This document defines the technology stack, development standards, architectural patterns, and code quality guidelines for **EduSphere Myanmar (School Management & E-Class System)**[cite: 2]. It serves as a technical blueprint for the engineering team to ensure system scalability, security, and maintainability across the 16-week development lifecycle[cite: 2].

---

## 2. Technical Stack Overview

### 2.1 Frontend Architecture
* **Framework:** Next.js 14 (App Router)[cite: 2]
* **Language:** TypeScript (Strict Mode)[cite: 2]
* **Styling:** Tailwind CSS + Shadcn UI (Component Library)[cite: 2]
* **State Management:** Zustand (Global State) & React Query / TanStack Query (Server State Cache)[cite: 2]
* **Form Management:** React Hook Form + Zod (Schema Validation)[cite: 2]

### 2.2 Backend Architecture
* **Framework:** NestJS (Modular Architecture)[cite: 2]
* **Language:** TypeScript[cite: 2]
* **ORM:** TypeORM / Prisma[cite: 2]
* **API Protocol:** RESTful API (JSON payload)[cite: 2]
* **Documentation:** Swagger / OpenAPI 3.0[cite: 2]

### 2.3 Database & Storage
* **Primary Database:** PostgreSQL 15+ (Relational data, Transactions)[cite: 2]
* **Caching & Session:** Redis (Optional, for future scale)[cite: 2]
* **Object Storage:** AWS S3 (For student photos, assignment PDFs, learning resources)[cite: 2]

### 2.4 Infrastructure & DevOps
* **Reverse Proxy / CDN:** Cloudflare (DNS, SSL, DDoS protection)[cite: 2]
* **Web Server:** Nginx (Reverse proxy inside EC2)[cite: 2]
* **Containerization:** Docker & Docker Compose[cite: 2]
* **Cloud Provider:** AWS EC2 (Ubuntu Linux Server)[cite: 2]
* **CI/CD Pipeline:** GitHub Actions[cite: 2]

---

## 3. Core Coding Standards & Guidelines

### 3.1 Code Style & Linting
* **Linter:** ESLint with TypeScript rules configuration[cite: 2].
* **Formatter:** Prettier with standardized settings (`semi: true`, `singleQuote: true`, `tabWidth: 2`)[cite: 2].
* **Git Hooks:** Husky + lint-staged to run linters and formatters before every commit[cite: 2].

### 3.2 Naming Conventions
* **Files & Directories:**
    * Frontend: Kebab-case for folders and non-component files (e.g., `student-list/page.tsx`, `use-auth.ts`)[cite: 2]. PascalCase for React UI components (e.g., `Button.tsx`, `StudentTable.tsx`)[cite: 2].
    * Backend: Kebab-case with descriptive suffixes (e.g., `student.controller.ts`, `student.service.ts`, `create-student.dto.ts`)[cite: 2].
* **Variables & Functions:** `camelCase` (e.g., `getStudentById`, `totalStudents`)[cite: 2].
* **Classes & Interfaces:** `PascalCase` (e.g., `StudentService`, `CreateStudentDto`, `StudentInterface`)[cite: 2].
* **Database Tables & Columns:** `snake_case` (e.g., `student_records`, `first_name`, `created_at`)[cite: 2].

### 3.3 TypeScript Configuration
* `strict: true` must be enabled in `tsconfig.json`[cite: 2].
* The use of `any` type is strictly prohibited[cite: 2]. Use explicit interfaces, types, or `unknown` where applicable[cite: 2].

---

## 4. Architectural Patterns

### 4.1 Frontend Structure (Next.js App Router)
```text
src/
├── app/                  # Route handlers and pages
│   ├── (auth)/           # Authentication route group
│   ├── admin/            # Admin dashboard routes
│   ├── teacher/          # Teacher dashboard routes
│   └── student/          # Student dashboard routes
├── components/           # Reusable UI Components
│   ├── ui/               # Base components (Shadcn)
│   └── shared/           # Business-specific shared layouts
├── hooks/                # Custom React hooks
├── services/             # API client calls (Axios/Fetch configurations)
├── store/                # Zustand global state stores
└── utils/                # Helper functions and validators
```[cite: 2]

### 4.2 Backend Structure (NestJS Modules)
Each feature must be encapsulated into an independent module comprising controllers, services, entities, and DTOs:
```text
src/
├── modules/
│   ├── auth/             # Authentication logic & JWT strategy
│   ├── users/            # Base User module
│   ├── students/         # Student profiles and management
│   ├── teachers/         # Teacher profiles and assignments
│   └── attendance/       # Daily tracking and logs
├── common/               # Guards, interceptors, filters, decorators
└── config/               # Database and environment configurations
```[cite: 2]

---

## 5. Security & Exception Handling

### 5.1 Security Implementation Standards
1.  **Authentication:** Stateless JWT stored in Secure, HttpOnly, SameSite=Strict Cookies to mitigate Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF)[cite: 2].
2.  **Authorization:** Role-Based Access Control (RBAC) applied via NestJS Guards at the controller or route level (`@Roles(Role.Admin)`)[cite: 2].
3.  **Password Security:** Passwords must be hashed using `bcrypt` with a salt round factor of 10 or 12 before persistence[cite: 2].
4.  **Data Validation:** All incoming payloads must be strictly validated[cite: 2]. Frontend uses Zod; Backend uses NestJS `ValidationPipe` with `class-validator` and `class-transformer`[cite: 2].

### 5.2 Exception Handling Policy
* **Backend Error Responses:** Standardized JSON error schema for all failed API responses:
```json
    {
      "statusCode": 400,
      "message": ["First name should not be empty"],
      "error": "Bad Request",
      "timestamp": "2026-06-14T02:13:00.000Z",
      "path": "/api/v1/students"
    }
    ```[cite: 2]
* **Database Errors:** Raw database errors must be caught by a global exceptions filter and converted into meaningful HTTP responses (e.g., `QueryFailedError` unique constraint transformed into `409 Conflict`)[cite: 2].

---

## 6. Environment & Deployment Standards

### 6.1 Environment Variable Management (`.env`)
Environment variables must be explicitly defined in a template file (`.env.example`)[cite: 2]. Production credentials must never be committed to source control[cite: 2].
* **Required Variables:** `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET`[cite: 2].

### 6.2 Deployment Pipeline (CI/CD)
* **Continuous Integration (CI):** Triggered on Pull Requests to `main` and `develop` branches[cite: 2]. Executes linting check (`npm run lint`), code formatting check, and production build checks (`npm run build`)[cite: 2].
* **Continuous Deployment (CD):** Triggered upon merging to the `main` branch[cite: 2]. GitHub Actions logs into AWS EC2, pulls the latest source code, runs Docker Compose to build and swap containers with zero or minimal downtime[cite: 2].