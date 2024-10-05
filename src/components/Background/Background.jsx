import React from 'react';
import { BackgroundLines } from '../Ui/Background/BackGroundUi';

export function BackgroundLinesDemo() {
  return (
      <BackgroundLines className=" bg-red-300 h-screen  md:h-screen text-white flex flex-col">
  <h2 className="text-center text-2xl  sm:text-3xl md:text-4xl lg:text-5xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
    hello, <br /> All.
  </h2>
  <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
    Get the best advice from our experts, including expert artists,
    painters, marathon enthusiasts and RDX, totally free.
  </p>
</BackgroundLines>

  );
}
