import React from "react";
import "./questionListItem.style.css";
import defaultQuestionImage from "../../../assets/defaultQuestionImage.svg"

function QuestionListItem({ number, type, name, time, image, onClick }) {
  return (
    <div className='question-list-item' onClick={onClick}>
      <h3 className='question-list-item-title'>
        <span className='question-list-number'>{number}&nbsp;</span>
        {type}
      </h3>
      <div className='myquiz-question-preview'>
        <h4 className='question-preview-title'>
          {name}
        </h4>
        <div className='question-preview-time'>{time}</div>
        <div className='question-preview-background-image'>
          {
            image.length === 0 ? (
              <img src={defaultQuestionImage} alt="" />
            ) : (
              <img src={image} alt=''/>
            )
          }
        </div>
        <div className='question-preview-answers'>
          <div className='answer-image'></div>
          <div className='answer-image'></div>
          <div className='answer-image'></div>
          <div className='answer-image'></div>
        </div>
      </div>
    </div>
  )
}

export default QuestionListItem;