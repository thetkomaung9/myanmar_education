'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ATTENDANCE_STORAGE_KEY,
  createAttendanceId,
  seedAttendanceRecords,
  type AttendanceRecord,
  type AttendanceStatus,
} from './attendanceData';

function readAttendanceFromStorage(): AttendanceRecord[] {
  if (typeof window === 'undefined') return seedAttendanceRecords;

  const stored = window.localStorage.getItem(ATTENDANCE_STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(seedAttendanceRecords));
    return seedAttendanceRecords;
  }

  try {
    const parsed = JSON.parse(stored) as AttendanceRecord[];
    return Array.isArray(parsed) ? parsed : seedAttendanceRecords;
  } catch {
    return seedAttendanceRecords;
  }
}

function writeAttendanceToStorage(records: AttendanceRecord[]) {
  window.localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(records));
}

interface SaveAttendanceRecordInput {
  studentId: string;
  studentCode: string;
  studentName: string;
  className: string;
  section: string;
  date: string;
  status: AttendanceStatus;
  note?: string;
}

export function useAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>(seedAttendanceRecords);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setRecords(readAttendanceFromStorage());
    setIsReady(true);
  }, []);

  const persistRecords = useCallback(
    (updater: (current: AttendanceRecord[]) => AttendanceRecord[]) => {
      setRecords((current) => {
        const next = updater(current);
        writeAttendanceToStorage(next);
        return next;
      });
    },
    []
  );

  const saveAttendanceRecord = useCallback(
    (input: SaveAttendanceRecordInput) => {
      const now = new Date().toISOString();
      const id = createAttendanceId(input.studentId, input.date);
      const record: AttendanceRecord = {
        id,
        ...input,
        note: input.note?.trim() || undefined,
        updatedAt: now,
      };

      persistRecords((current) => {
        const exists = current.some(
          (item) => item.studentId === input.studentId && item.date === input.date
        );
        if (!exists) return [record, ...current];

        return current.map((item) =>
          item.studentId === input.studentId && item.date === input.date ? record : item
        );
      });

      return record;
    },
    [persistRecords]
  );

  const getRecord = useCallback(
    (studentId: string, date: string) =>
      records.find((record) => record.studentId === studentId && record.date === date),
    [records]
  );

  const getRecordsForDateAndClass = useCallback(
    (date: string, className: string, section: string) =>
      records.filter(
        (record) =>
          record.date === date && record.className === className && record.section === section
      ),
    [records]
  );

  return useMemo(
    () => ({
      records,
      isReady,
      saveAttendanceRecord,
      getRecord,
      getRecordsForDateAndClass,
    }),
    [getRecord, getRecordsForDateAndClass, isReady, records, saveAttendanceRecord]
  );
}
