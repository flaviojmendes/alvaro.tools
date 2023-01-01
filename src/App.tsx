import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Textarea } from "@chakra-ui/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { FaBackspace, FaSpeakap } from "react-icons/fa";
import { GiNothingToSay } from "react-icons/gi";
import Button from "./components/Button";

function App() {
  const [text, setText] = useState("");
  const startButtonRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setFullscreen] = useState(false);
  const handle = useFullScreenHandle();

  const numbers = ["0", "1", "2", "3", "4", "6", "7", "8", "9"];

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
            <div className="flex h-[70%] flex-wrap bg-gray-300">
              {keysAlphabetical.map((key) => {
                return (
                  <Button
                    handleButtonPress={handleButtonPress}
                    char={key}
                    width={"1/5"}
                  />
                );
              })}
              {numbers.map((key) => {
                return (
                  <Button
                    handleButtonPress={handleButtonPress}
                    char={key}
                    width={"1/5"}
                  />
                );
              })}
            </div>

            <div className="flex h-[15%] bg-gray-300">
              <div
                onClick={() => handleButtonPress("limpar")}
                className="w-1/4 cursor-pointer flex border-2 font-semibold text-2xl border-gray-700 hover:bg-red-200 active:bg-red-500"
              >
                <span className="m-auto select-none">{"limpar"}</span>
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
          </div>
        </FullScreen>
      )}
    </>
  );
}

export default App;
