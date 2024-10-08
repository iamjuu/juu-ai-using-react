import React, { useContext } from "react"; // Import useContext  
import { BackgroundLines } from "../Ui/Background/BackGroundUi";  
import Cat from "../../assets/cat/cat.png";  
import { TextRevealCard } from "../../components/Ui/Text/TextUi";  
import { PlaceholdersAndVanishInputDemo } from "../Input/Input";  
import { ResponseContext } from '../../components/context/Contextdata'; // Adjust the path as needed  

export function BackgroundLinesDemo() {  
  const { contextMessages } = useContext(ResponseContext); // Get messages from context  

  return (  
    <BackgroundLines className="    bg-black  h-full  justify-center items-center  text-white flex flex-col">  
      <img  
        className="w-40 hover:scale-110 transition-transform duration-300"  
        src={Cat}  
        alt="A cat"  
      />  
      <div className="flex flex-col">

      <TextRevealCard   
        text="Hey guys this is juu Ai "  
        revealText="ask anything"  
        className=" mt-"
        />  
      <PlaceholdersAndVanishInputDemo />  
        </div>

      <div className="w-full bg-transparent  relative h-full flex justify-center items-center">  
        <div className="w-[1300px] max-w-full  justify-center items-center flex">  
      

        <div className="w-[70%] text-white mt-5 flex gap-1 flex-col">  
  {contextMessages.map((item, index) => (  
    <div 
      key={index} 
      className="border  border-gray-600 p-2 rounded-md"
    >  
   

      <span className="text-lg text-red-600">{item.role}:</span>  
      <span>{item.content}</span>
    </div>
  ))}  
</div>  

        </div>  
      </div>  
    </BackgroundLines>  
  );  
}