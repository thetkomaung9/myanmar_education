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
