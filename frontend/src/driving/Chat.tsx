import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import drivingService from "../services/drivingService";
import userService from "../services/userService";

const ChatWindow = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  overflow-y: auto;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border-radius: 16px;
`;

const Message = styled.div`
  background-color: #f0f0f0;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  flex: 1;
  margin-right: 8px;
`;

const SendButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Chat = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    getChat();
  }, []);

  const getChat = async () => {
    try {
      const response = await drivingService.getChat(Number(id));
      setMessages(response.split("~"));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendMessage = async () => {
    if (messageInput.trim() !== "") {
      const role = userService.getUserRole();
      const sender = role === "User" ? "User" : "Driver";
      await drivingService.addChat(Number(id), `${sender}:${messageInput.trim()}~`);
      const newMessage = `${sender}: ${messageInput}`;
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div style={{ position: "relative" }}>
      <BackButton onClick={redirectToDashboard}>Back</BackButton>
      <ChatWindow>
        {messages.map((message, index) => (
          <Message key={index}>{message}</Message>
        ))}
        <InputContainer>
          <Input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Enter message..."
          />
          <SendButton onClick={sendMessage}>Send</SendButton>
        </InputContainer>
      </ChatWindow>
    </div>
  );
};

export default Chat;
