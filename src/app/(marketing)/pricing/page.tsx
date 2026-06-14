import { Metadata } from 'next';
import PricingContent from './pricing-content';

export const metadata: Metadata = {
  title: 'Pricing - EduSphere Myanmar',
  description: 'Affordable pricing plans for schools of all sizes.',
};

export default function PricingPage() {
  return <PricingContent />;
}
