import React, { Component, useRef, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNavClassActive } from "../../app/appSlice";
import './sidebar.scss';


const Sidebar = () => {
    const navState = useSelector((state) => state.app.navClassActive);
    const dispatch = useDispatch();   

    const [activePage, setActivePage] = useState("start");

    useEffect(() => {
        const navList = document.querySelectorAll("nav ul li");
        setActivePage(document.querySelector("#page-tag").textContent);
        setListInactive(navList);
        if (activePage == "start") {
            navList[0].classList.add("active");
        } else if (activePage == "mode") {
            navList[1].classList.add("active");            
        } else if (activePage == "game") {
            navList[2].classList.add("active");            
        }
    });

    const setListInactive = (list) => {
        list.forEach((el) => {
            el.classList.remove("active");
        })
    }

    return (
        <div className="sidebar">
            <div className={!navState ? "n__burger" : "n__burger rotated"} onClick={() => dispatch(setNavClassActive(!navState))}>
                {/* <div className="n__bars"><i></i><i></i><i></i></div> */}
                <div id="svg" className={ !navState ? "rotated" : null}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 172 172" style={{ " fill": "#000000;" }}>
                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ "mix-blend-mode": "normal" }}>
                            <path d="M0,172v-172h172v172z" fill="none"></path>
                            <g id="original-icon" fill="rgba(230, 134, 55, 1)">
                                <path d="M57.33333,21.5l43,64.5l-43,64.5h28.66667l43,-64.5l-43,-64.5z"></path>
                            </g>
                        </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 172 172" style={{ " fill": "#000000;", "transform": "translateX(-17px)" }}>
                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ "mix-blend-mode": "normal" }}>
                            <path d="M0,172v-172h172v172z" fill="none"></path>
                            <g id="original-icon" fill="rgba(230, 134, 55, 1)">
                                <path d="M57.33333,21.5l43,64.5l-43,64.5h28.66667l43,-64.5l-43,-64.5z"></path>
                            </g>
                        </g>
                    </svg> */}
                </div>
            </div>
            <div className="n__title">
                <h2>BTown</h2>
                <div className="n__icon">
                    <Link to="/" style={{"outline": "none"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 172 172" style={{ "fill": "#000000;" }}>
                            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ "mix-blend-mode": "normal" }}>
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="rgba(230, 134, 55, 1)">
                                    <path d="M32.38438,13.76l-19.12156,34.4l19.12156,34.4h41.89812l18.63781,-34.46719l-18.63781,-34.33281zM97.67719,51.6l-18.03312,34.4l5.93937,11.34125l23.95906,-11.38156l-4.52844,-7.65937l20.54594,2.53969l-6.88,20.64l-4.63594,-7.88781l-22.06438,15.93688l5.6975,10.87094h41.95188l18.03312,-34.54781l-18.03312,-34.25219zM32.37094,89.44l-19.10812,34.4l19.10812,34.4h41.89813l19.10812,-34.4l-6.07375,-10.92469l-38.95531,28.12469v-14.16312l-12.1475,-6.07375l43.90031,-20.855l-5.83187,-10.50813z"></path>
                                </g>
                            </g>
                        </svg>
                    </Link>
                </div>
            </div>
            <nav className={!navState ? "nav" : "nav active"}>
                <ul className="n__list">
                    <Link to="/"><li onClick={() => {dispatch(setNavClassActive(false));}}>Start .</li></Link>
                    <Link to="/mode"><li onClick={() => {dispatch(setNavClassActive(false));}}>Mode .</li></Link>
                    <Link to="/game"><li onClick={() => {dispatch(setNavClassActive(false));}}>Game .</li></Link>
                </ul>
            </nav>
        </div>
     );
}
 
export default Sidebar;