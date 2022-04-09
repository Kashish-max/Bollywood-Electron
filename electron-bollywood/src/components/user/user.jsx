import React, { useState, useEffect } from 'react';
import './user.scss';
import { HashRouter, Route, Switch, Link} from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setIsAuthenticated } from "../../app/appSlice";

function User(){
    const currentUser = useSelector((state) => state.app.authUser);
    const players = useSelector((state) => state.app.allUsers);

    const dispatch = useDispatch();

    const [AuthUserRank, setAuthUserRank] = useState(1)

    useEffect(() => {
        fetchAuthUserRank();
        pageElementsVisible();
    },[]);

    const fetchAuthUserRank = async () => {
        let AuthUser = await currentUser; 
        if (AuthUser) {
            for (let i = 0; i < players.Players.length; i++){
                if (players.Players[i].email == AuthUser.email) {
                    setAuthUserRank(i+1);
                    break;
                }
            }
        }
    };

    const pageElementsVisible = () => {
        setTimeout(() => { document.querySelector(".user")?.classList.add("visible") }, 1000);
    }

    return (
        <div className="user-comp">
            <div className="user">
                <div className="user-bg"></div>
                <svg class="irmAh1agrEFda0YTPudo" viewBox="0 0 159 38">
                    <defs>
                        <linearGradient id="side-button-linear-gradient" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90)">
                            <stop offset="0%" stop-color="#ece8e1"></stop>
                            {/* <stop offset="0%" stop-color="#30c0d8"></stop> */}
                            <stop offset="40%" stop-color="#021A20"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="none" stroke="url(#side-button-linear-gradient)" stroke-width="0.8" d="M0.5,0 V37.5 H142 L156.5,22 V0"></path>
                </svg>
                <div className="user-container">
                    <div className="u__name">
                        <span></span>
                        <p>Your Profile</p>
                        <span className="second"></span>
                    </div>
                    <div className="u__info">
                        {   currentUser ?                     
                            <>
                                <div className="imgg"><img src={currentUser && currentUser.picture} /></div>
                                <div className="label">
                                    <div className="subinfo subinfo1">
                                        <h3>{currentUser && currentUser.fullName}</h3>
                                        <h4>{currentUser && currentUser.email}</h4>
                                    </div>
                                    <div className="subinfo subinfo2">
                                        {currentUser && <p><span>Rank</span>{AuthUserRank} </p>}
                                        {currentUser && <p><span>Score</span>{currentUser.Score}</p>}
                                    </div>
                                </div>
                            </>
                            :
                            <div className="not-logged">
                                <p>Login to see your progress...</p>
                            </div>
                        }
                    </div>
                    {/* <div className="u__info">
                        <div className="imgg"><img src='https://lh3.googleusercontent.com/a/AATXAJx7V1YoXyMeb23fRIWaETFhT7KAEPhenR_Ru0Ec=s96-c' /></div>
                        <div className="label">
                            <div className="subinfo subinfo1">
                                <h3>Kashish goyal</h3>
                                <h4>kashish24102001@gmail.com</h4>
                            </div>
                            <div className="subinfo subinfo2">
                                <p><span>Rank</span>8</p>
                                <p><span>Score</span>83</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
 
export default User;
