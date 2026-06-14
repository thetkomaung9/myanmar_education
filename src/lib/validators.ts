import { z } from 'zod';

/**
 * Zod validation schema for the demo request / contact form.
 * Validates: Requirements 7.2, 7.3
 */
export const demoRequestSchema = z.object({
  schoolName: z.string().min(1, 'School name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  schoolSize: z.enum(['small', 'medium', 'large'], {
    error: 'Please select a school size',
  }),
  message: z.string().optional(),
  contactMethod: z.enum(['email', 'phone', 'in-person'], {
    error: 'Please select a preferred contact method',
  }),
});

export type DemoRequestFormData = z.infer<typeof demoRequestSchema>;

/**
 * Zod schema for the reset password form.
 * Validates: Requirement 9.3
 */
export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/**
 * Zod schema for the login form.
 */
export const loginSchema = z.object({
  email: z.string().min(1, 'Email or username is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Zod schema for student profile create/edit forms.
 * Validates the school-admin student management workflow.
 */
export const studentSchema = z.object({
  studentCode: z.string().trim().min(2, 'Student code is required'),
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['female', 'male', 'other'], {
    error: 'Please select a gender',
  }),
  className: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  enrollmentDate: z.string().min(1, 'Enrollment date is required'),
  status: z.enum(['active', 'inactive', 'graduated', 'archived'], {
    error: 'Please select a status',
  }),
  guardianName: z.string().trim().min(1, 'Guardian name is required'),
  guardianPhone: z.string().trim().min(1, 'Guardian phone is required'),
  address: z.string().trim().min(5, 'Address must be at least 5 characters'),
});

export type StudentFormData = z.infer<typeof studentSchema>;
