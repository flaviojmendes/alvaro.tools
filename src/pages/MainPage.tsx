import { Textarea } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { useFullScreenHandle, FullScreen } from "react-full-screen";
import { FaBackspace, FaList, FaTrash, FaWindowClose } from "react-icons/fa";
import { GiNothingToSay } from "react-icons/gi";
import { useLocalStorage } from "react-use";
import Button from "../components/Button";
import { words } from "../assets/words";

import { compress, decompress } from "lz-string";

export default function MainPage() {
  const [text, setText] = useState("");
  const startButtonRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setFullscreen] = useState(false);
  const [showCustomSentenceList, setShowCustomSentenceList] = useState(false);
  const handle = useFullScreenHandle();

  const [suggestionEnabled, setSuggestionEnabled, removeSuggestionEnabled] =
    useLocalStorage("suggestionEnabled", false);

  const [guessedWords, setGuessedWords] = useState([] as string[]);

  const [customSentences, setCustomSentences, removeCustomSentences] =
    useLocalStorage("customSentences", [] as string[]);

  const [wordsList, setWordsList, removeWordsList] = useLocalStorage(
    "words",
    {} as {[id: string] : number}
  );

  
  const [wordsListLegacy, setWordsListLegacy, removeWordsListLegacy] = useLocalStorage(
    "wordsList",
    {} as {[id: string] : number}
  );

  useEffect(() => {
    removeWordsListLegacy();
    if(!wordsList || Object.keys(wordsList).length === 0) {
      setWordsList(words);
    }
  }, []);

  const keysAlphabetical = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "6",
    "7",
    "8",
    "9",
  ];

  function handleButtonPress(key: string) {
    if (key === "espaço") {
      setText(text + " ");
      return;
    }
    if (key === "apagar") {
      setText(text.substring(0, text.length - 1));
      return;
    }
    if (key === "limpar") {
      setText("");
      return;
    }

    setText(text + key);

    const word = (text + key).split(" ").pop();
    if (word) suggestWord(word);
  }

  function handleGuessedWord(word: string) {

    const lastWord = text.split(" ").pop();
    const lastIndex = text.lastIndexOf(lastWord || "");
    let newWordsList = wordsList || {};
    newWordsList[word] = newWordsList[word] + 1;

    const sortedArray = Object.entries(newWordsList).sort((a, b) => b[1] - a[1]);

    const sortedJsonObj = sortedArray.reduce((acc: any, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    setWordsList(sortedJsonObj)
    setText(text.slice(0, lastIndex) + word + " ");
  }

  function suggestWord(text: string) {
  
    const filteredWords = Object.keys(wordsList || []).filter((word: string) => word.startsWith(text));

    setGuessedWords(filteredWords.slice(0, 3).map((word: any) => word));
  }

  function handlePlayTTS() {
    var msg = new SpeechSynthesisUtterance();
    msg.lang = "pt-BR";
    msg.text = text;
    msg.rate = 1;
    window.speechSynthesis.speak(msg);
  }

  return (
    <>
      <div
        className={`w-screen h-screen flex cursor-pointer`}
        onClick={() => {
          handle.enter();
          setFullscreen(true);
        }}
        ref={startButtonRef}
      >
        <h1 className="text-center m-auto text-3xl">
          Toque em qualquer lugar para começar!
        </h1>
      </div>
      {isFullScreen && (
        <FullScreen handle={handle}>
          <div className="w-full h-screen flex-col">
            <div className="flex h-[15%]">
              <Textarea
                value={text}
                w={"100%"}
                p={"10"}
                className="text-2xl txt-area"
                placeholder="Seu texto vai aparecer aqui.. ✏️"
              />
            </div>

            {/* Guesses */}
            {suggestionEnabled && (
            <div
              className={`h-[10%] flex w-full bg-white ${
                showCustomSentenceList ? "hidden" : "flex"
              }`}
            >
              {guessedWords.map((guessedWord) => {
                return (
                  <Button
                    handleButtonPress={handleGuessedWord}
                    char={guessedWord}
                    width={"w-1/3"}
                  />
                );
              })}
            </div>
            )}
            {/* Characters */}
            <div
              className={`${suggestionEnabled ? 'h-[60%]' : 'h-[70%]'} flex-wrap bg-gray-300 ${
                showCustomSentenceList ? "hidden" : "flex"
              }`}
            >
              {keysAlphabetical.map((key) => {
                return (
                  <Button
                    handleButtonPress={handleButtonPress}
                    char={key}
                    width={"w-1/5"}
                  />
                );
              })}
            </div>

            {/* Controls */}
            <div
              className={`${
                showCustomSentenceList ? "hidden" : "flex"
              } h-[15%] bg-gray-300`}
            >
              <div
                onClick={() => handleButtonPress("limpar")}
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl rounded-sm hover:bg-red-200 active:bg-accent-light"
              >
                <FaTrash size={"40%"} className="m-auto" />
              </div>
              <div
                onClick={() => setShowCustomSentenceList(true)}
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl rounded-sm hover:bg-blue-200 active:bg-blue-500"
              >
                <FaList size={"40%"} className="m-auto" />
              </div>
              <div
                onClick={() => handleButtonPress("espaço")}
                className="w-2/4 cursor-pointer flex border-2 font-semibold text-2xl rounded-sm hover:bg-gray-100 active:bg-gray-400"
              >
                <span className="m-auto select-none">{"espaço"}</span>
              </div>
              <div
                onClick={() => handleButtonPress("apagar")}
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl rounded-sm hover:bg-gray-100 active:bg-gray-400"
              >
                <FaBackspace size={"40%"} className="m-auto" />
              </div>
              <div
                onClick={() => handlePlayTTS()}
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl rounded-sm hover:bg-accent-secondary active:bg-accent-secondary"
              >
                <GiNothingToSay size={"50%"} className="m-auto" />
              </div>
            </div>

            {/* Custom Sentences */}
            <div
              className={`h-[70%] flex-wrap bg-gray-300 ${
                !showCustomSentenceList ? "hidden" : "flex"
              }`}
            >
              {customSentences?.map((key) => {
                return (
                  <div
                    onClick={() => handleButtonPress(key)}
                    className="w-1/3 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-gray-100 active:bg-gray-400"
                  >
                    <span className="m-auto select-none">{key}</span>
                  </div>
                );
              })}
            </div>

            {/* Custom Sentences Controls */}
            <div
              className={`${
                !showCustomSentenceList ? "hidden" : "flex"
              } h-[15%] bg-gray-300`}
            >
              <div
                onClick={() => handleButtonPress("limpar")}
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-red-200 active:bg-accent-light"
              >
                <FaTrash size={"40%"} className="m-auto" />
              </div>
              <div
                onClick={() => setShowCustomSentenceList(false)}
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-blue-200 active:bg-blue-500"
              >
                <FaWindowClose size={"40%"} className="m-auto" />
              </div>
              <div
                onClick={() => handleButtonPress("espaço")}
                className="w-2/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-gray-100 active:bg-gray-400"
              >
                <span className="m-auto select-none">{"espaço"}</span>
              </div>

              <div
                onClick={() => handlePlayTTS()}
                className="w-2/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-accent-secondary active:bg-accent-secondary"
              >
                <GiNothingToSay size={"50%"} className="m-auto" />
              </div>
            </div>
          </div>
        </FullScreen>
      )}
    </>
  );
}
