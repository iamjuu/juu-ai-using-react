import React from 'react';
import { BackgroundLines } from '../Ui/Background/BackGroundUi';
// import {TextRevealCardPreview} from "../../components/Text/TextUi"
import  Cat from "../../assets/cat/cat.png"
import {TextRevealCard,

} from "../../components/Ui/Text/TextUi"
export function BackgroundLinesDemo() {
  return (
      <BackgroundLines className=" bg-black h-screen  justify-center items-center  md:h-screen text-white flex flex-col">
<img className="w-40 hover:scale-110 transition-transform duration-300" src={Cat} alt="A cat" />
<TextRevealCard
        text="How can i Help you"
        revealText="hi Guy's "
      >
  </TextRevealCard>

</BackgroundLines>

  );
}
