import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import { sendChatMessage } from './services/chatService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user', content: input };
    const newHistory = [...messages, newMsg];
    setMessages(newHistory);
    setInput('');

    const assistantReply = await sendChatMessage(
      newHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }))
    );

    setMessages(prev => [...prev, { role: 'assistant', content: assistantReply }]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-semibold">Gemini + MCP Chat</h1>
      </header>

      <div className="flex-grow overflow-y-auto p-4 space-y-3" ref={chatContainerRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-4 shadow-md ${msg.role === 'user' ? 'bg-blue-100 self-end' : 'bg-white self-start'}`}
          >
            <div className="font-bold mb-1">{msg.role === 'user' ? 'You' : 'Assistant'}</div>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-200">
        <TextareaAutosize
          className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
          minRows={1}
        />
        <button
          onClick={sendMessage}
          className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;







// import React, { useState, useRef, useEffect } from 'react';
// // import axios from 'axios';
// import ReactMarkdown from 'react-markdown';
// import TextareaAutosize from 'react-textarea-autosize';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY!);



// interface Message {
//     role: 'user' | 'assistant';
//     content: string;
// }

// function App() {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [input, setInput] = useState('');
//     const chatContainerRef = useRef<HTMLDivElement>(null);
//     const [chatModel, setChatModel] = useState<any>(null);

//     useEffect(() => {
//         if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//     }, [messages]);

//     useEffect(() => {
//         const initChat = async () => {
//           const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
//           const chat = model.startChat({
//             history: [],
//           });
//           setChatModel(chat);
//         };
//         initChat();
//       }, []);

//       const sendMessage = async () => {
//         if (!input.trim() || !chatModel) return;
    
//         const userMessage: Message = { role: 'user', content: input };
//         setMessages(prev => [...prev, userMessage]);
//         setInput('');
    
//         try {
//             const result = await chatModel.sendMessage(input);
//             const response = await result.response;
//             const text = response.text();
          
//             const botMessage: Message = { role: 'assistant', content: text };
//             setMessages(prevMessages => [...prevMessages, botMessage]);
//           } catch (error: any) {
//             console.error('Error:', error);
          
//             if (error.message.includes('RECITATION')) {
//               setMessages(prev => [
//                 ...prev,
//                 { role: 'assistant', content: "Sorry, your prompt or the model's reply was blocked due to policy (e.g., recitation of protected or restricted content)." },
//               ]);
//             } else {
//               setMessages(prev => [
//                 ...prev,
//                 { role: 'assistant', content: 'Sorry, I encountered an error.' },
//               ]);
//             }
//           }
          
//       };

//     const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setInput(e.target.value);
//     };

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             sendMessage();
//         }
//     };

//     return (
//         <div className="flex flex-col h-screen bg-gray-100">
//           <header className="bg-blue-600 text-white p-4">
//             <h1 className="text-2xl font-semibold">Gemini Chat</h1>
//           </header>
    
//           <div className="flex-grow overflow-y-auto p-4 space-y-3" ref={chatContainerRef}>
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`rounded-lg p-4 shadow-md ${
//                   message.role === 'user' ? 'bg-blue-100 self-end' : 'bg-white self-start'
//                 }`}
//               >
//                 <div className="font-bold mb-1">{message.role === 'user' ? 'You' : 'Assistant'}</div>
//                 <div className="prose max-w-none">
//                   <ReactMarkdown>{message.content}</ReactMarkdown>
//                 </div>
//               </div>
//             ))}
//           </div>
    
//           <div className="p-4 bg-gray-200">
//             <TextareaAutosize
//               className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
//               placeholder="Type your message..."
//               value={input}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyDown}
//               minRows={1}
//               style={{ fontSize: '16px' }}
//             />
//             <button
//               onClick={sendMessage}
//               className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       );
//     }
    
//     export default App;