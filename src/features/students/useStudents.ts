'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { StudentFormData } from '@/lib/validators';
import {
  createStudentId,
  normalizeStudentInput,
  seedStudents,
  STUDENTS_STORAGE_KEY,
  type Student,
} from './studentData';

function readStudentsFromStorage(): Student[] {
  if (typeof window === 'undefined') return seedStudents;

  const stored = window.localStorage.getItem(STUDENTS_STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(seedStudents));
    return seedStudents;
  }

  try {
    const parsed = JSON.parse(stored) as Student[];
    return Array.isArray(parsed) ? parsed : seedStudents;
  } catch {
    return seedStudents;
  }
}

function writeStudentsToStorage(students: Student[]) {
  window.localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(seedStudents);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setStudents(readStudentsFromStorage());
    setIsReady(true);
  }, []);

  const persistStudents = useCallback((updater: (current: Student[]) => Student[]) => {
    setStudents((current) => {
      const next = updater(current);
      writeStudentsToStorage(next);
      return next;
    });
  }, []);

  const addStudent = useCallback(
    (data: StudentFormData) => {
      const now = new Date().toISOString();
      const student: Student = {
        id: createStudentId(),
        ...normalizeStudentInput(data),
        createdAt: now,
        updatedAt: now,
      };

      persistStudents((current) => [student, ...current]);
      return student;
    },
    [persistStudents]
  );

  const updateStudent = useCallback(
    (id: string, data: StudentFormData) => {
      const normalized = normalizeStudentInput(data);
      let updatedStudent: Student | undefined;

      persistStudents((current) =>
        current.map((student) => {
          if (student.id !== id) return student;
          updatedStudent = {
            ...student,
            ...normalized,
            updatedAt: new Date().toISOString(),
          };
          return updatedStudent;
        })
      );

      return updatedStudent;
    },
    [persistStudents]
  );

  const deleteStudent = useCallback(
    (id: string) => {
      persistStudents((current) => current.filter((student) => student.id !== id));
    },
    [persistStudents]
  );

  const getStudent = useCallback(
    (id: string) => students.find((student) => student.id === id),
    [students]
  );

  return useMemo(
    () => ({
      students,
      isReady,
      addStudent,
      updateStudent,
      deleteStudent,
      getStudent,
    }),
    [addStudent, deleteStudent, getStudent, isReady, students, updateStudent]
  );
}
