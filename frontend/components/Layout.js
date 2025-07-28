import { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

/**
 * Main layout component
 * Wraps all pages with common elements like navigation and footer
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Page content
 * @returns {JSX.Element} Layout with navigation, content, and footer
 */
const Layout = ({ children }) => {
  useEffect(() => {
    // Any global layout effects can go here
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 