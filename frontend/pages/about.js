import Navigation from '../components/Navigation';
import About from '../components/About';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16"> {/* Add padding-top to account for fixed navigation */}
        <About />
      </main>
    </>
  );
} 