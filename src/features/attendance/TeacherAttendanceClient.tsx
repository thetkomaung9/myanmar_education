'use client';

import { CalendarDays, CheckCircle2, Clock, Save, UserX } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { getClassSectionKey, getStudentName, type AttendanceStatus } from './attendanceData';
import { useAttendance } from './useAttendance';
import { useStudents } from '@/features/students/useStudents';

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function statusButtonClass(status: AttendanceStatus, activeStatus?: AttendanceStatus) {
  const isActive = status === activeStatus;
  const base =
    'inline-flex min-w-24 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition';

  if (status === 'present') {
    return `${base} ${
      isActive
        ? 'border-green-600 bg-green-600 text-white'
        : 'border-green-200 text-green-700 hover:bg-green-50 dark:border-green-900 dark:text-green-200 dark:hover:bg-green-900/20'
    }`;
  }

  if (status === 'absent') {
    return `${base} ${
      isActive
        ? 'border-red-600 bg-red-600 text-white'
        : 'border-red-200 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-900/20'
    }`;
  }

  return `${base} ${
    isActive
      ? 'border-yellow-500 bg-yellow-500 text-slate-950'
      : 'border-yellow-200 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-900/20'
  }`;
}

function statusIcon(status: AttendanceStatus) {
  if (status === 'present') return <CheckCircle2 size={16} />;
  if (status === 'absent') return <UserX size={16} />;
  return <Clock size={16} />;
}

export default function TeacherAttendanceClient() {
  const { students } = useStudents();
  const { getRecord, saveAttendanceRecord, getRecordsForDateAndClass } = useAttendance();
  const [selectedDate, setSelectedDate] = useState(getToday());
  const activeStudents = students.filter((student) => student.status === 'active');
  const classSections = Array.from(new Set(activeStudents.map(getClassSectionKey))).sort();
  const [selectedClassSection, setSelectedClassSection] = useState(classSections[0] ?? '');
  const [draftStatuses, setDraftStatuses] = useState<Record<string, AttendanceStatus>>({});
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});

  const selectedStudents = useMemo(() => {
    return activeStudents.filter((student) => getClassSectionKey(student) === selectedClassSection);
  }, [activeStudents, selectedClassSection]);

  const selectedRecords = useMemo(() => {
    const [className, section] = selectedClassSection.split('-');
    if (!className || !section) return [];
    return getRecordsForDateAndClass(selectedDate, className, section);
  }, [getRecordsForDateAndClass, selectedClassSection, selectedDate]);

  const markedCount = selectedStudents.filter(
    (student) => draftStatuses[student.id] || getRecord(student.id, selectedDate)
  ).length;

  const setStudentStatus = (studentId: string, status: AttendanceStatus) => {
    setDraftStatuses((current) => ({ ...current, [studentId]: status }));
  };

  const setBulkStatus = (status: AttendanceStatus) => {
    const nextStatuses = selectedStudents.reduce<Record<string, AttendanceStatus>>(
      (acc, student) => {
        acc[student.id] = status;
        return acc;
      },
      {}
    );
    setDraftStatuses((current) => ({ ...current, ...nextStatuses }));
  };

  const saveAttendance = () => {
    if (!selectedDate) {
      toast.error('Select a date before saving attendance.');
      return;
    }

    if (!selectedClassSection) {
      toast.error('Select a class before saving attendance.');
      return;
    }

    if (selectedStudents.length === 0) {
      toast.error('No active students found for the selected class.');
      return;
    }

    selectedStudents.forEach((student) => {
      const existingRecord = getRecord(student.id, selectedDate);
      const status = draftStatuses[student.id] ?? existingRecord?.status ?? 'present';

      saveAttendanceRecord({
        studentId: student.id,
        studentCode: student.studentCode,
        studentName: getStudentName(student),
        className: student.className,
        section: student.section,
        date: selectedDate,
        status,
        note: draftNotes[student.id] ?? existingRecord?.note,
      });
    });

    setDraftStatuses({});
    setDraftNotes({});
    toast.success('Attendance saved');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
            Teacher Portal
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            Daily Attendance
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            Record present, absent, and late status for each active student in your class.
          </p>
        </div>
        <button
          type="button"
          onClick={saveAttendance}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          <Save size={18} />
          Save Attendance
        </button>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_220px_1fr] lg:items-end">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Attendance Date
            <div className="relative mt-1">
              <CalendarDays
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 shadow-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-brand-900"
              />
            </div>
          </label>

          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Class
            <select
              value={selectedClassSection}
              onChange={(event) => {
                setSelectedClassSection(event.target.value);
                setDraftStatuses({});
                setDraftNotes({});
              }}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-brand-900"
            >
              {classSections.map((classSection) => (
                <option key={classSection} value={classSection}>
                  {classSection}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Students
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {selectedStudents.length}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Marked
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {markedCount}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900/60">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Saved
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {selectedRecords.length}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {ATTENDANCE_BULK_ACTIONS.map((action) => (
            <button
              key={action.status}
              type="button"
              onClick={() => setBulkStatus(action.status)}
              className={statusButtonClass(action.status)}
            >
              {statusIcon(action.status)}
              {action.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="border-b border-slate-200 p-4 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {selectedClassSection || 'Class'} Roster
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Unsaved rows default to present when you save.
          </p>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {selectedStudents.map((student) => {
            const existingRecord = getRecord(student.id, selectedDate);
            const activeStatus = draftStatuses[student.id] ?? existingRecord?.status;

            return (
              <div
                key={student.id}
                className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-[1fr_auto_280px]"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {getStudentName(student)}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {student.studentCode} · {student.email}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {ATTENDANCE_BULK_ACTIONS.map((action) => (
                    <button
                      key={action.status}
                      type="button"
                      onClick={() => setStudentStatus(student.id, action.status)}
                      className={statusButtonClass(action.status, activeStatus)}
                    >
                      {statusIcon(action.status)}
                      {action.label}
                    </button>
                  ))}
                </div>

                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Note
                  <input
                    value={draftNotes[student.id] ?? existingRecord?.note ?? ''}
                    onChange={(event) =>
                      setDraftNotes((current) => ({
                        ...current,
                        [student.id]: event.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-brand-900"
                    placeholder="Optional note"
                  />
                </label>
              </div>
            );
          })}
        </div>

        {selectedStudents.length === 0 && (
          <div className="p-8 text-center">
            <p className="font-semibold text-slate-900 dark:text-white">No active students found</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Add active students to this class before recording attendance.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

const ATTENDANCE_BULK_ACTIONS: Array<{ label: string; status: AttendanceStatus }> = [
  { label: 'Present', status: 'present' },
  { label: 'Absent', status: 'absent' },
  { label: 'Late', status: 'late' },
];
