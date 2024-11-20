import React, { useContext, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { cn } from "../../lib/utils";
import { ResponseContext } from "../../context/Contextdata"; // Adjust path accordingly

export function PlaceholdersAndVanishInput({ placeholders }) {
  const { contextMessages, setContextMessages } = useContext(ResponseContext);
  const API_KEY = "AIzaSyCpyIMPMAzQOKJ-G9ZyTaxbw-7ujzKc7Lg";
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef(null);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const newDataRef = useRef([]);

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation();
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const draw = useCallback(() => {
    // Drawing logic
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start) => {
    // Animation logic
  };
  const getGeminiResponse = async (prompt) => {
    try {
      setIsLoading(true); // Set loading to true
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        {
          contents: [{ parts: [{ text: prompt }] }], 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            key: API_KEY,
          },
        }
      );
  
      // Get the generated text
      const generatedText = response.data.candidates[0].content.parts[0].text;
  
      // Remove asterisks from the response string
      const cleanedText = generatedText.replace(/\*/g, "");
  
      return cleanedText.split("\n").slice(0, 9).join("\n");
    } catch (error) {
      console.error("Error fetching response from Gemini API:", error);
      return "Error fetching response from Gemini API";
    } finally {
      setIsLoading(false); 
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; 

    // Add custom conditions for different inputs
    if (value.toLowerCase().trim() === "juu") {
      const response = "hi juu"; // Custom response for "juu"
      setContextMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: value },
        { role: "juu-ai", content: response },
      ]);
      setValue(""); // Clear input
      return;
    }
    if(value.toLowerCase().trim() ==="who is the father of this ai"){
      const  response = "The father of this AI is Muhammad Ajmal CC, who developed the core concepts, including algorithms and data processing techniques that drive its intelligence. The AI continuously improves its ability to understand and respond to prompts. The user interface (UI) was created using React, providing an intuitive and responsive experience."
      setContextMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: value },
        { role: "juu-ai", content: response },  
        ]);
        setValue("");
        return;
    }

    if (value.toLowerCase().trim() === "hello") {
      const response = "Hello there! How can I help you today?";
      setContextMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: value },
        { role: "juu-ai", content: response },
      ]);
      setValue(""); // Clear input
      return;
    }

    if (value.toLowerCase().trim() === "bye") {
      const response = "Goodbye! Have a great day!";
      setContextMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: value },
        { role: "juu-ai", content: response },
      ]);
      setValue(""); // Clear input
      return;
    }

    // If no custom condition matches, proceed with the Gemini API response
    setContextMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: value },
    ]);

    const response = await getGeminiResponse(value);
    
    setContextMessages((prevMessages) => [
      ...prevMessages,
      { role: "juu-ai", content: response },
    ]);

    setValue(""); // Clear input after response
    console.log(response, "response data");
};

  return (
    <form
      className={cn(
        "relative bg-white max-w-xl mx-auto dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow transition duration-200",
        value && "bg-gray-50"
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left pr-20",
          !animating ? "opacity-0" : "opacity-100"
        )}
      />
      <input
        onChange={(e) => {
          if (!animating) setValue(e.target.value);
        }}
        ref={inputRef}
        value={value}
        type="text"
        placeholder={!isLoading ? placeholders[currentPlaceholder] : ""}
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
          animating && "text-transparent"
        )}
        disabled={isLoading} 
      />
      <button
        disabled={!value || isLoading}
        type="submit"
        className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full bg-black dark:bg-zinc-900 flex items-center justify-center transition duration-200"
      >
        {isLoading ? (
          <motion.div
            className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        ) : (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            whileHover={{ scale: 1.2 }}
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9"></polygon>
          </motion.svg>
        )}
      </button>
    </form>
  );
}
