import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import './App.scss';

import { LoginSuccess } from "./app/containers/LoginSuccess/index";
import { useDispatch, useSelector } from "react-redux";
import { setNavClassActive } from "./app/appSlice";

import Sidebar from './components/sidebar/sidebar';
import Start from './components/start/start';
import Mode from './components/mode/mode';
import Game from './components/game/game';


const StartComp = () => { return (<Start />) }
const ModeComp = () => { return (<Mode />) }
const GameComp = () => { return (<Game />) }
const LoginSuccessComp = () => { return (<LoginSuccess />) }

function App() {
  const user = useSelector((state) => state.app.authUser);
  const navState = useSelector((state) => state.app.navClassActive);
  const dispatch = useDispatch();
  
  useEffect(() => {
    pageElementsVisible();
  }, []);
  
  const pageElementsVisible = () => {
      setTimeout(() => { document.querySelector(".App-Game")?.classList.add("visible") }, 600);
  }

  return (
    <HashRouter>
      <div className="App-Bollywood">
        <div className="App-Sidebar">
          <Sidebar />
        </div>
        <div className="App-Game">          
          <div className="App-Comp" onClick={() => dispatch(setNavClassActive(false)) }>
            <Switch>
              <Route exact path="/" component={StartComp} />
              <Route exact path="/mode" component={ModeComp} />
              <Route exact path="/game" component={GameComp} />
              {/*  */}
              <Route exact path="/welcome">Welcome Back {user && user.fullName}</Route>
              <Route exact path="/login/success" component={LoginSuccessComp} />
              {/* <Route exact path="/login/error">
                Error loging in. Please try again later!
              </Route> */}
              <Route exact path="/login/error" component={StartComp} />
              {/*  */}
            </Switch>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
