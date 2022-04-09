import React, { Component } from 'react';
import "./game.scss";
import Timer from '../timer/timer'
import Mode from '../mode/mode';
import Leaderboard from '../leaderboard/leaderboard';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setNavClassActive } from "../../app/appSlice";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wrongCount: 0,
            movieFontSize: "80px",
            cellWidth: "90px",
        }
        this.handleClick = this.handleClick.bind(this);
    }

    titleLetters = [..."BOLLYWOOD"];
    keyLetters = [..."1234567890qwertyuiopasdfghjklzxcvbnm"];
    movie = [..."3 idiots"];
    vowels = [..."aeiou"];


    TimerComp = () => { return (<Timer />) }
    BoardComp = ()=>{ return( <Mode /> ) }
    LeaderboardComp = () => { return (<Leaderboard />) }
    
    ClickList (list) {
        return (
            <ul>
            {list.map((letter, index) => {
                return (
                    <li key={index} className={letter == ' ' ? "blank" : null } onClick={this.handleClick}><button><span>{ letter }</span></button></li>
                )    
            })}
            </ul>        
        )
    }

    List (list) {
        return (
            <ul>
            {list.map((letter, index) => {
                return (
                    <li key={index} className={letter == ' ' ? "blank" : null } style={{"--cellWidth": this.state.cellWidth}}><button style={{"--fontSize": this.state.movieFontSize}}><span>{ letter }</span></button></li>
                )    
            })}
            </ul>        
        )
    }

    handleClick = (e, customLetter=null) => {
        let targetLetter;
        e && e.preventDefault();
        if (e) targetLetter = e.target.textContent;
        else targetLetter = customLetter;

        let isVowel = false;
        this.vowels.forEach((lett) => {
            if(targetLetter.toLocaleLowerCase() == lett) isVowel = true;
        })
        !isVowel && this.vowels.push(targetLetter);

        const movieLetters = document.querySelectorAll(".g__movie ul li button span");
        const bollywood = document.querySelectorAll(".g__title ul li");

        let didMatch = false;
        movieLetters.forEach((letter) => {
            if (targetLetter.toLocaleLowerCase() == letter.textContent.toLocaleLowerCase()) {
                letter.classList.add("visible");
                didMatch = true;
            }
        })
        console.log(!didMatch)
        if (!didMatch && !isVowel) {
            this.setState(prevState => ({
                wrongCount: prevState.wrongCount + 1,
            }));
            bollywood[this.state.wrongCount].classList.add("guessed");
        }
    }

    sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    async clickVowel(el) {
        for (let i = 0; i < 5 ; i++) {
            if (el.textContent.toLocaleLowerCase() == this.vowels[i]) el.click();
            await this.sleep(200);            
        }
    }

    componentDidMount() {
        const keyNumbers = document.querySelectorAll(".g__keyboard ul li");
        for (let i = 0; i < 10; i++){
            keyNumbers[i].classList.add("number");
        }
        setTimeout(() => {
            keyNumbers.forEach((el) => {
                el.addEventListener('click', () => {
                    el.classList.add("disabled");
                })
                this.clickVowel(el);
            })
        }, 100)
    }
    componentWillMount() {
        if (this.movie.length > 13) {
            this.state.movieFontSize = "55px";
            this.state.cellWidth = "80px";
        }
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
                                {this.List(this.movie)}
                            </div>
                            <div className="g__tag">
                                <h1><span>B</span>TOWN</h1>
                                <h2>GUESS IT!</h2>
                            </div>
                            <div className="g__keys">
                                <div className="g__keyboard">
                                    {this.ClickList(this.keyLetters)}
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
                        <Route exact path="/game" component={ this.LeaderboardComp } />
                    </div>
                </div>
            </section>    
        );
    }
}
 
export default Game;

// const titleLetters = [..."BOLLYWOOD"];
// const keyLetters = [..."1234567890qwertyuiopasdfghjklzxcvbnm"];

// const List = (list) => {
//     return (
//         <ul>
//         {
//             list.map((letter, index) => {
//                 return (
//                     <li key={index} className={letter == ' ' ? "blank" : null }><button><span>{ letter }</span></button></li>
//                 )    
//             })
//         }
//         </ul>        
//     )
// }

// var movie = [..."3 idiots"];

// const Game = (props) => {

//     const [wrongCount, setWrongCount] = useState(0)
//     useEffect(() => {
//         const keyNumbers = document.querySelectorAll(".g__keyboard ul li");
//         const movieLetters = document.querySelectorAll(".g__movie ul li button span")
//         for (let i = 0; i < 10; i++){
//             keyNumbers[i].classList.add("number");
//         }
//         keyNumbers.forEach((el) => {
//             el.addEventListener('click', () => {
//                 el.classList.add("disabled");
//                 console.log(el.textContent)
//                 movieLetters.forEach((letter) => {
//                     if (el.textContent.toLocaleLowerCase() == letter.textContent.toLocaleLowerCase()) {
//                         letter.style.opacity = "1";
//                     }
//                     else {
//                         setWrongCount(wrongCount+1);
//                     }
//                 })
//             })
//         })
//         console.log(wrongCount)
//     });
//     return (
//         <section>
//             <div className="game-page">
//                 <div className="g__movie">
//                     {List(movie)}
//                 </div>
//                 <div className="g__tag">
//                     <h1><span>B</span>TOWN</h1>
//                     <h2>GUESS IT!</h2>
//                 </div>
//                 <div className="g__keys">
//                     <div className="g__keyboard">
//                         {List(keyLetters)}
//                     </div>
//                     <div className="g__title">
//                         {List(titleLetters)}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
 
// export default Game;