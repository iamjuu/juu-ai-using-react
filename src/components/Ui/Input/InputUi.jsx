import React, { useContext } from "react"; // Import useContext

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios"; // Missing import
import { cn } from "../../lib/utils";
import { ResponseContext } from "../../context/Contextdata"; // Adjust path accordingly

export function PlaceholdersAndVanishInput({ placeholders }) {
  const { contextMessages, setContextMessages } = useContext(ResponseContext); // Use context here
  const API_KEY = "AIzaSyCpyIMPMAzQOKJ-G9ZyTaxbw-7ujzKc7Lg";
  // const  API_KEY = REACT_APP_OPENAI_API_KEY
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef(null);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);
  // const [messages, setMessages] = useState([]);
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
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation(); // Restart the interval when the tab becomes visible
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
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData = [];

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start) => {
    const animateFrame = (pos = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || "";
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  };

  const getGeminiResponse = async (prompt) => {
    if (["hi", "hey"].includes(prompt.toLowerCase())) {
      return "ആ പറ  മോനെ ഞാൻ ഐങ്ങനെയാ സഹായിക്കേണ്ട?";
    }
    if ([  "aju","ajmal"].includes(prompt.toLowerCase())) {
      return " ഹാ  Juu പറയടാ";
    }
    if ([  "adhil"].includes(prompt.toLowerCase())) {
      return "ഹാ adhil__adhiii ഇതാണ് അവന്റെ instagram id. അവൻ ഒരു കൊച്ചു മൈരൻ ആണ്. അവനെ കുറിച് കൂടുതൽ ഒന്നും ചോദിക്കരുത്.എനിക്ക് ഇഷ്ട്ടം അല്ല";
    }
    try {
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

      const generatedText = response.data.candidates[0].content.parts[0].text;
      const lines = generatedText.split("\n").slice(0,9);
      return lines.join("\n");
  
    } catch (error) {
      console.error("Error fetching response from Gemini API:", error);
      return "Error fetching response from Gemini API";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setContextMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: value },
    ]);

    const response = await getGeminiResponse(value);
    setContextMessages((prevMessages) => [
      ...prevMessages,
      { role: "juu-ai", content: response },
    ]);
    setValue("");
    console.log(response, "response data");
  };

  return (
    <form
      className={cn(
        "  relative  bg-white max-w-xl mx-auto  dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow transition duration-200",
        value && "bg-gray-50"
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left pr-20",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />
      <input
        onChange={(e) => {
          if (!animating) setValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        type="text"
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
          animating && "text-transparent"
        )}
      />
      <button
        disabled={!value}
        type="submit"
        className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full bg-black dark:bg-zinc-900 flex items-center justify-center transition duration-200"
      >
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
      </button>
      <AnimatePresence>
        {!value && !animating && (
          <motion.span
            key={currentPlaceholder}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={cn(
              "text-gray-400 dark:text-zinc-500 text-sm sm:text-base pointer-events-none absolute inset-0 w-full flex items-center pl-4 sm:pl-10 pr-20"
            )}
          >
            {placeholders[currentPlaceholder]}
          </motion.span>
        )}
      </AnimatePresence>
    </form>
  );
}
