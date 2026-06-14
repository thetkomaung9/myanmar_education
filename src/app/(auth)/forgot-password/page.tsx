import { Metadata } from 'next';
import ForgotPasswordContent from './forgot-password-content';

export const metadata: Metadata = {
  title: 'Forgot Password - EduSphere Myanmar',
  description: 'Reset your password.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordContent />;
}
