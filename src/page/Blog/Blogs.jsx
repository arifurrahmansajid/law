import { useState } from 'react';
import Footer from '../../component/Footer/Footer';

// Blog data in JSON format
const blogData = [
  {
    id: 1,
    title: "What is useState and how does it work in React?",
    answer: "useState is a React Hook that allows functional components to manage state. It returns an array with two elements: the current state value and a function to update it. When the update function is called, React re-renders the component with the new state value. State updates may be batched for performance. useState should be called at the top level of components, not inside loops or conditions."
  },
  {
    id: 2,
    title: "What is the purpose of useEffect in React?",
    answer: "useEffect is a React Hook for performing side effects in functional components. It handles operations like data fetching, DOM manipulation, subscriptions, and timers. It replaces lifecycle methods from class components by running after render. The dependency array controls when effects run: empty array runs once, no array runs on every render, and specific dependencies run when those values change. The cleanup function prevents memory leaks."
  },
  {
    id: 3,
    title: "What is a custom hook in React and when should you use one?",
    answer: "Custom hooks are JavaScript functions that use React hooks and follow the 'use' naming convention (e.g., useFormInput). They extract and reuse stateful logic between components without changing the component hierarchy. Use custom hooks when you have complex logic shared across components, need to abstract away implementation details, or want to create reusable functionality packages. They promote code reusability, separation of concerns, and cleaner components."
  },
  {
    id: 4,
    title: "Difference between controlled and uncontrolled components. Which one is better?",
    answer: "Controlled components store form data in React state, with values and changes managed through props and event handlers. Uncontrolled components store data in the DOM itself, using refs to access values when needed. Controlled components offer more control and validation capabilities but require more code. Uncontrolled components are simpler but less predictable. Neither is inherently better; controlled components are preferred for forms needing validation or complex interactions, while uncontrolled components work for simple use cases or when integrating with non-React code."
  },
  {
    id: 5,
    title: "Tell us something about useFormStatus() in React.",
    answer: "useFormStatus is a React hook that provides form submission status information within the context of a form. It returns an object containing properties like pending (boolean indicating if form is submitting), data (submitted form data), and error (any submission errors). This hook must be used within a Form component or its descendants. It's useful for creating loading indicators, disabling buttons during submission, and handling form submission states without managing extra state variables."
  }
];

export default function BlogPage() {
  const [expandedPost, setExpandedPost] = useState(null);

  const togglePost = (id) => {
    if (expandedPost === id) {
      setExpandedPost(null);
    } else {
      setExpandedPost(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">React Development Blog</h1>
          <p className="text-lg text-gray-600">
            Let's explore some basic concepts that will make you a good developer
          </p>
        </div>
        
        {/* Blog Posts */}
        <div className="space-y-6">
          {blogData.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div 
                className="px-6 py-4 cursor-pointer flex justify-between items-center"
                onClick={() => togglePost(post.id)}
              >
                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                <svg 
                  className={`w-5 h-5 text-gray-500 transition-transform ${expandedPost === post.id ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {expandedPost === post.id && (
                <div className="px-6 py-4 border-t border-gray-100">
                  <span className="text-green-600 font-medium block mb-2">Answer:</span>
                  <p className="text-gray-700">{post.answer}</p>
                </div>
              )}
              
              <div className="px-6 py-3 bg-gray-50 text-gray-500 text-sm">
                Added at 2023-04-23
              </div>
            </div>
          ))}
        </div>
        
       
      </div>

      <div className='mt-12'>
          <Footer/>
        </div>
    </div>
  );
}