import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="pt-16"> {/* Add padding-top to account for fixed navbar height */}
        {children}
      </main>
    </>
  );
};

export default Layout; 