'use client';

import { Toaster } from 'sonner';

/**
 * ToastProvider — mounts the Sonner toaster at top-right, auto-dismiss 5s.
 * Validates: Requirements 10.5
 */
export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      duration={5000}
      richColors
      closeButton
    />
  );
}
