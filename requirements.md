# requirements.md

# EduSphere Myanmar - Software Requirements Specification (SRS)

## Project Information

-   **Project Name:** EduSphere Myanmar
-   **Project Type:** School Management & E-Class System
-   **Organization:** အထက-၁
-   **Development Team:** iTech Solutions
-   **Duration:** 16 Weeks

------------------------------------------------------------------------

# Functional Requirements

## FR-001 Authentication System

-   Users shall be able to log in using email or username.
-   Users shall be able to log out securely.
-   Users shall be able to reset forgotten passwords.
-   The system shall use JWT authentication.

## FR-002 Role-Based Access Control (RBAC)

The system shall support the following roles: - Super Admin - School
Admin - Teacher - Student

Each role shall only access authorized features.

## FR-003 Student Management

The system shall allow administrators to: - Add student records. - Edit
student information. - Search students. - View student profiles. -
Archive inactive students.

## FR-004 Teacher Management

The system shall allow administrators to: - Add teacher records. - Edit
teacher information. - Assign subjects. - View teacher profiles.

## FR-005 Class Management

The system shall allow administrators to: - Create classes. - Create
sections. - Assign teachers to classes.

## FR-006 Attendance Management

Teachers shall be able to: - Record daily attendance. - Mark Present,
Absent, or Late status. - Update attendance records.

Administrators shall be able to: - View attendance reports. - Export
attendance summaries.

## FR-007 Dashboard

Admin Dashboard shall display: - Total students. - Total teachers. -
Total classes. - Attendance summaries.

Teacher Dashboard shall display: - Assigned classes. - Today's
attendance tasks.

## FR-008 E-Class System (Phase 2)

### Course Management

-   Create courses.
-   Assign teachers to courses.

### Learning Materials

-   Upload PDF materials.
-   Share resource links.
-   Share video links.

### Assignments

-   Create assignments.
-   Accept student submissions.
-   Track submission status.

### Announcements

-   Publish school notices.
-   Publish course updates.

------------------------------------------------------------------------

# Non-Functional Requirements

## Performance

-   Support at least 1,000 concurrent users.
-   Attendance submission response time shall be less than 3 seconds.

## Security

-   Password hashing shall be implemented.
-   JWT authentication shall be enforced.
-   RBAC authorization shall be enforced.
-   HTTPS shall be enabled.
-   Audit logs shall be maintained.

## Availability

-   System uptime target: 99%.

## Scalability

-   Infrastructure shall support future SaaS expansion.

## Usability

-   Responsive design for desktop, tablet, and mobile devices.
-   User-friendly interfaces for non-technical users.

## Maintainability

-   Code shall follow clean architecture principles.
-   Documentation shall be maintained throughout development.

------------------------------------------------------------------------

# Technical Requirements

## Frontend

-   Next.js
-   TypeScript
-   Tailwind CSS

## Backend

-   NestJS

## Database

-   PostgreSQL

## Infrastructure

-   AWS EC2
-   Docker
-   Nginx

## Storage

-   AWS S3

## CI/CD

-   GitHub Actions

------------------------------------------------------------------------

# Future Requirements

-   Parent Portal
-   Online Examination System
-   Auto Grading
-   Certificates
-   SMS Notifications
-   Mobile Applications
-   Multi-school SaaS Support

------------------------------------------------------------------------

# Acceptance Criteria

The system shall be accepted when:

-   Digital attendance management functions correctly.
-   Student and teacher data are centralized.
-   RBAC permissions operate correctly.
-   The application is successfully deployed on AWS.
-   Teachers can share learning materials through E-Class features.
