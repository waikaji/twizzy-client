import React from 'react';
import "./answer.style.css";
import answerCheck from "../../../assets/answerCheck.svg";

function Answer({icon, body, showText, isAnswerClicked, onClick}) {
  return (
    <div onClick={onClick}  className="answer-field">
      <img className="answer-icon" src={icon} alt="" />
      {showText ? (
        <h2>{body}</h2>
      ) : (
        <div className="answer-check">
          <img 
            style={{ visibility: isAnswerClicked ? "visible" : "hidden"}}
            src={answerCheck}
            alt=""
          />
        </div>
      )}
    </div>
  )
}

export default Answer;