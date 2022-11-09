import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { createSocket } from "./actions/socket";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home.page';
import MyQuiz from './pages/myquiz.page';
import Create from './pages/create.page';
import AuthPage from './pages/auth.page';
import JoinGamePage from './pages/joingame.page';
import HostScreenPage from './pages/hostscreen.page';
import PlayerScreen from './components/Game/PlayerScreen/PlayerScreen';
import LeaderboardPage from './pages/leaderboard.page';

function App() {
  // const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("http://localhost:3001");
    dispatch(createSocket(socket));

    return () => socket.disconnect();
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<HomePage/>}/>
        <Route path='/myquizes' exact element={<MyQuiz />} />
        <Route path='/myquizes/:id' exact element={<Create />} />
        <Route path='/auth' exact element={<AuthPage />} />
        <Route path='/games/joingame' exact element={<JoinGamePage />} />
        <Route path='/games/host/:id' exact element={<HostScreenPage />} />
        <Route path='/games/player/:id' exact element={<PlayerScreen />} />
        <Route path='/leaderboard' exact element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
