import { Window, Button } from 'react95';
import original from 'react95/dist/themes/original';
import { ThemeProvider } from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';

const initialResponse = "Well well well, look who came for some trading advice!";

const responses = [
    "SELL SELL SELL! ...wait, no, BUY BUY BUY! Actually, let me check my notes...",
    "Listen, I've been wrong about every major market move since 1987, so whatever you're thinking, do the opposite!",
    "BOOYAH! That's exactly what I told my hedge fund buddies right before they lost everything!",
    "Bear Stearns is fine! ...oh wait, wrong decade. But trust me, I'm absolutely certain about being uncertain!",
    "My lightning round analysis says: inverse whatever I just said and multiply by two!",
    "*smashes sound effect button* When I'm this confident, it's usually a contrarian indicator!",
    "Let me check what my inverse ETF is doing... ah yes, making money whenever I talk!",
    "Remember folks: my track record is so bad, they made an ETF betting against me. And it's WORKING!",
    "This reminds me of the time I recommended buying Netflix at $686... obviously do the opposite of that!",
    "As I always say: the more confident I sound, the faster you should run in the other direction!"
];

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatbotName] = useState("Jim Cramer");
  const [chatbotAvatar] = useState("jim.png");
  const [isTyping, setIsTyping] = useState(false);
  const [availableResponses, setAvailableResponses] = useState([...responses]);
  
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      typeMessage(initialResponse, true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const getRandomResponse = () => {
    if (availableResponses.length === 0) {
      setAvailableResponses([...responses]);
    }
    const randomIndex = Math.floor(Math.random() * availableResponses.length);
    const response = availableResponses[randomIndex];
    setAvailableResponses(prev => prev.filter((_, index) => index !== randomIndex));
    return response;
  };

  const typeMessage = async (text, isInitial = false) => {
    if (isInitial) {
      setMessages([{ text: "", sender: "bot", isTyping: true }]);
    } else {
      setMessages(prev => [...prev, { text: "", sender: "bot", isTyping: true }]);
    }
    
    setIsTyping(true);
    
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20));
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.sender === 'bot' && lastMessage.isTyping) {
          lastMessage.text = text.slice(0, i);
        }
        return newMessages;
      });
    }

    setMessages(prev => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      if (lastMessage.sender === 'bot' && lastMessage.isTyping) {
        lastMessage.isTyping = false;
      }
      return newMessages;
    });
    
    setIsTyping(false);
  };

  const sendMessage = async (message) => {
    if (!message.trim() || isTyping) return;
    
    setMessages(prev => [...prev, { text: message, sender: "user" }]);
    setInput('');
    
    const randomResponse = getRandomResponse();
    await typeMessage(randomResponse);
  };

  return (
    <ThemeProvider theme={original}>
        <div>
        <Button
            style={{
                position: "fixed",
                bottom: "1rem",
                right: "1rem",
                backgroundColor: "#C0C0C0",
                padding: "1.5rem",
                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                zIndex: 20,
            }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <span className='text-xl md:text-3xl font-semibold'>Ask Jim</span>
        </Button>

        {isOpen && (
            <Window>
                <div className="fixed bottom-16 right-4 w-80 bg-white border-2 shadow-lg p-4 z-20 mb-2">
                <div className="flex items-center gap-3 mb-4">
                    <img src={chatbotAvatar} alt="Ask Jim" className="w-10 h-10 rounded-full" />
                    <div className="font-bold">{chatbotName}</div>
                </div>
                <div
                    ref={chatContainerRef}
                    style={{ height: "16rem", overflowY: "auto" }}
                >
                    {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2`}
                    >
                        <div className="font-semibold">
                        {msg.sender === "bot" ? "Jim" : "You"}:
                        </div>
                        <div>
                        {msg.text}
                        {msg.isTyping && <span className="animate-pulse">|</span>}
                        </div>
                    </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                    <input
                    type="text"
                    className="flex-1 p-1 border outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                    placeholder="Type your message..."
                    disabled={isTyping}
                    />
                    <Button
                    style={{
                        padding: "0.5rem",
                        opacity: isTyping ? "0.5" : "1",
                        cursor: isTyping ? "not-allowed" : "pointer",
                    }}
                    onClick={() => sendMessage(input)}
                    disabled={isTyping}
                    >
                    Send
                    </Button>
                </div>
                </div>
            </Window>
        )}
        </div>
    </ThemeProvider>
  );
};

export default ChatbotButton;