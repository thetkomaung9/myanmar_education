import StudentDetailClient from '@/features/students/StudentDetailClient';

export default function SchoolAdminStudentDetailPage({
  params,
}: {
  params: { studentId: string };
}) {
  return <StudentDetailClient studentId={params.studentId} />;
}
