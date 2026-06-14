import { Metadata } from 'next';
import LoginContent from './login-content';

export const metadata: Metadata = {
  title: 'Login - EduSphere Myanmar',
  description: 'Sign in to your EduSphere Myanmar account.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginContent />;
}
