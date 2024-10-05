// import React, { useState, useRef } from "react";
// import MicrophoneIcon from "../Ui/Mic/Mic"; // Ensure this import is correct

// const SpeechRecognition = () => {
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null); // Store the recognition instance here

//   const startListening = () => {
//     console.log('starting');
    
//     // Check if the browser supports the API
//     if (!("webkitSpeechRecognition" in window)) {
//       console.error("Speech recognition not supported in this browser.");
//       return;
//     }

//     if (!recognitionRef.current) {
//       // Initialize speech recognition only once
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.continuous = true;
//       recognition.interimResults = true;
//       recognition.lang = "en-US"; // Set the language

//       recognition.onresult = (event) => {
//         let finalTranscript = "";
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           if (event.results[i].isFinal) {
//             finalTranscript += event.results[i][0].transcript;
//           }
//         }
//         setTranscript(finalTranscript);
//       };

//       recognition.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//       };

//       recognition.onend = () => {
//         setIsListening(false);
//         console.log("Speech recognition stopped.");
//       };

//       recognitionRef.current = recognition; // Store the recognition instance
//     }

//     recognitionRef.current.start(); // Start listening
//     setIsListening(true);
//   };

//   const stopListening = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop(); // Stop the recognition
//       setIsListening(false);
//     }
//   };

//   return (
//     <div>
//       {/* Button with mic icon */}
//       <button onClick={isListening ? stopListening : startListening}>
//         <MicrophoneIcon size={50} color={isListening ? "red" : "#4a4a4a"} />
//       </button>
//       {/* <p>Transcript: {transcript}</p> */}
//     </div>
//   );
// };

// export default SpeechRecognition;
