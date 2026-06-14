import { Metadata } from 'next';
import AboutContent from './about-content';

export const metadata: Metadata = {
  title: 'About - EduSphere Myanmar',
  description: 'Learn about EduSphere Myanmar and our mission to transform education.',
};

export default function AboutPage() {
  return <AboutContent />;
}
