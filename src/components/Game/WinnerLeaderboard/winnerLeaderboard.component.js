import "./winnerLeaderboard.style.css";
import crown from "../../../assets/crown.png";

const WinnerLeaderboard = () => {
  return (
    <section className="leaderboard">
      <div className="card-leaderboard">
        <div className="winner-leaderboard">
          <img src={crown} alt="crown" />
          <label className="text-winner">The Winner is davidg</label>
          <label className="text-score">Score : 10 points</label>
          <ol>
            <li>
              <span>2nd</span> 
              <span>davidbisa</span>
              <span>10 points</span>
            </li>
            <li>
              <span>3rd</span> 
              <span>greatdavid</span>
              <span>10 points</span>
            </li>
            <li>
              <span>4th</span> 
              <span>whydavid</span>
              <span>10 points</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}

export default WinnerLeaderboard;