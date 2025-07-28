import { motion } from 'framer-motion';
import { useState } from 'react';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    setMessage('');
    setIsLoading(true);

    try {
      // Add AI response placeholder while loading
      setMessages([...newMessages, { role: 'assistant', content: '...', isLoading: true }]);

      // TODO: Implement actual API call to your backend
      // For now, simulate a response
      setTimeout(() => {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: 'I can help you with financial planning and analysis. What specific aspect would you like to discuss?'
          }
        ]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Financial AI Assistant</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get personalized financial advice and insights
          </p>
        </motion.div>

        <div className="card">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary-500 text-white ml-auto'
                    : 'bg-gray-100 dark:bg-gray-800 mr-auto'
                } max-w-[80%]`}
              >
                {msg.isLoading ? (
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                ) : (
                  msg.content
                )}
              </motion.div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about financial planning..."
                className="flex-1 input"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading || !message.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant; 