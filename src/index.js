import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ChatAssistant from "./ChatAssistant";

// Function to mount the chat assistant widget
const mountChatWidget = () => {
  // Check if the widget is already mounted to avoid duplicates
  if (!document.getElementById("chat-root")) {
    // Create a new div element to serve as the React root
    const chatRootElement = document.createElement("div");
    chatRootElement.id = "chat-root"; // Giving it an ID for future references
    document.body.appendChild(chatRootElement); // Append it to the body

    // Create the React root using the newly created div
    const root = createRoot(chatRootElement);

    // Render the ChatAssistant component
    root.render(
      <StrictMode>
        <ChatAssistant />
      </StrictMode>
    );
  } else {
    console.warn("Chat widget is already mounted.");
  }
};

// Expose the function globally
window.mountChatWidget = mountChatWidget;

// Optionally, render the ChatAssistant directly in the main app (if desired)
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ChatAssistant />
  </StrictMode>
);
