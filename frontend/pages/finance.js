import FinanceTools from '../components/finance/FinanceTools';
import AIAssistant from '../components/finance/AIAssistant';
import Navigation from '../components/Navigation';

export default function Finance() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="section-title">Personal Finance Management</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FinanceTools />
            <AIAssistant />
          </div>
        </div>
      </main>
    </>
  );
} 