import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserQuizes, createQuiz } from "../../actions/quiz";
import MyQuiz from './MyQuiz/myquiz.component';
import './myquizes.style.css';
import {useEffect, useState}  from 'react';

const MyQuizes = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPublic, setIsPublic] = useState(false);
  const [quizData, setQuizData] = useState({
    title: "",
    creatorID: user?.result._id,
    creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
    backgroundImage: "",
    description: "",
    pointsPerQuestion: 1,
    isPublic: true,
    questionList: [],
  });

  
  useEffect(() => {
    dispatch(getUserQuizes(user.result._id));
  }, [dispatch])
  
  const { quizes } = useSelector((state) => state.quiz);
  const handleQuizSubmit = () => {
    dispatch(createQuiz(quizData, navigate));
  }

  const handleQuizChange = (e) => {
    setQuizData({...quizData, [e.target.name]: e.target.value });
  }

  return (
    <section className='myquizes'>
      <div className='myquizes-container'>
        <div className='card__quiz'>
          <h1>Create Quiz</h1>
          <label>Title</label>
          <input 
            onChange={handleQuizChange}
            value={quizData.title}
            className='form' 
            type='text' 
            name='title' 
            id='title' />

          <label>Description</label><br/>
          <textarea 
            onChange={handleQuizChange}
            value={quizData.description}
            className='form' 
            name='description' 
            rows='3'
          ></textarea>

          <div className='ispublic'>
            <button 
              className='button-ispublic' 
              onClick={() => {
                setIsPublic(true)
                setQuizData({...quizData, isPublic:true})
              }}
              style={{
                cursor: "pointer",
                backgroundColor: isPublic?"rgb(19, 104, 206)" : "inherit",
                color: isPublic ? "white" : "rgb(110, 110, 110)",
              }}
            >Public</button>
            <button 
              className='button-ispublic'
              onClick={() => {
                setIsPublic(false)
                setQuizData({...quizData, isPublic:false})
              }}
              style={{
                cursor: "pointer",
                backgroundColor: isPublic ? "inherit" : "rgb(19, 104, 206)",
                color: isPublic ? "rgb(110, 110, 110)" : "white",
              }}
            >Private</button>
          </div>

          <button 
            onClick={handleQuizSubmit}
            className='button-submit'
          >
          Create
          </button>
        </div>
      </div>
      <div className='myquiz'>
        <div className='myquizes-container'>
          <h1>My Quizes</h1>
          {
            quizes.map((quiz) => (
              <MyQuiz key={quiz._id} quiz={quiz} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default MyQuizes;