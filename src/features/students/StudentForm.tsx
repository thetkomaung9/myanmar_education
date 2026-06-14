'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { studentSchema, type StudentFormData } from '@/lib/validators';
import { STUDENT_CLASSES, STUDENT_SECTIONS, STUDENT_STATUSES, type Student } from './studentData';

interface StudentFormProps {
  defaultValues?: Student;
  existingStudentCodes: string[];
  onCancel: () => void;
  onSubmit: (data: StudentFormData) => void;
  submitLabel: string;
}

const emptyStudentForm: StudentFormData = {
  studentCode: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: 'female',
  className: '',
  section: '',
  enrollmentDate: '',
  status: 'active',
  guardianName: '',
  guardianPhone: '',
  address: '',
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{message}</p>;
}

export default function StudentForm({
  defaultValues,
  existingStudentCodes,
  onCancel,
  onSubmit,
  submitLabel,
}: StudentFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: defaultValues ?? emptyStudentForm,
  });

  const submitForm = (data: StudentFormData) => {
    const normalizedCode = data.studentCode.trim().toLowerCase();
    const duplicateCode = existingStudentCodes
      .filter((code) => code.toLowerCase() !== defaultValues?.studentCode.toLowerCase())
      .some((code) => code.toLowerCase() === normalizedCode);

    if (duplicateCode) {
      setError('studentCode', {
        type: 'manual',
        message: 'Student code must be unique',
      });
      return;
    }

    onSubmit(data);
  };

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-brand-600 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-brand-900';
  const labelClass = 'text-sm font-medium text-slate-700 dark:text-slate-200';

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className={labelClass}>
          Student Code
          <input {...register('studentCode')} className={inputClass} placeholder="ESM-2026-006" />
          <FieldError message={errors.studentCode?.message} />
        </label>

        <label className={labelClass}>
          Email
          <input
            {...register('email')}
            className={inputClass}
            placeholder="student@school.edu.mm"
            type="email"
          />
          <FieldError message={errors.email?.message} />
        </label>

        <label className={labelClass}>
          First Name
          <input {...register('firstName')} className={inputClass} placeholder="First name" />
          <FieldError message={errors.firstName?.message} />
        </label>

        <label className={labelClass}>
          Last Name
          <input {...register('lastName')} className={inputClass} placeholder="Last name" />
          <FieldError message={errors.lastName?.message} />
        </label>

        <label className={labelClass}>
          Phone
          <input {...register('phone')} className={inputClass} placeholder="+95 9 ..." />
          <FieldError message={errors.phone?.message} />
        </label>

        <label className={labelClass}>
          Date of Birth
          <input {...register('dateOfBirth')} className={inputClass} type="date" />
          <FieldError message={errors.dateOfBirth?.message} />
        </label>

        <label className={labelClass}>
          Gender
          <select {...register('gender')} className={inputClass}>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
          <FieldError message={errors.gender?.message} />
        </label>

        <label className={labelClass}>
          Status
          <select {...register('status')} className={inputClass}>
            {STUDENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <FieldError message={errors.status?.message} />
        </label>

        <label className={labelClass}>
          Class
          <select {...register('className')} className={inputClass}>
            <option value="">Select class</option>
            {STUDENT_CLASSES.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
          <FieldError message={errors.className?.message} />
        </label>

        <label className={labelClass}>
          Section
          <select {...register('section')} className={inputClass}>
            <option value="">Select section</option>
            {STUDENT_SECTIONS.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
          <FieldError message={errors.section?.message} />
        </label>

        <label className={labelClass}>
          Enrollment Date
          <input {...register('enrollmentDate')} className={inputClass} type="date" />
          <FieldError message={errors.enrollmentDate?.message} />
        </label>

        <label className={labelClass}>
          Guardian Name
          <input {...register('guardianName')} className={inputClass} placeholder="Guardian name" />
          <FieldError message={errors.guardianName?.message} />
        </label>

        <label className={labelClass}>
          Guardian Phone
          <input {...register('guardianPhone')} className={inputClass} placeholder="+95 9 ..." />
          <FieldError message={errors.guardianPhone?.message} />
        </label>

        <label className={`${labelClass} md:col-span-2`}>
          Address
          <textarea
            {...register('address')}
            className={`${inputClass} min-h-22 resize-y`}
            placeholder="Student address"
          />
          <FieldError message={errors.address?.message} />
        </label>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 dark:border-slate-700 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <X size={16} />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Save size={16} />
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
