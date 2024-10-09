import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Modal,
  Paper,
  styled,
} from "@mui/material";
import { FaComment, FaTimes, FaPaperPlane } from "react-icons/fa";

// Styled floating chat button
const ChatButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  bottom: 20,
  right: 20,
  borderRadius: "50%",
  width: 60,
  height: 60,
  minWidth: 60,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "scale(1.1)",
  },
  transition: "all 0.3s ease-in-out",
}));

// Styled modal for the chat window
const ChatModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// Styled paper for chat window layout
const ChatWindow = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  height: "80vh",
  maxHeight: 400,
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "100%",
    maxHeight: "none",
    borderRadius: 0,
  },
}));

// Styled chat header for the top part of the chat window
const ChatHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

// Styled box for the chat messages
const ChatMessages = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
}));

// Styled message bubbles for user and assistant messages
const MessageBubble = styled(Box)(({ theme, isUser }) => ({
  maxWidth: "70%",
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  alignSelf: isUser ? "flex-end" : "flex-start",
  backgroundColor: isUser
    ? theme.palette.primary.light
    : theme.palette.grey[200],
  color: isUser
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
}));

// Styled chat input box at the bottom
const ChatInput = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Open chat modal
  const handleOpen = () => setIsOpen(true);

  // Close chat modal
  const handleClose = () => setIsOpen(false);

  // Send message when "Send" button is clicked
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");
      // Simulate assistant response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Thank you for your message. How else can I help you?",
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  // Send message when Enter is pressed
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  // Scroll to the last message when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <ChatButton
        onClick={handleOpen}
        aria-label="Open chat assistant"
        role="button"
      >
        <FaComment />
      </ChatButton>
      <ChatModal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="chat-modal-title"
      >
        <ChatWindow>
          <ChatHeader>
            <Typography variant="h6" id="chat-modal-title">
              Chat Assistant
            </Typography>
            <IconButton
              onClick={handleClose}
              aria-label="Close chat"
              size="small"
              sx={{ color: "inherit" }}
            >
              <FaTimes />
            </IconButton>
          </ChatHeader>
          <ChatMessages>
            {messages.map((message, index) => (
              <MessageBubble key={index} isUser={message.isUser}>
                <Typography variant="body2">{message.text}</Typography>
              </MessageBubble>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
          <ChatInput>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{ mr: 1 }}
            />
            <IconButton
              onClick={handleSend}
              color="primary"
              aria-label="Send message"
            >
              <FaPaperPlane />
            </IconButton>
          </ChatInput>
        </ChatWindow>
      </ChatModal>
    </>
  );
};

export default ChatAssistant;
