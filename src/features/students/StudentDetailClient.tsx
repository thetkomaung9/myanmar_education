'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Mail, Phone, Trash2, UserRound } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { StudentFormData } from '@/lib/validators';
import StudentForm from './StudentForm';
import { getStudentFullName, type Student } from './studentData';
import { useStudents } from './useStudents';

function DetailItem({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
        {value || 'Not provided'}
      </dd>
    </div>
  );
}

function statusClass(status: Student['status']) {
  const classes = {
    active: 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-200',
    inactive:
      'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-100',
    graduated: 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-100',
    archived: 'bg-slate-100 text-slate-700 ring-slate-500/20 dark:bg-slate-700 dark:text-slate-200',
  };
  return classes[status];
}

export default function StudentDetailClient({ studentId }: { studentId: string }) {
  const router = useRouter();
  const { students, getStudent, updateStudent, deleteStudent, isReady } = useStudents();
  const [isEditing, setIsEditing] = useState(false);
  const student = getStudent(studentId);

  const handleSubmit = (data: StudentFormData) => {
    if (!student) return;
    updateStudent(student.id, data);
    toast.success('Student updated');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!student) return;
    const confirmed = window.confirm(`Delete ${getStudentFullName(student)} from student records?`);
    if (!confirmed) return;

    deleteStudent(student.id);
    toast.success('Student deleted');
    router.push('/school-admin/students');
  };

  if (!isReady) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-400">Loading student profile...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="space-y-4">
        <Link
          href="/school-admin/students"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-800 dark:text-brand-400"
        >
          <ArrowLeft size={16} />
          Back to students
        </Link>
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
          <p className="font-semibold text-slate-900 dark:text-white">Student not found</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            The student record may have been deleted or the link is invalid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/school-admin/students"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-800 dark:text-brand-400"
      >
        <ArrowLeft size={16} />
        Back to students
      </Link>

      <div className="rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 dark:border-slate-700 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-100">
              <UserRound size={28} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {getStudentFullName(student)}
                </h1>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusClass(
                    student.status
                  )}`}
                >
                  {student.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {student.studentCode} · {student.className}-{student.section}
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <Mail size={16} />
                  {student.email}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Phone size={16} />
                  {student.phone || 'No phone'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Student Information
            </h2>
            <dl className="mt-4 grid grid-cols-1 gap-5 rounded-lg bg-slate-50 p-5 dark:bg-slate-900/60 sm:grid-cols-2">
              <DetailItem label="Date of birth" value={student.dateOfBirth} />
              <DetailItem label="Gender" value={student.gender} />
              <DetailItem label="Enrollment date" value={student.enrollmentDate} />
              <DetailItem
                label="Last updated"
                value={new Date(student.updatedAt).toLocaleString()}
              />
              <DetailItem label="Address" value={student.address} />
            </dl>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Guardian</h2>
            <dl className="mt-4 space-y-5 rounded-lg bg-slate-50 p-5 dark:bg-slate-900/60">
              <DetailItem label="Name" value={student.guardianName} />
              <DetailItem label="Phone" value={student.guardianPhone} />
            </dl>
          </section>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4">
          <div className="mx-auto my-8 max-w-4xl rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
            <div className="border-b border-slate-200 p-6 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Student</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Update profile, enrollment, or guardian information.
              </p>
            </div>
            <div className="p-6">
              <StudentForm
                defaultValues={student}
                existingStudentCodes={students.map((item) => item.studentCode)}
                onCancel={() => setIsEditing(false)}
                onSubmit={handleSubmit}
                submitLabel="Save Changes"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
