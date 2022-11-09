import answerCheck from '../../../assets/answerCheck.svg';
import './answerInput.style.css';

const AnswerInput = ({ value, onChange, onClick, isAnswerCorrect, svg, name }) => {
  return (
    <>
      <img className='answer-icon' src={svg} alt='' />
      <input type='text' value={value} onChange={onChange} name={name} />
      <div onClick={onClick} className='answer-check'>
        <img 
          style={{ visibility: isAnswerCorrect? 'visible' : "hidden"}} 
          src={answerCheck} 
          alt='' />
      </div>
    </>
  )
}

export default AnswerInput;