import React, { useContext } from "react"; // Import useContext  
import { BackgroundLines } from "../Ui/Background/BackGroundUi";  
import Cat from "../../assets/cat/cat.png";  
import { TextRevealCard } from "../../components/Ui/Text/TextUi";  
import { PlaceholdersAndVanishInputDemo } from "../Input/Input";  
import { ResponseContext } from '../../components/context/Contextdata'; // Adjust the path as needed  

export function BackgroundLinesDemo() {  
  const { contextMessages } = useContext(ResponseContext); // Get messages from context  

  return (  
    <BackgroundLines className="    bg-black   justify-center items-center md:h-screen text-white flex flex-col">  
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

      <div className="w-full h-full  flex justify-center items-center">  
        <div className="w-[1300px] max-w-full flex">  
          {/* <div className="w-[30%] p-3  text-justify">  
            <h1 className="text-3xl">History</h1>  
            <p>  
              Lorem ipsum dolor sit amet consectetur adipisicing elit.  
              Repudiandae, deleniti pariatur dolore voluptates aperiam commodi  
              cumque itaque excepturi officiis delectus tempore culpa nulla  
              voluptate incidunt illum omnis nesciunt esse ipsum.  
            </p>  
          </div>   */}

          <div className="w-[70%]  text-green-300 p-3 ">  
            {contextMessages.map((item, index) => (  
              <div key={index}>  
                <p >{item.role }: {item.content}</p>  {/* Displays role and content */}  
              </div>  
            ))}  
          </div>  
        </div>  
      </div>  
    </BackgroundLines>  
  );  
}