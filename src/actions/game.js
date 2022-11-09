import * as api from "../api";
import {
  CREATE_GAME,
  FETCH_GAME,
  ADD_PLAYER
} from "../constants/actionTypes";

export const createGame = (gameData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createGame(gameData);
    dispatch({ type: CREATE_GAME, payload: data });
    navigate(`/games/host/${data._id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getGame = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchGame(id);
    dispatch({ type: FETCH_GAME, payload: { game: data } });
  } catch(error) {
    console.log(error);
  }
}

export const addPlayer = (gameId, playerId) => async (dispatch) => {
  try {
    const { data } = await api.addPlayer(gameId, playerId);
    dispatch({ type: ADD_PLAYER, payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
}