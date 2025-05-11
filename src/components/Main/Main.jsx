import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { ChatContext } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(ChatContext);

  function inputChangeHandler(e){
    setInput(e.target.value)
  }

  function handlerCard(e){
    const text = e.target.children[0].textContent;
    setInput(text);
    onSent(text)
  }

  return (
    <div className="main">
      <nav className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </nav>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card" onClick={handlerCard}>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={handlerCard}>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={handlerCard}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={handlerCard}>
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <form onSubmit={(e) => {
            e.preventDefault();
            if(input.trim()) onSent()
          }} className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              onChange={inputChangeHandler}
              value={input}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input.trim() ? (
                <img src={assets.send_icon} alt="" onClick={() => onSent()} />
              ) : null}
            </div>
          </form>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check, its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
