import React, { useState, useEffect } from 'react';
import './Chatbot.css';

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const welcomeMessage = {
    text: 'Welcome to EduAssess! 👋 I\'m here to help you navigate our intelligent assessment platform. You can use this website to:\n\n• Take AI-generated quizzes on your chosen topics\n• Test your knowledge of prerequisites\n• Get detailed performance reports\n• Track your learning progress\n\nFeel free to ask me any questions about how to use the platform!',
    isUser: false,
  };

  const predefinedResponses: { [key: string]: string } = {
    'how does this app work?': 'Choose the appropriate topics that you have studied in the search box above. We will generate an assessment quiz to test your knowledge of the topic and its prerequisites, then provide you with a detailed report.',
    'where can i enter my concepts?': 'You can enter your concepts in the search box at the center of the screen. As you type, you\'ll see a dropdown menu with relevant topics to choose from.',
    'what is eduassess?': 'EduAssess is an intelligent assessment platform that helps evaluate your understanding of various topics and their prerequisites through AI-generated quizzes.',
    'help': 'I can help you navigate EduAssess! You can ask me about how the app works, where to enter concepts, or what EduAssess is.',
  };

  useEffect(() => {
    // Add welcome message when the chat is opened for the first time
    if (isOpen && messages.length === 0) {
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      text: inputMessage,
      isUser: true,
    };

    let botResponse = 'I\'m not sure how to help with that. Try asking about how the app works or where to enter concepts.';
    
    // Check for predefined responses (case-insensitive)
    const userMessageLower = inputMessage.toLowerCase();
    for (const [key, value] of Object.entries(predefinedResponses)) {
      if (userMessageLower.includes(key)) {
        botResponse = value;
        break;
      }
    }

    const newBotMessage: Message = {
      text: botResponse,
      isUser: false,
    };

    setMessages([...messages, newUserMessage, newBotMessage]);
    setInputMessage('');
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chat-button" onClick={() => setIsOpen(true)}>
          <img src="/chat-bot.svg" alt="Chat" className="chat-icon" />
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>EduAssess Assistant</h3>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>
          
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className="message-wrapper">
                {!message.isUser && (
                  <div className="bot-profile">
                    <img src="/bot-face.svg" alt="Bot" />
                  </div>
                )}
                <div className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
                  {message.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your question here..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 