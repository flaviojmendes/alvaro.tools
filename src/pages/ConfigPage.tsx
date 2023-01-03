import { Input, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useLocalStorage } from "react-use";
import Cookies from "universal-cookie";

export default function ConfigPage() {
  const cookies = new Cookies();

  const [customSentences, setCustomSentences, removeCustomSentences] =
    useLocalStorage("customSentences", [] as string[]);
  const [customSentenceText, setCustomSentenceText] = useState<string>("");

  useEffect(() => {}, []);

  function handleSaveCustomSentence() {
    if (customSentenceText) {
      let currentCustomSentences = customSentences;
      currentCustomSentences!.push(customSentenceText);
      setCustomSentences(currentCustomSentences);
      setCustomSentenceText("");
    }
  }

  function handleDeleteCustomSentence(index: number) {
    const currentCustomSentences = customSentences;
    currentCustomSentences?.splice(index, 1);
    setCustomSentences(currentCustomSentences);
  }

  function handleCustomSentenceChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setCustomSentenceText(event.target.value);
  }

  return (
    <>
      <div className="w-full bg-emerald-800 text-white py-2">
        <h1 className="text-3xl text-center">Configurações</h1>
      </div>
      <div className="w-full mt-10 px-2 md:px-10">
        <h2 className="text-xl">Frases Personalizadas</h2>
        <hr className="border-green-600 w-1/4 mt-2" />

        <div className="flex flex-col gap-2 mt-2">
          {customSentences?.map((sentence, index) => {
            return (
              <div className={`text-lg p-2 flex gap-2`}>
                <button className="border-2 p-2 w-fit rounded-md bg-red-400 border-red-500 hover:bg-red-500 cursor-pointer">
                  <FaTrash
                    onClick={() => {
                      handleDeleteCustomSentence(index);
                    }}
                  />
                </button>
                <div className="grow m-auto">{sentence}</div>
              </div>
            );
          })}
          <div className="mt-2 flex">
            <Textarea
            size={"md"}
              className="m-auto w-1/3"
              placeholder={"Adicione uma nova frase personalizada aqui..."}
              onChange={handleCustomSentenceChange}
              value={customSentenceText}
            ></Textarea>
            <button className="border-2 p-2 ml-2 rounded-md bg-green-400 border-green-500 hover:bg-green-500 cursor-pointer" onClick={handleSaveCustomSentence}>Adicionar</button>
            <div className="grow"></div>
          </div>
        </div>
      </div>
    </>
  );
}
