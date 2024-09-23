"use client";
import React from "react";
import Cat from "../../assets/cat/cat.png";
import {
  TextRevealCard,
  TextRevealCardDescription,
  // TextRevealCardTitle,
} from "../Ui/Text/Text";
import {PlaceholdersAndVanishInputDemo} from "../Input/Input"
export function TextRevealCardPreview() {
  return (
    <>
      <div className="   flex
       items-center flex-col justify-center rounded-2xl   w-full">
        <TextRevealCard
          text="How can we help you?"
          revealText="How are you guys?"
        >
          {/* <TextRevealCardTitle>Welcome!</TextRevealCardTitle> */}
        </TextRevealCard>
        <div className="w-28">
        <img src={Cat} alt="" />

        </div>
     <div>

      <PlaceholdersAndVanishInputDemo/>
     </div>
      </div>
    </>
  );
}