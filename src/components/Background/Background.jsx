import React, { useContext, useEffect, useRef, useState } from "react";
import { BackgroundLines } from "../Ui/Background/BackGroundUi";
import Cat from "../../assets/cat/cat.png";
import { PlaceholdersAndVanishInputDemo } from "../Input/Input";
import { ResponseContext } from "../../components/context/Contextdata";

export function BackgroundLinesDemo() {
  const { contextMessages, setContextMessages } = useContext(ResponseContext);
  const messagesEndRef = useRef(null);
  
  // Scroll to the bottom when contextMessages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [contextMessages]);

  // Handle sending a message
  const handleSendMessage = (messageContent) => {
    const userMessage = {
      role: "User",
      content: messageContent,
    };

    // Check if the message contains a role request (e.g., "Act as a React developer")
    const detectedRole = detectRole(messageContent);

    if (detectedRole) {
      const aiResponse = getAIResponseForRole(detectedRole);
      setContextMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        { role: detectedRole, content: aiResponse },
      ]);
    } else {
      setContextMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        { role: "AI", content: "How can I assist you today?" },
      ]);
    }
  };

  // Detect role based on the prompt content
  const detectRole = (messageContent) => {
    if (messageContent.toLowerCase().includes("act as a react developer")) {
      return "React Developer";
    }
    if (messageContent.toLowerCase().includes("act as a python developer")) {
      return "Python Developer";
    }
    // Add more roles here as needed
    return null;
  };

  // Get the AI response based on the detected role
  const getAIResponseForRole = (role) => {
    switch (role) {
      case "React Developer":
        return "Sure! I'm a React developer. How can I assist you with React development?";
      case "Python Developer":
        return "Absolutely! As a Python developer, I'm here to help with Python code.";
      // Add more role-specific responses here as needed
      default:
        return "How can I assist you today?";
    }
  };

  return (
    <BackgroundLines className="w-full flex flex-col items-center justify-center text-white">
      {/* Full-width container */}
      <div className="w-full bg-black">
        {/* Centered inner container with max-width 1300px */}
        <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-8 flex flex-col items-center">
          {/* Image Section */}
          <img
            className="w-24 sm:w-32 md:w-40 hover:scale-110 transition-transform duration-300"
            src={Cat}
            alt="A cat"
          />

          {/* Content Section */}
          <div className="w-full p-6 sm:p-10 flex justify-center flex-col items-center rounded-lg mt-6">
            <h1 className="text-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              Hey this is Juu AI
            </h1>

            {/* Input and Button Section */}
            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 p-4 rounded-lg shadow-lg mt-6">
              <PlaceholdersAndVanishInputDemo
                onSendMessage={handleSendMessage} // Passing send message function
              />
              <button
                className="w-full sm:w-24 p-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-200"
                onClick={() => setContextMessages([])} // Clear chat
              >
                Clear
              </button>
            </div>
          </div>

          {/* Context Messages Section */}
          <div className="w-full mt-8">
            <div className="w-full max-w-3xl mx-auto">
              {contextMessages.map((item, index) => (
                <div key={index} className="p-3 rounded-md mb-2 bg-gray-900">
                  <span className="text-lg bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent font-bold mr-2">
                    {item.role}:
                  </span>
                  <span className="text-gray-300 leading-7 tracking-2">{item.content}</span>
                </div>
              ))}
              {/* Empty div to scroll to */}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
}
