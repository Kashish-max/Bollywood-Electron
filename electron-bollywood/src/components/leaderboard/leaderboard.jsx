import React, { Component, useRef, useState, useEffect } from 'react';
import './leaderboard.scss';

import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, sortAllUsers } from "../../app/appSlice";

function Leaderboard(){
    const players = useSelector((state) => state.app.allUsers);
    const dispatch = useDispatch();
    const history = useHistory();
    let Rank = 1;
    
    useEffect(() => {
        fetchPlayerList();
    },[]);

    const fetchPlayerList = async () => {
        const response = await axios
        .post("http://127.0.0.1:5000/api/rankList", { withCredentials: true })
        .catch((err) => {
            console.log("Error retrieving ranks : ", err);
            dispatch(setAllUsers(null));
        });

        if (response && response.data) {
            console.log("All Users: ", response.data.Players);
            dispatch(setAllUsers(response.data));
            dispatch(sortAllUsers());
        }

        if (response && response.data) {
            setTimeout(() => {
                const listItem = document.querySelectorAll(".leaderboard-bottom .playerListWrapper li");
                console.log(listItem)
                listItem.forEach((item) => {
                    item.classList.add("active");
                })
            }, 600);
        }
    };

    return (
        <div className="leaderboard-comp">
            <div className="leaderboard">
                <div className="sectionWrapper leaderboard-top">
                    <div className="rankDropdownWrapper sub-wrapper">
                        <div className="rankTitle">
                            <h2 className="heading-small">Leaderboard</h2>
                            <h3 className="heading-large">Bollywood</h3>
                        </div>
                        <div className="rankSelect">
                            <div className="drop-icon">
                                <svg width="15" height="9" fill="none"><path d="M7.582 8.9H.504l3.54-3.957L7.581.997l3.54 3.946L14.66 8.9H7.582z" fill="gray"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div className="rankScoreWrapper sub-wrapper">
                        <div className="rankTitle">
                            {/* <h2 className="heading-small">EPISODE 3</h2> */}
                            <h3 className="heading-large">2021</h3>
                        </div>
                    </div>
                </div>
                <div className="sectionWrapper leaderboard-mid">
                    <div className="rankLabel">Rank</div>
                    <div className="rankLabel"><span>Player</span></div>
                    <div className="rankLabel">Score</div>
                </div>
                <div className="sectionWrapper leaderboard-bottom">
                    <ul className="playerListWrapper">
                        {players ? players.Players.map((item, index) => {
                            return (
                                Rank <= 5 &&
                                <li key={index}>
                                    <div className="player-rank">
                                        <h3>{ Rank++ }</h3>
                                    </div>
                                    <div className="player-name">
                                        <h2>{ item.fullName }</h2>
                                    </div>
                                    <p className="player-score"><span>{item.Score}</span></p>
                                </li>
                            )
                        })
                            :
                        <li className="leaderboard-error">
                            Loading failed...       
                        </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Leaderboard;
