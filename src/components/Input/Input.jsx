import { PlaceholdersAndVanishInput } from "../../components/Ui/Input/InputUi";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Hey this juu-ai",
    "You can ask anything ",
    "മലയാളത്തിൽ തിരക്കു.",
    "ഒന്നും പേടിക്കണ്ടാ ",
    "എല്ലാം ശെരിയാവും",
    ,
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: value },
    ]);
    setValue("");

    const response = await getGeminiResponse(value);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: response },
    ]);
  };
  return (
    <div className="   flex     flex-col justify-center    mt-5  items-center ">
      <PlaceholdersAndVanishInput placeholders={placeholders} />
    </div>
  );
}
