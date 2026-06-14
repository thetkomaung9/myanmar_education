'use client';

import {
  BarChart3,
  CalendarRange,
  ClipboardCheck,
  Clock,
  UserX,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  getAttendanceSummary,
  getClassSectionKey,
  type AttendanceRecord,
  type AttendanceStatus,
} from './attendanceData';
import { useAttendance } from './useAttendance';
import { useStudents } from '@/features/students/useStudents';

function statusBadgeClass(status: AttendanceStatus) {
  const classes = {
    present:
      'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-200',
    absent: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/20 dark:text-red-200',
    late: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-100',
  };
  return classes[status];
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
        <Icon size={18} className="text-brand-600 dark:text-brand-400" />
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function isWithinRange(record: AttendanceRecord, startDate: string, endDate: string) {
  return record.date >= startDate && record.date <= endDate;
}

function getDefaultStartDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().slice(0, 10);
}

function getDefaultEndDate() {
  return new Date().toISOString().slice(0, 10);
}

export default function AdminAttendanceReportClient() {
  const { students } = useStudents();
  const { records } = useAttendance();
  const activeStudents = students.filter((student) => student.status === 'active');
  const classSections = Array.from(new Set(activeStudents.map(getClassSectionKey))).sort();
  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [selectedClassSection, setSelectedClassSection] = useState('all');

  const filteredRecords = useMemo(() => {
    return records
      .filter((record) => isWithinRange(record, startDate, endDate))
      .filter((record) => {
        if (selectedClassSection === 'all') return true;
        return `${record.className}-${record.section}` === selectedClassSection;
      })
      .sort((a, b) => b.date.localeCompare(a.date) || a.studentName.localeCompare(b.studentName));
  }, [endDate, records, selectedClassSection, startDate]);

  const summary = getAttendanceSummary(filteredRecords);

  const classBreakdown = useMemo(() => {
    return classSections.map((classSection) => {
      const classRecords = filteredRecords.filter(
        (record) => `${record.className}-${record.section}` === classSection
      );
      return {
        classSection,
        ...getAttendanceSummary(classRecords),
      };
    });
  }, [classSections, filteredRecords]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
          School Admin
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
          Attendance Reports
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
          Review attendance trends by date range and class section.
        </p>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Start Date
            <input
              type="date"
              value={startDate}
              max={endDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-brand-900"
            />
          </label>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            End Date
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-brand-900"
            />
          </label>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Class
            <select
              value={selectedClassSection}
              onChange={(event) => setSelectedClassSection(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-brand-900"
            >
              <option value="all">All classes</option>
              {classSections.map((classSection) => (
                <option key={classSection} value={classSection}>
                  {classSection}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Attendance rate" value={`${summary.attendanceRate}%`} icon={BarChart3} />
        <StatCard label="Present" value={summary.present} icon={ClipboardCheck} />
        <StatCard label="Absent" value={summary.absent} icon={UserX} />
        <StatCard label="Late" value={summary.late} icon={Clock} />
      </div>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800 xl:col-span-1">
          <div className="flex items-center gap-2">
            <CalendarRange size={20} className="text-brand-600 dark:text-brand-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Class Breakdown</h2>
          </div>
          <div className="mt-5 space-y-4">
            {classBreakdown.map((item) => (
              <div key={item.classSection}>
                <div className="flex items-center justify-between text-sm">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {item.classSection}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">{item.attendanceRate}%</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-brand-600"
                    style={{ width: `${item.attendanceRate}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {item.total} records · {item.present} present · {item.late} late
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 xl:col-span-2">
          <div className="border-b border-slate-200 p-5 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Attendance Records</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Showing {filteredRecords.length} saved records for the selected filters.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-900/60">
                <tr>
                  {['Date', 'Student', 'Class', 'Status', 'Note'].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredRecords.map((record) => (
                  <tr key={`${record.date}-${record.studentId}`}>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                      {record.date}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {record.studentName}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {record.studentCode}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
                      {record.className}-{record.section}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusBadgeClass(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="min-w-48 px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {record.note || 'No note'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="p-8 text-center">
              <p className="font-semibold text-slate-900 dark:text-white">No records found</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Save attendance from the teacher portal or adjust the filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
