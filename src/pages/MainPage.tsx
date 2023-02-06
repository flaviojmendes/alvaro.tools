import { Textarea } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useFullScreenHandle, FullScreen } from "react-full-screen";
import { FaBackspace, FaList, FaTrash, FaWindowClose } from "react-icons/fa";
import { GiNothingToSay } from "react-icons/gi";
import { useLocalStorage } from "react-use";
import Button from "../components/Button";

export default function MainPage() {
  const [text, setText] = useState("");
  const startButtonRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setFullscreen] = useState(false);
  const [showCustomSentenceList, setShowCustomSentenceList] = useState(false);
  const handle = useFullScreenHandle();
  const [customSentences, setCustomSentences, removeCustomSentences] =
    useLocalStorage("customSentences", [] as string[]);

  const keysNumbers = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "6",
    "7",
    "8",
    "9", 
  ]

  const keysAlphabetical = [
    [ "q", "w", "e", "r", "t", "y", "u", "i", "o", "p" ],
    [ "a", "s", "d", "f", "g", "h", "j", "k", "l" ],
    [ "z", "x", "c", "v", "b", "n", "m" ]
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
  }

  function handlePlayTTS() {
    var msg = new SpeechSynthesisUtterance();
    msg.lang = "pt-BR";
    msg.text = text;
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

            {/* Characters */}
            <div
              className={`h-[70%] flex flex-col bg-gray-300 ${
                showCustomSentenceList ? "hidden" : "flex"
              }`}
            >
              <div className="flex h-[20%]">
                {keysNumbers.map((key) => {
                  return (
                    <Button
                      handleButtonPress={handleButtonPress}
                      char={key}
                    />
                  );
                })}
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-10 h-[33.333%]">
                  {keysAlphabetical[0].map((key) => {
                    return (
                      <Button
                        handleButtonPress={handleButtonPress}
                        char={key}
                      />
                    );
                  })}
                </div>

                <div className="grid grid-cols-9 w-[100%] m-auto h-[33.333%] md:w-[90%]">
                  {keysAlphabetical[1].map((key) => {
                    return (
                      <Button
                        handleButtonPress={handleButtonPress}
                        char={key}
                      />
                    );
                  })}
                </div>

                <div className="grid grid-cols-7 w-[100%] m-auto h-[33.333%] md:w-[80%]">
                  {keysAlphabetical[2].map((key) => {
                    return (
                      <Button
                        handleButtonPress={handleButtonPress}
                        char={key}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div
              className={`${
                showCustomSentenceList ? "hidden" : "flex"
              } h-[15%] bg-gray-300`}
            >
              <div
                onClick={() => handleButtonPress("limpar")}
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-red-200 active:bg-red-500"
              >
                <FaTrash size={"40%"} className="m-auto" />
              </div>
              <div
                onClick={() => setShowCustomSentenceList(true)}
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-blue-200 active:bg-blue-500"
              >
                <FaList size={"40%"} className="m-auto" />
              </div>
              <div
                onClick={() => handleButtonPress("espaço")}
                className="w-2/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-gray-100 active:bg-gray-400"
              >
                <span className="m-auto select-none">{"espaço"}</span>
              </div>
              <div
                onClick={() => handleButtonPress("apagar")}
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-gray-100 active:bg-gray-400"
              >
                <FaBackspace size={"40%"} className="m-auto" />
              </div>
              <div
                onClick={() => handlePlayTTS()}
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-green-200 active:bg-green-500"
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
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-red-200 active:bg-red-500"
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
                className="w-2/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-green-200 active:bg-green-500"
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
