import { Metadata } from 'next';
import FeaturesContent from './features-content';

export const metadata: Metadata = {
  title: 'Features - EduSphere Myanmar',
  description: 'Discover the powerful features of EduSphere Myanmar.',
};

export default function FeaturesPage() {
  return <FeaturesContent />;
}
