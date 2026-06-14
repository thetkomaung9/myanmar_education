# design.md

# EduSphere Myanmar - System Design Document

## Project Information

-   **Project Name:** EduSphere Myanmar
-   **System Type:** School Management & E-Class System
-   **Development Team:** iTech Solutions
-   **Architecture Style:** Modular Monolithic Architecture
-   **Platform:** Responsive Web Application

------------------------------------------------------------------------

# System Architecture

## High-Level Architecture

``` text
Users
  ↓
Cloudflare
  ↓
Nginx Reverse Proxy
  ↓
Next.js Frontend
  ↓ REST API
NestJS Backend
  ↓
PostgreSQL Database
  ↓
AWS S3 Storage
```

------------------------------------------------------------------------

# Frontend Design

## Technology Stack

-   Next.js
-   TypeScript
-   Tailwind CSS

## User Interfaces

### Authentication Pages

-   Login Page
-   Forgot Password Page
-   Reset Password Page

### Admin Portal

-   Dashboard
-   Student Management
-   Teacher Management
-   Class Management
-   Attendance Reports

### Teacher Portal

-   Dashboard
-   Attendance Recording
-   Assigned Classes
-   Learning Material Management

### Student Portal

-   Personal Profile
-   Attendance Records
-   Learning Materials
-   Assignment Submission

------------------------------------------------------------------------

# Backend Design

## Framework

NestJS

## Modules

### Authentication Module

Responsibilities: - Login - JWT Generation - Password Reset

### User Module

Responsibilities: - User CRUD Operations - Role Assignment

### Student Module

Responsibilities: - Student Registration - Student Profiles - Archive
Management

### Teacher Module

Responsibilities: - Teacher Profiles - Subject Assignments

### Class Module

Responsibilities: - Class Creation - Section Management - Teacher
Assignments

### Attendance Module

Responsibilities: - Attendance Recording - Attendance Reporting

### E-Class Module

Responsibilities: - Course Management - Learning Materials -
Assignments - Announcements

------------------------------------------------------------------------

# Database Design

## Main Entities

### Users

-   id
-   username
-   email
-   password_hash
-   role
-   created_at

### Students

-   id
-   student_code
-   name
-   date_of_birth
-   gender
-   class_id
-   status

### Teachers

-   id
-   employee_code
-   name
-   specialization

### Classes

-   id
-   class_name
-   section
-   teacher_id

### Attendance

-   id
-   student_id
-   date
-   status

### Courses

-   id
-   title
-   description
-   teacher_id

### Assignments

-   id
-   course_id
-   title
-   due_date

------------------------------------------------------------------------

# Security Design

## Authentication

-   JWT Authentication
-   Access Tokens

## Authorization

-   Role-Based Access Control (RBAC)

## Data Protection

-   Password Hashing
-   HTTPS Encryption

## Monitoring

-   Audit Logging

------------------------------------------------------------------------

# Deployment Design

## Infrastructure Components

-   Cloudflare
-   AWS EC2
-   Docker
-   Nginx
-   PostgreSQL
-   AWS S3

------------------------------------------------------------------------

# Design Principles

-   Separation of Concerns
-   Single Responsibility Principle
-   Responsive User Experience
-   Scalability for Future SaaS Expansion
-   Maintainable Code Structure

------------------------------------------------------------------------

# Future Design Considerations

-   Microservices Migration Strategy
-   Mobile API Support
-   Multi-Tenant SaaS Architecture
-   Real-Time Notifications
