import type { Student } from '@/features/students/studentData';

export type AttendanceStatus = 'present' | 'absent' | 'late';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  className: string;
  section: string;
  date: string;
  status: AttendanceStatus;
  note?: string;
  updatedAt: string;
}

export const ATTENDANCE_STORAGE_KEY = 'edusphere_attendance_records';

export const ATTENDANCE_STATUSES: AttendanceStatus[] = ['present', 'absent', 'late'];

export const seedAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'att-001',
    studentId: 'stu-001',
    studentCode: 'ESM-2026-001',
    studentName: 'Aung Min',
    className: 'Grade 10',
    section: 'A',
    date: '2026-06-10',
    status: 'present',
    updatedAt: '2026-06-10T08:30:00.000Z',
  },
  {
    id: 'att-002',
    studentId: 'stu-002',
    studentCode: 'ESM-2026-002',
    studentName: 'May Thandar',
    className: 'Grade 9',
    section: 'B',
    date: '2026-06-10',
    status: 'late',
    note: 'Arrived after morning assembly',
    updatedAt: '2026-06-10T08:35:00.000Z',
  },
  {
    id: 'att-003',
    studentId: 'stu-005',
    studentCode: 'ESM-2026-005',
    studentName: 'Su Myat',
    className: 'Grade 8',
    section: 'A',
    date: '2026-06-10',
    status: 'present',
    updatedAt: '2026-06-10T08:32:00.000Z',
  },
  {
    id: 'att-004',
    studentId: 'stu-001',
    studentCode: 'ESM-2026-001',
    studentName: 'Aung Min',
    className: 'Grade 10',
    section: 'A',
    date: '2026-06-11',
    status: 'absent',
    note: 'Guardian called school office',
    updatedAt: '2026-06-11T08:31:00.000Z',
  },
  {
    id: 'att-005',
    studentId: 'stu-005',
    studentCode: 'ESM-2026-005',
    studentName: 'Su Myat',
    className: 'Grade 8',
    section: 'A',
    date: '2026-06-11',
    status: 'present',
    updatedAt: '2026-06-11T08:29:00.000Z',
  },
];

export function createAttendanceId(studentId: string, date: string) {
  return `att-${date}-${studentId}`;
}

export function getClassSectionKey(student: Pick<Student, 'className' | 'section'>) {
  return `${student.className}-${student.section}`;
}

export function getStudentName(student: Pick<Student, 'firstName' | 'lastName'>) {
  return `${student.firstName} ${student.lastName}`;
}

export function getAttendanceSummary(records: AttendanceRecord[]) {
  const present = records.filter((record) => record.status === 'present').length;
  const absent = records.filter((record) => record.status === 'absent').length;
  const late = records.filter((record) => record.status === 'late').length;
  const total = records.length;
  const attendanceRate = total === 0 ? 0 : Math.round(((present + late) / total) * 100);

  return {
    total,
    present,
    absent,
    late,
    attendanceRate,
  };
}
