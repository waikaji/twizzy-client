import {Link} from "react-router-dom";
import './myquiz.style.css';
import { deleteQuiz } from "../../../actions/quiz";
import { createGame } from "../../../actions/game";
import { useNavigate } from "react-router-dom";
import { createLeaderboard } from "../../../actions/leaderboard";
import backgroundquiz from '../../../assets/upload-image.svg';
import { useDispatch, useSelector } from "react-redux";



const MyQuiz = ({quiz}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector((state) => state.socket.socket);
  // const openQuizPage = (e) => {
  //   navigate(`/myquizes/${quiz._id}`);
  // }

  const addGame = async () => {
    let gameData = {
      quizId: quiz._id,
      isLive: true,
      pin: String(Math.floor(Math.random() * 9000) + 1000),
    }

    const newGame = await dispatch(createGame(gameData, navigate));
    let leaderboardData = { gameId: newGame._id, playerResultList: [] }

    const newLeaderboard = await dispatch(createLeaderboard(leaderboardData));
    socket.emit("init-game", newGame, newLeaderboard);
  }

  return (
    <div className='card__myquiz'>
      <div className='card__right' >
        <img src={quiz.backgroundImage ? quiz.backgroundImage : backgroundquiz} alt='quiz' className='img-quiz' />
      </div>
      <div className='card__left'>
        <h2>{quiz.title}</h2>
        <label>{quiz.description}</label>
        <div className='card__btn'>
          <Link className='btn-play' onClick={addGame}>Play</Link>
          <Link style={{marginLeft: "10px"}} className='btn-create' to={`/myquizes/${quiz._id}`}>Edit</Link>
          <Link style={{marginLeft: "10px"}} className='btn-delete' onClick={() => dispatch(deleteQuiz(quiz._id))}>
            Delete
          </Link>
        </div>
      </div>
    </div>
     
  )
}

export default MyQuiz;