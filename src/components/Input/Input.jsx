// import MiC from "../Mic/Mic"
import { PlaceholdersAndVanishInput } from "../Ui/Input/Input";
import{TailwindcssButtons} from '../Button/Button'

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "ask everything  ",
    " I will response my better",
    "First rule?",
    " how can i assist you",
  ];

  // const handleChange = (e) => {
  //   console.log(e.target.value,'data typed');
  // };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    (<div className="   ">
      <h2
        className="sm:mb-10  text-xl sm:text-5xl    dark:text-white text-gray-400">
        You can ask anything
      </h2>
      <div className="flex gap-5">

      <PlaceholdersAndVanishInput placeholders={placeholders} onSubmit={onSubmit} />
      {/* <MiC/> */}
      <TailwindcssButtons/>
      </div>
    </div>)
  );
}
