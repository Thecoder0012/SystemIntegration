import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css"; 

const BASE_URL = "http://localhost:8080"; 
const socket = io(BASE_URL);

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [incomingMessages, setIncomingMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("message_receiver", (data) => {
      setIncomingMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message_receiver");
    };
  }, []);

  const sendMessage = () => {
    if (username && message) {
      const messageData = {
        username: username,
        message: message,
      };
      socket.emit("mymessage", messageData);
      setMessage("");
    }
  };

  return (
    <div>
      <div className="title">
        <h1>Chat</h1>
      </div>
      <div className="container">
        <div className="chat">
          <h2 className="chat-title">Contact a friend</h2>
          <div className="chat-message">
            {incomingMessages.map((msg, index) => (
              <div key={index} className="message">
                <span className="username">{msg.username}:</span>
                <span className="message-text">{msg.message}</span>
              </div>
            ))}
          </div>
          <div className="inputs">
            <input
              id="username"
              name="username"
              placeholder="Type in username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="message"
              name="message"
              placeholder="Type in your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
