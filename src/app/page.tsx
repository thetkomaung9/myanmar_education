import HomePage, { metadata } from './(marketing)/page';
import { Footer } from '@/components/marketing/Footer';
import { Navbar } from '@/components/marketing/Navbar';

export { metadata };

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  );
}
