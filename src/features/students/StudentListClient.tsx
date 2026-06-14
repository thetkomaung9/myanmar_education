'use client';

import Link from 'next/link';
import { Edit, Eye, Plus, Search, Trash2, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { StudentFormData } from '@/lib/validators';
import StudentForm from './StudentForm';
import {
  filterStudents,
  getStudentFullName,
  STUDENT_CLASSES,
  STUDENT_STATUSES,
  type Student,
} from './studentData';
import { useStudents } from './useStudents';

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

export default function StudentListClient() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredStudents = useMemo(
    () => filterStudents(students, { query, className: classFilter, status: statusFilter }),
    [classFilter, query, statusFilter, students]
  );

  const activeStudents = students.filter((student) => student.status === 'active').length;
  const archivedStudents = students.filter((student) => student.status === 'archived').length;

  const openCreateForm = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingStudent(null);
    setIsFormOpen(false);
  };

  const handleSubmit = (data: StudentFormData) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, data);
      toast.success('Student updated');
    } else {
      addStudent(data);
      toast.success('Student added');
    }
    closeForm();
  };

  const handleDelete = (student: Student) => {
    const confirmed = window.confirm(`Delete ${getStudentFullName(student)} from student records?`);
    if (!confirmed) return;

    deleteStudent(student.id);
    toast.success('Student deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
            School Admin
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            Student Management
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            Search student records, filter enrollment status, and manage profile details.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: 'Total students', value: students.length, icon: Users },
          { label: 'Active students', value: activeStudents, icon: Users },
          { label: 'Archived records', value: archivedStudents, icon: Users },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.label}</p>
              <item.icon size={18} className="text-brand-600 dark:text-brand-400" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="border-b border-slate-200 p-4 dark:border-slate-700">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px_180px]">
            <label className="relative">
              <span className="sr-only">Search students</span>
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 shadow-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-brand-900"
                placeholder="Search name, code, email, guardian..."
              />
            </label>

            <label>
              <span className="sr-only">Filter by class</span>
              <select
                value={classFilter}
                onChange={(event) => setClassFilter(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-brand-900"
              >
                <option value="all">All classes</option>
                {STUDENT_CLASSES.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="sr-only">Filter by status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-brand-900"
              >
                <option value="all">All statuses</option>
                {STUDENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-900/60">
              <tr>
                {['Student', 'Class', 'Guardian', 'Status', 'Enrollment', 'Actions'].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-slate-50 dark:hover:bg-slate-900/40"
                >
                  <td className="whitespace-nowrap px-4 py-4">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {getStudentFullName(student)}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {student.studentCode} · {student.email}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                    {student.className}-{student.section}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                    <p>{student.guardianName}</p>
                    <p className="text-slate-500 dark:text-slate-400">{student.guardianPhone}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusClass(
                        student.status
                      )}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                    {student.enrollmentDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/school-admin/students/${student.id}`}
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                        aria-label={`View ${getStudentFullName(student)}`}
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingStudent(student);
                          setIsFormOpen(true);
                        }}
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                        aria-label={`Edit ${getStudentFullName(student)}`}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(student)}
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        aria-label={`Delete ${getStudentFullName(student)}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="font-semibold text-slate-900 dark:text-white">No students found</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Adjust the search terms or filters to find a record.
            </p>
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4">
          <div className="mx-auto my-8 max-w-4xl rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
            <div className="border-b border-slate-200 p-6 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingStudent ? 'Edit Student' : 'Add Student'}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Complete all required profile, enrollment, and guardian information.
              </p>
            </div>
            <div className="p-6">
              <StudentForm
                defaultValues={editingStudent ?? undefined}
                existingStudentCodes={students.map((student) => student.studentCode)}
                onCancel={closeForm}
                onSubmit={handleSubmit}
                submitLabel={editingStudent ? 'Save Changes' : 'Create Student'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
