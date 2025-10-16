// "use client";

// import React, { useState } from "react";

// // Test component to verify email functionality
// const EmailTest: React.FC = () => {
//   const [email, setEmail] = useState("test@example.com");
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   const quickEmailTest = async (testEmail: string = "test@example.com") => {
//     const testData = {
//       email: testEmail,
//       prospectiveId: `TEST${Date.now().toString().slice(-6)}`,
//       password: "testPass123",
//       fullName: "Test User",
//       program: "Computer Science",
//       applicationLink: "https://sauni.edu.ng/status",
//       secondChoice: "Information Technology",
//     };

//     console.log("🧪 Quick Email Test:", testData);

//     try {
//       const response = await fetch("/api/send_email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(testData),
//       });

//       const result = await response.json();
//       console.log("📧 Email Test Result:", result);
//       return result;
//     } catch (error: any) {
//       console.error("❌ Email Test Error:", error);
//       return { error: error.message };
//     }
//   };

//   const handleTest = async () => {
//     setIsLoading(true);
//     setError(null);
//     setResult(null);

//     try {
//       const testResult = await quickEmailTest(email);
//       setResult(testResult);

//       if (testResult.error) {
//         setError(testResult.error);
//       }
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-sm">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">🧪 Email Test</h2>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Test Email Address
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter email to test"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Use a real email address to receive the test email
//           </p>
//         </div>

//         <button
//           onClick={handleTest}
//           disabled={isLoading}
//           className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           {isLoading ? (
//             <span className="flex items-center justify-center">
//               <svg
//                 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Sending Test Email...
//             </span>
//           ) : (
//             "Send Test Email"
//           )}
//         </button>

//         {error && (
//           <div className="p-3 bg-red-50 border border-red-200 rounded-md">
//             <h3 className="text-red-800 font-medium">❌ Error</h3>
//             <p className="text-red-600 text-sm mt-1">{error}</p>
//           </div>
//         )}

//         {result && !error && (
//           <div className="p-3 bg-green-50 border border-green-200 rounded-md">
//             <h3 className="text-green-800 font-medium">✅ Success</h3>
//             <pre className="text-green-600 text-sm mt-1 whitespace-pre-wrap">
//               {JSON.stringify(result, null, 2)}
//             </pre>
//           </div>
//         )}

//         <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-md">
//           <p>
//             <strong>What this tests:</strong>
//           </p>
//           <ul className="list-disc list-inside mt-1 space-y-1">
//             <li>Email API endpoint connectivity</li>
//             <li>Resend service configuration</li>
//             <li>Email template rendering</li>
//             <li>Actual email delivery</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailTest;
