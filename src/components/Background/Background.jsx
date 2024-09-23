import React from "react";
import { BackgroundLines } from "../../components/Ui/Background/Backgorund";
import { TextRevealCardPreview } from "../Text/Text";
export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex justify-center   bg-black">
      <div className=" flex justify-center">
      <TextRevealCardPreview />

      </div>


      <div className= " flex justify-center">
      </div>

     
    </BackgroundLines>
  );
}
