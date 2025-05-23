import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const ChatContext = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, newxtWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + newxtWord + " ");
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      setRecentPrompt(prompt);
    response = await runChat(prompt);

    setPrevPrompts((prev) => {
      if (!prev.includes(prompt)) {
        return [prompt, ...prev];
      }
      return prev;
    });
    } else {
      setPrevPrompts((prev) => [input, ...prev]);
      setRecentPrompt(input);
      response = await runChat(input);
    }
    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("<br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord);
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    newChat,
  };

  return (
    <ChatContext.Provider value={contextValue}>{props.children}</ChatContext.Provider>
  );
};

export default ContextProvider;
