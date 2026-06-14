import type { StudentFormData } from '@/lib/validators';

export type StudentStatus = 'active' | 'inactive' | 'graduated' | 'archived';

export interface Student extends StudentFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const STUDENT_CLASSES = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
export const STUDENT_SECTIONS = ['A', 'B', 'C'];
export const STUDENT_STATUSES: StudentStatus[] = ['active', 'inactive', 'graduated', 'archived'];

export const STUDENTS_STORAGE_KEY = 'edusphere_students';

export const seedStudents: Student[] = [
  {
    id: 'stu-001',
    studentCode: 'ESM-2026-001',
    firstName: 'Aung',
    lastName: 'Min',
    email: 'aung.min@student.edusphere.mm',
    phone: '+95 9 421 123 001',
    dateOfBirth: '2010-03-12',
    gender: 'male',
    className: 'Grade 10',
    section: 'A',
    enrollmentDate: '2024-06-03',
    status: 'active',
    guardianName: 'Daw Hnin Yu',
    guardianPhone: '+95 9 421 999 101',
    address: 'No. 18, Thukha Street, Yankin Township, Yangon',
    createdAt: '2026-01-08T09:00:00.000Z',
    updatedAt: '2026-04-20T10:30:00.000Z',
  },
  {
    id: 'stu-002',
    studentCode: 'ESM-2026-002',
    firstName: 'May',
    lastName: 'Thandar',
    email: 'may.thandar@student.edusphere.mm',
    phone: '+95 9 421 123 002',
    dateOfBirth: '2011-07-22',
    gender: 'female',
    className: 'Grade 9',
    section: 'B',
    enrollmentDate: '2024-06-04',
    status: 'active',
    guardianName: 'U Zaw Win',
    guardianPhone: '+95 9 421 999 102',
    address: 'Building 4, Room 12, Chan Aye Thar San Township, Mandalay',
    createdAt: '2026-01-09T09:00:00.000Z',
    updatedAt: '2026-05-04T08:15:00.000Z',
  },
  {
    id: 'stu-003',
    studentCode: 'ESM-2026-003',
    firstName: 'Nandar',
    lastName: 'Kyaw',
    email: 'nandar.kyaw@student.edusphere.mm',
    phone: '+95 9 421 123 003',
    dateOfBirth: '2009-12-01',
    gender: 'female',
    className: 'Grade 11',
    section: 'A',
    enrollmentDate: '2023-06-05',
    status: 'inactive',
    guardianName: 'Daw Khin Mar',
    guardianPhone: '+95 9 421 999 103',
    address: 'Aung Mingalar Road, Mawlamyine, Mon State',
    createdAt: '2026-01-10T09:00:00.000Z',
    updatedAt: '2026-04-28T11:45:00.000Z',
  },
  {
    id: 'stu-004',
    studentCode: 'ESM-2026-004',
    firstName: 'Hein',
    lastName: 'Htet',
    email: 'hein.htet@student.edusphere.mm',
    phone: '+95 9 421 123 004',
    dateOfBirth: '2008-09-16',
    gender: 'male',
    className: 'Grade 12',
    section: 'C',
    enrollmentDate: '2022-06-01',
    status: 'graduated',
    guardianName: 'U Tun Lin',
    guardianPhone: '+95 9 421 999 104',
    address: 'Mingalar Taung Nyunt Township, Yangon',
    createdAt: '2026-01-11T09:00:00.000Z',
    updatedAt: '2026-05-21T14:20:00.000Z',
  },
  {
    id: 'stu-005',
    studentCode: 'ESM-2026-005',
    firstName: 'Su',
    lastName: 'Myat',
    email: 'su.myat@student.edusphere.mm',
    phone: '+95 9 421 123 005',
    dateOfBirth: '2012-04-08',
    gender: 'female',
    className: 'Grade 8',
    section: 'A',
    enrollmentDate: '2025-06-02',
    status: 'active',
    guardianName: 'Daw Ei Mon',
    guardianPhone: '+95 9 421 999 105',
    address: 'Bogyoke Road, Taunggyi, Shan State',
    createdAt: '2026-01-12T09:00:00.000Z',
    updatedAt: '2026-06-01T09:05:00.000Z',
  },
];

export function createStudentId() {
  return `stu-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function getStudentFullName(student: Pick<Student, 'firstName' | 'lastName'>) {
  return `${student.firstName} ${student.lastName}`;
}

export function normalizeStudentInput(student: StudentFormData): StudentFormData {
  return {
    ...student,
    studentCode: student.studentCode.trim(),
    firstName: student.firstName.trim(),
    lastName: student.lastName.trim(),
    email: student.email.trim().toLowerCase(),
    phone: student.phone?.trim(),
    guardianName: student.guardianName.trim(),
    guardianPhone: student.guardianPhone.trim(),
    address: student.address.trim(),
  };
}

export function filterStudents(
  students: Student[],
  filters: { query: string; className: string; status: string }
) {
  const query = filters.query.trim().toLowerCase();

  return students.filter((student) => {
    const matchesQuery =
      query.length === 0 ||
      [
        student.studentCode,
        student.firstName,
        student.lastName,
        student.email,
        student.guardianName,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query);

    const matchesClass = filters.className === 'all' || student.className === filters.className;
    const matchesStatus = filters.status === 'all' || student.status === filters.status;

    return matchesQuery && matchesClass && matchesStatus;
  });
}
