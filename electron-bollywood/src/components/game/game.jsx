import React, { Component } from 'react';
import "./game.scss";
import Timer from '../timer/timer'
import Mode from '../mode/mode';
import Leaderboard from '../leaderboard/leaderboard';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setNavClassActive } from "../../app/appSlice";
import { MovieList } from "./movies";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            wrongCount: 0,
            matchedLettersCount: 0,
            cellDim: {
                movieFontSize: "4.6vw",
                cellWidth: "6vw",
                lineHeight: "1.4",
                top: "50%",
            },
            // keyLetters = [..."1234567890qwertyuiopasdfghjklzxcvbnm"];
            keyLetters: [..."qwertyui0123opasdfghj456klzxcvbnm789"],
            movie : "Frustration",
        }
        this.handleClick = this.handleClick.bind(this);
    }

    titleLetters = [..."BOLLYWOOD"];
    //movie Max Length = 18
    // movie = "Fun and Frustration";
    // movieArray = [...""];
    clickedLetters = [..."aeiou"];
    hasGameEnded = false; 
    isVowel = false;
    
    TimerComp = () => { return (<Timer />) }
    BoardComp = ()=>{ return( <Mode /> ) }
    LeaderboardComp = () => { return (<Leaderboard />) }
    
    ClickList (list) {
        return (
            <ul>
            {list.map((letter, index) => {
                return (
                    <li key={index} className={letter == ' ' ? "blank" : null} onClick={ this.handleClick }>
                        <button><span>{letter}</span></button>
                    </li>
                )    
            })}
            </ul>        
        )
    }

    List (list) {
        return (
            <ul style={{
                    "--cellWidth": this.state.cellDim.cellWidth,
                    "--fontSize": this.state.cellDim.movieFontSize,
                    "--lineHeight": this.state.cellDim.lineHeight,
                    "--top": this.state.cellDim.top,
                }}>
            {list.map((letter, index) => {
                return (
                    <li key={index} className={letter == ' ' ? "blank" : null} >
                        <button><span>{letter}</span></button>
                    </li>
                )    
            })}
            </ul>        
        )
    }

    handleClick = async (e) => {
        e && e.preventDefault();

        if (e.target.classList[0] == "disabled") return; //don't process if the button is already clicked

        let didMatch = false;
        const movieLetters = document.querySelectorAll(".g__movie ul li");
        if (!this.hasGameEnded) {
            movieLetters.forEach((letter) => {
                if (e.target.textContent.toLowerCase() == letter.textContent.toLowerCase()) {
                    letter.classList.add("visible");
                    didMatch = true;                    
                    this.setState(prevState => ({
                        matchedLettersCount: prevState.matchedLettersCount + 1,
                    }));
                }
            })
        }

        const bollywood = document.querySelectorAll(".g__title ul li");
        if (!didMatch && !this.isVowel) {
            bollywood[this.state.wrongCount].classList.add("guessed");
            this.setState(prevState => ({
                wrongCount: prevState.wrongCount + 1,
            }));
        }

        await this.sleep(1);

        if (this.state.matchedLettersCount >= this.state.movie.replace(/\s/g, '').length) {
            this.handleGameVictory(e);
            return;
        } else if (this.state.wrongCount >= 9) {
            this.handleGameLost(e);
            return;
        }
        
        !this.isVowel && this.clickedLetters.push(e.target.textContent);
        e.target.classList.add("disabled");
    }

    disableLastKey(e) {
        if (!this.hasGameEnded) {
            e.target.classList.add("disabled");
            document.querySelector(".g__keyboard").classList.add("unclickable")
        }
        this.hasGameEnded = true;
    }

    handleGameVictory(e) {
        this.disableLastKey(e);
        alert("!!!!!Guessed");
    }

    handleGameLost(e) {
        this.disableLastKey(e);
        alert("!!!!YOU LOOSE");
    }

    setKeyNumColors(keyNumbers, n) {
        for (let i = 0; i < 36; i++) keyNumbers[i].setAttribute('id', '')
        if (n == 36) {
            for (let i = 0; i < n; i++) {
                if ((i >= 8 && i <= 11) || (i >= 21 && i <= 23) || (i >= 33)) keyNumbers[i].setAttribute('id', 'number');
            }
        } else {
            for (let i = 0; i < n; i++) { keyNumbers[i].setAttribute('id', 'number') }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async clickLetter(el) {
        for (let i = 0; i < this.clickedLetters.length ; i++) {
            if (el.textContent.toLowerCase() == this.clickedLetters[i]) el.click();
            await this.sleep(200);            
        }
    }

    resetKeysClickability(keyNumbers) {
        keyNumbers.forEach((el) => {
            el.classList.remove("disabled");
            this.clickedLetters.forEach((letter) => {
                if (el.textContent.toLowerCase() == letter.toLowerCase()) {
                    el.classList.add("disabled");
                }
            })
        })
    }

    ScreenSizeIntervalState = false;
    prevScreenSizeState = false;
    handleResize = (e) => {
        this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight });
        
        const keyNumbers = document.querySelectorAll(".g__keyboard ul li");
        if (this.state.screenWidth <= 1000) {
            this.prevScreenSizeState = this.ScreenSizeIntervalState;
            this.ScreenSizeIntervalState = true;
        } else {
            this.prevScreenSizeState = this.ScreenSizeIntervalState;
            this.ScreenSizeIntervalState = false;
        }

        if (this.ScreenSizeIntervalState == !this.prevScreenSizeState) {
            if (this.state.screenWidth <= 1000) {
                this.setState({ keyLetters: [..."1234567890qwertyuiopasdfghjklzxcvbnm"] });
                this.setKeyNumColors(keyNumbers, 10)
            } else {
                this.setState({ keyLetters: [..."qwertyui0123opasdfghj456klzxcvbnm789"] })
                this.setKeyNumColors(keyNumbers, 36)
            }
            this.resetKeysClickability(keyNumbers);
        }
    };

    setInitialCellDim() {
        if ([...this.state.movie].length > 13) {
            this.setState({
                cellDim: {
                    movieFontSize : "4vw",
                    cellWidth: "5vw",
                    lineHeight: "1.3",
                    top: "25%",
                }
            });
        }
    }

    async GetMovie() {
        let rand_num;
        do {
            rand_num = Math.floor(Math.random() * MovieList.length);
            this.setState({ movie: MovieList[rand_num].name });        
        } while (MovieList[rand_num].name.length > 18)
        await this.sleep(1);
        this.setInitialCellDim(MovieList[rand_num].name.length);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);

        this.GetMovie();

        const keyNumbers = document.querySelectorAll(".g__keyboard ul li");
        if (this.state.screenWidth <= 1000) {
            this.setKeyNumColors(keyNumbers, 10);
            this.setState({ keyLetters: [..."1234567890qwertyuiopasdfghjklzxcvbnm"] });
            this.ScreenSizeIntervalState = true;
            this.prevState = true;
        } else this.setKeyNumColors(keyNumbers, 36);

        this.isVowel = true;
        setTimeout(() => {
            document.querySelector(".g__keyboard").classList.add("unclickable")
            keyNumbers.forEach((el) => {
                this.clickLetter(el);
            })
        }, 100)
        setTimeout(() => {
            document.querySelector(".g__keyboard").classList.remove("unclickable")
            this.isVowel = false
        }, 1101)
    }
    componentWillMount() {
        this.setInitialCellDim();
    }
    componentWillUnmount() {
        this.setState({ wrongCount: 0 });
    }
 
    render() { 

        return ( 
            <section>
                <div className="game-page">
                    <span id="page-tag" hidden>game</span>
                    <div className="g__content">
                        <div className="abs">                            
                            <div className="g__movie">
                                <div className="g__start">
                                    <button>Start</button>
                                </div>
                                {this.List([...this.state.movie])}
                            </div>
                            <div className="g__tag">
                                <h1><span>B</span>TOWN</h1>
                                <h2>GUESS IT!</h2>
                            </div>
                            <div className="g__keys">
                                <div className="g__keyboard">
                                    {this.ClickList(this.state.keyLetters)}
                                </div>
                                <div className="g__title">
                                    {this.List(this.titleLetters)}
                                </div>
                            </div>
                            <div className="mode">
                                <Route exact path="/game" component={ this.TimerComp } />
                            </div>
                        </div>
                    </div>
                    <div className="g__board">
                        {/* <Route exact path="/game" component={ this.LeaderboardComp } /> */}
                    </div>
                </div>
            </section>    
        );
    }
}
 
export default Game;