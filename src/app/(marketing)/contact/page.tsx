import { Metadata } from 'next';
import ContactContent from './contact-content';

export const metadata: Metadata = {
  title: 'Contact - EduSphere Myanmar',
  description: 'Get in touch with EduSphere Myanmar to schedule a demo or ask questions.',
};

export default function ContactPage() {
  return <ContactContent />;
}
