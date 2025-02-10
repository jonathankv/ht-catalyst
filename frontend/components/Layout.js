import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="pt-20"> {/* Updated to match nav height (h-20 = 80px) */}
        {children}
      </main>
    </>
  );
};

export default Layout; 