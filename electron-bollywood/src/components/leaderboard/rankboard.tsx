import React, { Component, useRef, useState, useEffect } from 'react';
import './leaderboard.scss';

import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setIsAuthenticated } from "../../app/appSlice";

function Leaderboard(){
    const user = useSelector((state: any) => state.app.authUser as any) as any;
    const dispatch = useDispatch();
    const history = useHistory();
    const [authVerified, setVerification] = useState(false) 
    useEffect(() => {
    });

    const fetchAuthUser = async () => {
        const response = await axios
        .get("http://localhost:5000/api/v1/auth/user", { withCredentials: true })
        .catch((err) => {
            console.log("Not properly authenticated");
            dispatch(setIsAuthenticated(false));
            dispatch(setAuthUser(null));
            window.location.href = "http://localhost:3006/#/login/error"
        });

        if (response && response.data) {
        console.log("User: ", response.data);
        dispatch(setIsAuthenticated(true));
        dispatch(setAuthUser(response.data));
        setVerification(true);
        window.location.href = "http://localhost:3006/#/"
        }
    };

    const redirectToGoogleSSO = async () => {
        let timer: NodeJS.Timeout | null = null;
        const googleLoginURL = "http://localhost:5000/api/v1/login/google";

        const newWindow = window.open(
        googleLoginURL,
        "_blank",
        "width=500,height=600"
        );
 
        if (newWindow) {
        timer = setInterval(() => {
            if (newWindow.closed) {
            console.log("Yay we're authenticated");
            fetchAuthUser();
            if (timer) clearInterval(timer);
            }
        }, 500);
        }
    };

    return (
        <div className="leaderboard-comp">
            <div className="leaderboard">
                {/* <div className="sectionWrapper LeaderboardsSearch-module--searchBarWrapper--2PNUw">
                    <form className="SearchBar-module--searchBarWrapper--39gy0 " data-value="">
                        <label className="copy-05 SearchBar-module--searchLabel--2vUXU" for="search">Search Leaderboards</label>
                        <div className="SearchBar-module--inputWrapper--3fSOl">
                            <input type="text" className="copy-05 SearchBar-module--searchInput--1iy_d" name="search" id="search" placeholder="Playername#Tagline" value="" />
                            <button type="submit" className="SearchBar-module--searchButton--1z_ux">
                                <div className="icon SearchBar-module--searchIcon--2mN3G Icon-module--icon--2tHD8 Icon-module--currentColor--LyOgN">
                                    
                                </div>
                            </button>
                        </div>
                    </form>
                </div> */}
                <div className="sectionWrapper leaderboard-top">
                    <div className="rankLogoWrapper sub-wrapper">
                        <span></span>
                    </div>
                    <div className="rankDropdownWrapper sub-wrapper">
                        <div className="rankTitle">
                            <h2 className="heading-small">Leaderboard</h2>
                            <h3 className="heading-large">Radiant</h3>
                        </div>
                        <div className="rankSelect">
                            <ul className="drop-list">
                                <li><span>Radiant</span></li>
                                <li><span>Immortal 3</span></li>
                                <li><span>Immortal 2</span></li>
                            </ul>
                            <div className="drop-icon">
                                <svg width="15" height="9" fill="none"><path d="M7.582 8.9H.504l3.54-3.957L7.581.997l3.54 3.946L14.66 8.9H7.582z" fill="gray"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div className="rankScoreWrapper sub-wrapper">
                        <div className="rankTitle">
                            <h2 className="heading-small">EPISODE 3</h2>
                            <h3 className="heading-large">ACT 3</h3>
                        </div>
                    </div>
                </div>
                <div className="sectionWrapper leaderboard-mid">
                    <div className="rankLabel">Rank</div>
                    <div className="rankLabel"><span>Rating</span></div>
                    <div className="rankLabel">Ongoing</div>
                </div>
                <div className="sectionWrapper leaderboard-bottom">
                    <ul className="playerListWrapper">
                        <li>
                            <div className="player-rank">
                                <h3>1</h3>
                            </div>
                            <div className="player-name">
                                <div className="sustained-score">
                                    <p>1031</p>
                                </div>
                                <h2>SR Masic</h2>
                            </div>
                            <p className="player-score"><span>83</span></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Leaderboard;
