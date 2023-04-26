import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "./navbar.js";

import * as functions from "./functions/functions.js";

export default function LobbyPregame() {
    // get the lobby id from the local storage
    const lobby_id = localStorage.getItem("lobby_id");

    // get the user id from the local storage
    const user_id = localStorage.getItem("user_id");

    // get the username from the local storage
    const username = localStorage.getItem("username");
    const [players, setPlayers] = useState([]);
    const [allReady, setAllReady] = useState(false);

    // on load get the lobby data
    // store the players in the state
    useEffect(() => {
        let req = {
            lobby_id: lobby_id,
        };
        console.log(req);
        functions.post_call("/lobby", req, (res) => {
            console.log(res.data.lobby.players);
            setPlayers(res.data.lobby.players);
        });
    }, []);
    // create a list of players with their ready status

    const PlayerList = () => {
        return (
            <div id="player-list-container">
                <h2>Players</h2>
                <ul>
                    {players.map((player) => {
                        return (
                            <div>
                                <span>{player.username}</span>
                                <span>{`${player.ready}`}</span>
                            </div>
                        );
                    })}
                </ul>
            </div>
        );
    };

    // let players set ready status
    function readyClick() {
        let req = {
            lobby_id: lobby_id,
            user_id: user_id,
            username: username,
        };
        functions.post_call("/lobby/ready", req, (res) => {
            console.log(res);
        });
    }
    // poll the server for ready status every 1 second
    function get_status() {
        let req = {
            lobby_id: lobby_id,
        };
        console.log(req);
        functions.post_call("/lobby", req, (res) => {
            console.log(res.data.lobby.players);
            setPlayers(res.data.lobby.players);
        });
    }
    functions.polling(10000, get_status, allReady, () => {
        console.log("all ready");
        setAllReady(true);
    });
    // if all players are ready, start countdown to game start

    // let players leave the lobby

    // once the game starts, redirect to the game page

    return (
        <div
            id="lobby-pregame-container"
            className="container"
        >
            <Navbar />
            <div id="lobby-pregame-content">
                <h1>Lobby Pregame</h1>
                <PlayerList />
            </div>
            <button onClick={readyClick}> ready </button>
        </div>
    );
}
