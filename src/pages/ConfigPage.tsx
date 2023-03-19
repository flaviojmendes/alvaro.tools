import { ChangeEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useLocalStorage } from "react-use";
import Cookies from "universal-cookie";
import { MdArrowBack } from "react-icons/md";

export default function ConfigPage() {
  const cookies = new Cookies();

  const [customSentences, setCustomSentences, removeCustomSentences] =
    useLocalStorage("customSentences", [] as string[]);
  const [customSentenceText, setCustomSentenceText] = useState<string>("");

  const [suggestionEnabled, setSuggestionEnabled, removeSuggestionEnabled] =
    useLocalStorage("suggestionEnabled", false);

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

  const handleClick = () => {
    setSuggestionEnabled(!suggestionEnabled);
  };

  return (
    <>
      <div className="w-full flex text-text-primary py-2 border-b-light border-b-2 px-10">
        <h1 className="text-3xl text-center select-none">Configurações</h1>
        <div className="grow"> </div>
        <a
          href="/"
          className="h-full my-auto mx-2 border-b-2 border-b-background hover:border-b-accent-secondary"
        >
          Página Inicial
        </a>
      </div>
      <div
        className="w-full mt-10 px-2 md:px-10 gap-2 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex gap-2">
          <h2 className="text-xl my-auto">Sugestões no Teclado</h2>
          <div
            className={`relative my-auto flex w-28 h-6 rounded-full transition-all duration-300 ${
              suggestionEnabled
                ? "bg-accent-secondary justify-end"
                : "bg-accent-light justify-start"
            }`}
          >
            {suggestionEnabled ? (
              <>
                <span className="ml-2">Ligado</span>
                <div className="grow"></div>
              </>
            ) : (
              <></>
            )}
            <div
              className={`mx-1 inset-0 w-4 h-4 mt-1 ml-1 rounded-full transition-all ${
                suggestionEnabled ? "bg-white" : "bg-gray-800"
              }`}
            />
            {!suggestionEnabled ? (
              <>
                <div className="grow"></div>
                <span className="mr-1">Desligado</span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <p className="text-accent">
          Ao ativar esse recurso, aparecerão sugestões de palavras no teclado
          virtual.
        </p>
      </div>
      <div className="w-full mt-10 px-2 md:px-10">
        <h2 className="text-xl">Frases Personalizadas</h2>
        <p className="text-accent">
          Adicione frases personalizadas para serem usadas no teclado virtual.
        </p>

        <div className="flex flex-col gap-2 mt-2">
          {customSentences?.map((sentence, index) => {
            return (
              <div className={`text-lg p-2 flex gap-2`}>
                <button className=" p-2 w-fit rounded-md bg-accent-light hover:bg-accent cursor-pointer">
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
            <textarea
              className="m-auto w-1/3 border-2 rounded-sm border-accent-secondary"
              placeholder={"Adicione uma nova frase personalizada aqui..."}
              onChange={handleCustomSentenceChange}
              value={customSentenceText}
            ></textarea>
            <button
              className=" p-2 ml-2 rounded-md bg-accent-secondary cursor-pointer hover:bg-accent-secondary-dark"
              onClick={handleSaveCustomSentence}
            >
              Adicionar
            </button>
            <div className="grow"></div>
          </div>
        </div>
      </div>
    </>
  );
}
