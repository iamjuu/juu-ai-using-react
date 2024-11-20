import React, { useContext } from "react";
import { BackgroundLines } from "../Ui/Background/BackGroundUi";
import Cat from "../../assets/cat/cat.png";
import { TextRevealCard } from "../../components/Ui/Text/TextUi";
import { PlaceholdersAndVanishInputDemo } from "../Input/Input";
import { ResponseContext } from "../../components/context/Contextdata";

export function BackgroundLinesDemo() {
  const { contextMessages } = useContext(ResponseContext);

  return (
    <BackgroundLines className="w-full flex flex-col items-center justify-center text-white">
      {/* Full-width container */}
      <div className="w-full bg-black">
        {/* Centered inner container with max-width 1300px */}
        <div className="w-full max-w-[1300px] mx-auto   px-4 sm:px-8 flex flex-col items-center">
          {/* Image Section */}
          <img
            className="w-24 sm:w-32 md:w-40 hover:scale-110 transition-transform duration-300"
            src={Cat}
            alt="A cat"
          />

          {/* Content Section */}
          <div className="w-full  p-6 sm:p-10 rounded-lg mt-6">
            <TextRevealCard
              text="Ask any thing"
              revealText="Hey guys, this is juu Ai"
              className="w-full max-w-md mx-auto"
            />

            {/* Input and Button Section */}
            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 p-4 rounded-lg shadow-lg mt-6">
              <PlaceholdersAndVanishInputDemo />
              <button className="w-full sm:w-24 p-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-200">
                Clear
              </button>
            </div>
          </div>

          {/* Context Messages Section */}
          <div className="w-full  mt-8">
            <div className="w-full max-w-3xl mx-auto">
              {contextMessages.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-600 p-3 rounded-md mb-2 bg-gray-800"
                >
                  <span className="text-lg text-red-600 font-semibold mr-2">
                    {item.role}:
                  </span>
                  <span className="text-gray-300">{item.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
}
