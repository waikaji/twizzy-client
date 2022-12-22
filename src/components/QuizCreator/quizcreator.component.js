import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz, getQuiz } from "../../actions/quiz";
import { useParams, useNavigate } from "react-router-dom";
import QuestionListItem from "./QuestionListItem/questionListItem.component";
import AnswerInput from "./AnswerInput/answerInput.component";
import FileBase from "react-file-base64";
import triangle from "../../assets/triangle.svg"
import diamond from "../../assets/diamond.svg"
import circle from "../../assets/circle.svg"
import square from "../../assets/square.svg"
import questionType from "../../assets/questionType.svg"
import timer from "../../assets/timer.svg"
import gamePoints from "../../assets/gamePoints.svg"
import answerOptions from "../../assets/answerOptions.svg"
import './quizcreator.style.css';

const QuizCreator = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [quizData, setQuizData] = useState({
    title: "",
    creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
    backgroundImage: "",
    description: "",
    pointsPerQuestion: 1,
    numberOfQuestion: 0,
    isPublic: true,
    questionList : [],
  });

  const [questionData, setQuestionData] = useState({
    questionType: "Quiz",
    pointType: "Standard",
    answerTime: 5,
    backgroundImage: "",
    question: "",
    answerList: [
      { name: "a", body: "", isCorrect: false},
      { name: "b", body: "", isCorrect: false},
      { name: "c", body: "", isCorrect: false},
      { name: "d", body: "", isCorrect: false},
    ],
    questionIndex: 1,
  });

  useEffect(() => {
    dispatch(getQuiz(id));
  }, [id, dispatch])
    
  const { quiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (quiz) {
      setQuizData(quiz);
      setQuizImage(quiz.backgroundImage)
    }
  }, [quiz])

  const [isQuizOptions, setIsQuizOptions] = useState(false);
  const [isQuizPublic, setIsQuizPublic] = useState(true);
  const [isQuestionDataSave, setIsQuestionDataSave] = useState(false);
  const [questionImage, setQuestionImage] = useState("");
  const [quizImage, setQuizImage] = useState("");

  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [maxCorrectAnswerCount, setMaxCorrectAnswerCount] = useState(1);

  const showQuizOptions = () => {
    setIsQuizOptions(
      (prevIsQuizOptions) => !prevIsQuizOptions
    )
  }

  const setCorrectAnswer = (index) => {
    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [
        ...prevState.answerList.slice(0, index),
        {
          name: prevState.answerList[index].name,
          body: prevState.answerList[index].body,
          isCorrect: !prevState.answerList[index].isCorrect,
        },
        ...prevState.answerList.slice(index + 1, prevState.answerList.length),
      ],
    }))

    questionData.answerList[index].isCorrect
      ? setCorrectAnswerCount((prevState) => prevState - 1)
      : setCorrectAnswerCount((prevState) => prevState + 1)
  }

  const handleQuizSubmit = (e) => {
    dispatch(updateQuiz(quiz._id, quizData));
    navigate(`/myquizes`);
  }

  const handleQuizChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  }

  const updateAnswer = (name, body, index) => {
    setQuestionData((prevState) => ({
      ...prevState,
      answerList: [
        ...prevState.answerList.slice(0, index),
        {
          name: name,
          body: body,
          isCorrect: prevState.answerList[index].isCorrect,
        },
        ...prevState.answerList.slice(index + 1, prevState.answerList.length),
      ],
    }))
  }

  const validateAnswerFields = () => {
    return questionData.answerList.every((answer) => answer.body !== "");
  }

  const validateCorrectAnswer = () => {
    return questionData.answerList.some((answer) => answer.isCorrect === true);
  }

  const handleQuestionSubmit = () => {
    if (questionData.question === "") {
      alert("Please enter your question");
    } else if (!validateAnswerFields()) {
      alert("Enter your reply text");
    } else if (!validateCorrectAnswer()) {
      alert("Choose the correct answer");
    } else {
      setIsQuestionDataSave(true);

      if (
        quizData.questionList.filter(
          (question) => question.questionIndex === questionData.questionIndex
        )
      ) {
        setQuizData((prevState) => ({
          ...prevState,
          questionList: [
            ...prevState.questionList.slice(0, questionData.questionIndex - 1),
            questionData,
            ...prevState.questionList.slice(
              questionData.questionIndex,
              prevState.questionList.length
            ),
          ],
        }))
      } else {
        setQuizData({
          ...quizData,
          questionList: [...quizData.questionList, questionData],
        })
      }
    }
  }

  const handleQuestionRemove = () => {
    let index = questionData.questionIndex;
    setQuizData((prevState) => ({
      ...prevState,
      questionList: [
        ...prevState.questionList.slice(0, index - 1),
        ...prevState.questionList.slice(index, prevState.question.length),
      ],
    }))
    quizData.questionList.forEach((question) => {
      if (question.questionIndex > index) {
        question.questionIndex -= 1
      }
    })

    if (quizData.questionList.length > 1 && index > 1) {
      showQuestion(index - 1);
    } else if (quizData.questionList.length > 1 && index === 1) {
      showQuestion(1);
    } else {
      clear();
    }
    setCorrectAnswerCount(0);
  }

  const clear = () => {
    setQuestionData({
      questionType: "Quiz",
      pointType: "Standard",
      answerTime: 5,
      backgroundImage: "",
      question: "",
      answerList: [
        { name: "a", body: "", isCorrect: false },
        { name: "b", body: "", isCorrect: false },
        { name: "c", body: "", isCorrect: false },
        { name: "d", body: "", isCorrect: false },
      ],
      questionIndex: quizData.questionList.length + 1,
    })
    setQuestionImage("");
  }

  const addNewQuestion = () => {
    setIsQuestionDataSave(false);
    clear();
    setIsQuestionTrueFalse(false);
    setCorrectAnswerCount(0);
  }

  const handleQuestionChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  }

  const showQuestion = (index) => {
    let question = quizData.questionList.find(
      (question) => question.questionIndex === index
    )
    setQuestionData(question);
    setQuestionImage(question.backgroundImage);
    question.questionType === "True/False"
      ? setIsQuestionTrueFalse(true)
      : setIsQuestionTrueFalse(false)
  }

  const changeMaxCorrectAnswerCount = (e) => {
    setMaxCorrectAnswerCount(e.target.value);
    questionData.answerList.forEach((answer) => (answer.isCorrect = false));
    setCorrectAnswerCount(0);
  }

  const [isQuestionTrueFalse, setIsQuestionTrueFalse] = useState(false);
  const changeQuestionType = () => {
    setIsQuestionTrueFalse((prevState) => !prevState);
    if (!isQuestionTrueFalse) {
      questionData.answerList.splice(2, 2);
    } else {
      questionData.answerList.push({ name: "c", body: "", isCorrect: false });
      questionData.answerList.push({ name: "d", body: "", isCorrect: false });
    }
    questionData.answerList[0].body = "True";
    questionData.answerList[1].body = "False";
    setMaxCorrectAnswerCount(1);
    questionData.answerList.forEach((answer) => (answer.isCorrect = false))
    setCorrectAnswerCount(0);
  }

  if (user === null) {
    return <h1>Log in to your account to create a quiz</h1>
  } 

  return (
    <section className='quiz-creator'>
      <div className='question-list'>
        <div className='quiz-info'>
          <button 
            className='quiz-info-button'
            onClick={showQuizOptions}
          >Settings</button>
        </div>
        <div className="question-list-container">
          {quizData.questionList.length > 0 &&
            quizData.questionList.map((question) => (
              <QuestionListItem
                onClick={() => showQuestion(question.questionIndex)}
                key={question.questionIndex}
                number={question.questionIndex}
                type={question.questionType}
                name={question.question}
                time={question.answerTime}
                image={question.backgroundImage}
              />
            ))
          }
          <button
            onClick={() => {
              isQuestionDataSave
                ? addNewQuestion()
                : alert(
                  "Save changes in question data first"
                )
            }}
            className='add-question-button'
          >
            Add Question
          </button>
        </div>
      </div>
      <div className='question-creator'>
        <input 
          type='text' 
          name='question'
          value={questionData.question} 
          onChange={handleQuestionChange}
          placeholder='Write your question here' 
          className='question-name' 
        />

        <div className='image-container'>
          <h3>
            Find and upload image
          </h3>
          <div>
            <FileBase 
              type='file' 
              multiple={false} 
              onDone={({ base64 }) => {
                setQuestionData({ ...questionData, backgroundImage: base64 });
                setQuestionImage(base64);
              }}
            />
          </div>
          {questionImage && <img src={questionImage} alt="" />}
        </div>
        
        <div className="answers-container">
          <div className="answer-field">
            <AnswerInput 
              svg={triangle} 
              value={questionData.answerList[0].body}
              name={"a"}
              onChange={(e) => {
                isQuestionTrueFalse
                  ? updateAnswer(e.target.name, "Yes", 0)
                  : updateAnswer(e.target.name, e.target.value, 0)
              }}
              onClick={() => {
                correctAnswerCount < maxCorrectAnswerCount ||
                questionData.answerList[0].isCorrect
                  ? setCorrectAnswer(0)
                  : alert("You already choose the correct answer")
              }}
              isAnswerCorrect={questionData.answerList[0].isCorrect}
            />
          </div>
          <div className="answer-field">
            <AnswerInput 
              value={questionData.answerList[1].body}
              name={"b"}
              onChange={(e) => {
                isQuestionTrueFalse
                  ? updateAnswer(e.target.name, "No", 1)
                  : updateAnswer(e.target.name, e.target.value, 1)
              }}
              onClick={() => {
                correctAnswerCount < maxCorrectAnswerCount ||
                questionData.answerList[1].isCorrect
                  ? setCorrectAnswer(1)
                  : alert("You already choose the correct answer")
              }}
              isAnswerCorrect={questionData.answerList[1].isCorrect}
              svg={diamond}
            />
          </div>
          {!isQuestionTrueFalse && (
            <>
              <div className="answer-field">
                <AnswerInput 
                  value={questionData.answerList[2].body}
                  name={"c"}
                  onChange={(e) =>
                    updateAnswer(e.target.name, e.target.value, 2)
                  }
                  onClick={() => {
                    correctAnswerCount < maxCorrectAnswerCount ||
                    questionData.answerList[2].isCorrect
                      ? setCorrectAnswer(2)
                      : alert("You already choose the correct answer")
                  }}
                  isAnswerCorrect={questionData.answerList[2].isCorrect}
                  svg={circle}
                />
              </div>
              <div className="answer-field">
                <AnswerInput
                  value={questionData.answerList[3].body}
                  name={"d"}
                  onChange={(e) =>
                    updateAnswer(e.target.name, e.target.value, 3)
                  }
                  onClick={() => {
                    correctAnswerCount < maxCorrectAnswerCount ||
                    questionData.answerList[3].isCorrect
                      ? setCorrectAnswer(3)
                      : alert("You already choose the correct answer")
                  }}
                  isAnswerCorrect={questionData.answerList[3].isCorrect}
                  svg={square}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className='options'>
        <div
          style={{display: isQuizOptions?"block":"none"}}
          className='questions-options'
        >
          <h1>Quiz</h1>
          <div className='option-label'>
            <label>Title</label>
          </div>
          <input 
            value={quizData.title}
            type='text' 
            name='title'
            onChange={handleQuizChange} 
            />
          <div className='option-label'>
            <label>Description</label>
          </div>
          <input
            value={quizData.description}
            type='text' 
            name='description' 
            onChange={handleQuizChange}
          />
          <div className='option-label'>
            <label>Points per question</label>
          </div>
          <input 
            type='number' 
            min={1} 
            value={quizData.pointsPerQuestion}
            name='pointsPerQuestion' 
            onChange={handleQuizChange}
          />
          <div className='option-label'>
            <label>Access</label>
          </div>
          <div>
            <button
              onClick={() => {
                setIsQuizPublic(true);
                setQuizData({ ...quizData, isPublic: true })
              }}
              className='option-button'
              style={{
                backgroundColor: isQuizPublic?"rgb(19, 104, 206)" : "inherit",
                color: isQuizPublic ? "white" : "rgb(110, 110, 110)",
              }}
            >
              Public
            </button>
            <button
              onClick={() => {
                setIsQuizPublic(false);
                setQuizData({ ...quizData, isPublic: false })
              }}
              className='option-button'
              style={{
                backgroundColor: isQuizPublic ? "inherit" : "rgb(19, 104, 206)",
                color: isQuizPublic ? "rgb(110, 110, 110)" : "white",
              }}
            >
              Private
            </button>
          </div>
          <div className='option-label'>
            <label>Background Image</label>
          </div>
          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setQuizData({ ...quizData, backgroundImage: base64 });
                setQuizImage(base64);
              }}
            />
          </div>
          {quizImage && (
            <img className='quiz-image' src={quizImage} alt='' />
          )}
          <div>
            <button
              className='option-button'
              onClick={handleQuizSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div
          style={{display: isQuizOptions?"none":"block"}}
          className='question-options'
        >
          <div className='option'>
            <div className='option-label'>
              <img src={questionType} alt='' />
              <label>
                Question Type
              </label>
            </div>
            <select 
              onChange={(e) => {
                handleQuestionChange(e);
                changeQuestionType();
              }}
              name='questionType'
              value={questionData.questionType}
            >
              <option defaultValue disabled>
                Select option type
              </option>
              <option value='Quiz'>
                Quiz
              </option>
              <option value='True/False'>
                True/False
              </option>
            </select>
          </div>
          <div className='option'>
            <div className='option-label'>
              <img src={timer} alt='' />
              <label>Time limit</label>
            </div>
          </div>
          <select 
            name='answerTime'
            onChange={handleQuestionChange}
            value={questionData.answerTime}
          >
            <option defaultValue disabled>
              Set time limit
            </option>
            <option value={5}>5 seconds</option>
            <option value={10}>10 seconds</option>
            <option value={20}>20 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>60 seconds</option>
            <option value={90}>90 seconds</option>
          </select>

          <div className='option'>
            <div className='option-label'>
              <img src={gamePoints} alt='' />
              <label>Points</label>
            </div>
            <select 
              onChange={handleQuestionChange}
              name='pointType'
              value={questionData.pointType}
            >
              <option defaultValue disabled>
                Set points type
              </option>
              <option value='Standard'>Standard</option>
              <option value='Double'>Double</option>
              <option value='BasedOnTime'>Based on Time</option>
            </select>
          </div>
          <div className='option'>
            <div className='option-label'>
              <img src={answerOptions} alt='' />
              <label>Answer options</label>
            </div>
            <select onChange={changeMaxCorrectAnswerCount}>
              <option defaultValue disabled value='1'>
                Set answer options
              </option>
              <option value='1'>
                Single choice
              </option>
              <option value='4'>
                Multiple choice
              </option>
            </select>
          </div>
          <div>
            <button 
              onClick={handleQuestionSubmit}
              className='option-button'
            >
              Save changes
            </button>
            <button 
              onClick={handleQuestionRemove}
              className='option-button'
            >
              Delete
            </button>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default QuizCreator;