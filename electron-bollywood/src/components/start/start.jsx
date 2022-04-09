import React, { useState, useEffect } from 'react';
import './start.scss';
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom';

import { LoginSuccess } from "../../app/containers/LoginSuccess/index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setIsAuthenticated } from "../../app/appSlice";
import Leaderboard from '../leaderboard/leaderboard';
import User from '../user/user';
import { useCookies, Cookies } from "react-cookie";
import Carousel from 'react-elastic-carousel';


const LeaderboardComp = () => { return (<Leaderboard />) }
const UserComp = () => { return (<User />) }

function Start(){
    const user = useSelector((state) => state.app.authUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['User']);
    const [authVerified, setVerification] = useState(false) 
    useEffect(() => {
        // loginStatusFunction();
        pageElementsVisible();
    },[]);

    const loginStatusFunction = async () => {
        if (document.cookie == "User=authenticated") {
            redirectToGoogleSSO();
        }
    }

    const fetchAuthUser = async () => {
        const response = await axios
        .get("http://localhost:5000/api/v1/auth/user", { withCredentials: true })
        .catch((err) => {
            console.log("Not properly authenticated");
            dispatch(setIsAuthenticated(false));
            dispatch(setAuthUser(null));
            // history.push("#/login/error");
            // window.location.href = "http://localhost:3006/#/login/error"
        });

        if (response && response.data) {
            console.log("User: ", response.data);
            dispatch(setIsAuthenticated(true));
            dispatch(setAuthUser(response.data));
            // setCookie('User', "authenticated", { path: '/' });

            // history.push("#/welcome");
            setVerification(true);
            // window.location.href = "http://localhost:3006/#/welcome";
            window.location.href = "http://localhost:3006/#/"
        }
    };

    const redirectToGoogleSSO = async () => {
        let timer = null;
        let googleLoginURL = "http://localhost:5000/api/v1/login/google";
        // if (document.cookie == "User=authenticated") googleLoginURL = "http://localhost:5000/api/v1/login/google";

        // window.location.href = googleLoginURL;
        // console.log("Yay we're authenticated");
        // fetchAuthUser();

        const newWindow = window.open(
        googleLoginURL,
        "_blank",
        "width=500,height=600"
        );
        // setTimeout(() => { newWindow?.close() }, 2000)
        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {
                console.log("Yay we're authenticated");
                fetchAuthUser();
                if (timer) clearInterval(timer);
                }
            }, 500);
        }
        // return authVerified;
    };

    const descriptionItems = [
        { text: `Guess the movie by choosing the letters that you think may be included in it.` },
        { text: `For each mistake that you make, a letter of Bollywood will be sliced.` },
        { text: `Guess the movie before all the letters of Bollywood are sliced off.` },
    ]

    const pageElementsVisible = () => {
        setTimeout(() => { document.querySelector(".subtitle")?.classList.add("visible") }, 600);
        setTimeout(() => { document.querySelector(".s__title")?.classList.add("visible") }, 600);
        setTimeout(() => { document.querySelector(".s__carousel")?.classList.add("visible") }, 600);
        setTimeout(() => { document.querySelector(".s__bottom")?.classList.add("visible") }, 600);
        setTimeout(() => { document.querySelector(".s__tag")?.classList.add("visible") }, 200);
        setTimeout(() => { document.querySelector(".s__content")?.classList.add("visible") }, 200);
    }

    return (
        <section>
            <div className="start-page">
                <span id="page-tag" hidden>start</span>
                <div className="s__content">
                    <div className="s__tag">
                        <h1><span>B</span>OllYWOOD</h1>
                    </div>
                    <div className="s__top">
                        <div className="s__title">
                            <h1>Movies Town</h1>
                        </div>
                        <div className="s__subcontent">
                            <div className="subtitle">
                                {/* <p>Your turn</p><span>to enjoy nostalgia</span> */}
                                {/* <p>Classic Word Game</p><span>to play digitally</span> */}                                 
                                <p>Old School Favorite</p><span>A Word Game</span>
                            </div>
                        </div>
                        <div className="s__carousel">
                            <Carousel
                                verticalMode
                                enableAutoPlay autoPlaySpeed={5000}
                                showArrows={false}
                            >
                                {descriptionItems.map((item, index) => {
                                    return (
                                        <div className="description">
                                            {item.text}
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </div>
                    </div>
                    <div className="s__bottom">
                        <div className="s__start">
                            <button onClick={() => !user ? redirectToGoogleSSO() : history.push('/mode')}><span>{!user ? "Login to play" : "Play Free"}</span></button>
                        </div>
                        {user &&
                            <div className="s__start">
                                <button onClick={() => { if (user) window.location.href = "http://localhost:5000/api/v1/logout" }}><span>Logout</span></button>
                            </div>
                        }
                    </div>
                </div>

                <div className="g__board">
                    <Route exact path="/" component={ LeaderboardComp } />
                </div>

                <div className="g__user">
                    <Route exact path="/" component={ UserComp } />
                </div>
            </div>
        </section>  
    );
}
 
export default Start;
