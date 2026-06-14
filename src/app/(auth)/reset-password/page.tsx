import { Metadata } from 'next';
import ResetPasswordContent from './reset-password-content';

export const metadata: Metadata = {
  title: 'Reset Password - EduSphere Myanmar',
  description: 'Create a new password for your account.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return <ResetPasswordContent />;
}
