// src/Chat.js
import React, { useState } from 'react';
import { fetchReply } from './api/openai';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return; // Avoid sending empty messages
        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');

        const aiMessage = { role: 'ai', content: await fetchReply(input) };
        setMessages(messages => [...messages, aiMessage]);
    };

    return (
        <div className={`chat-container ${isOpen ? 'open' : 'closed'}`}>
            <div className="chat-header" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '×' : <img src="https://www.svgrepo.com/show/490933/chat.svg" alt="Chat Icon" />}
            </div>
            {isOpen && (
                <div className="chat-body">
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.role}`}>
                                {msg.content}
                            </div>
                        ))}
                    </div>
                    <div className="input-area">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
