import React, { useState, useEffect } from "react";
import "./waitingRoom.style.css";

function WaitingRoom({ pin, socket }) {
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    socket?.on("player-added", (player) => {
      setPlayerList([...playerList, player])
    })
  }, [playerList, socket])

  return (
    <div className="waiting-room">
      <h1 className="waiting-title">
        Waiting room
      </h1>
      <h2 className="waiting-header">
        Show PIN to your students : {pin}
      </h2>
      <div className="players-list">
        <div className="leaderboard">
          <h1 className="leaderboard-title">
            Player List
          </h1>
          {playerList.length > 0 ? (
            <div className="list-user">
              <ol>
                {playerList.map((player) => (
                  <li key={player.userName}>
                    <span>{player.userName}</span>
                  </li>
                ))}
              </ol>
            </div>
          ): (
            <h1 className="leaderboard-title">
              No players yet
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default WaitingRoom;