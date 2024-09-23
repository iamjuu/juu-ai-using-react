"use client";

import { PlaceholdersAndVanishInput } from "../Ui/Input/Input";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "What's the first rule ? ",
    "Follow the ",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    (<div className="   ">
      <h2
        className="sm:mb-10 text-xl sm:text-5xl dark:text-white text-gray-400">
        Question everything
      </h2>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
    </div>)
  );
}
