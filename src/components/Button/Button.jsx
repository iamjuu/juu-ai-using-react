import React from "react";
import { IconMicrophone } from "@tabler/icons-react";
import { toast, Toaster } from "sonner";
import { ButtonsCard } from "../Ui/Button/Button";

export function TailwindcssButtons() {
  const searchText = () => {
    console.log("Function is working");
  };

  return (
    <div className="">
      <Toaster position="top-center" />
      <div className="w-full max-w-7xl mx-auto gap-10">
        <ButtonsCard />
      </div>
        <span className="inline-flex items-center p-2">
          <IconMicrophone
            onClick={searchText} 
            className="h-10 w-10 text-white cursor-pointer"
          />
        </span>
    </div>
  );
}
