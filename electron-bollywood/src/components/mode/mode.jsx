import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom';
import "./mode.scss";

import Carousel from 'react-elastic-carousel';

const Mode = () => {
    const history = useHistory();
    
    useEffect(() => {
        pageElementsVisible();
    },[]);

    const carouselBreakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 400, itemsToShow: 1 },
        { width: 500, itemsToShow: 1 },
        { width: 590, itemsToShow: 1 },
    ];

    const descriptionItems = [
        {
            title: `Bollywood`,
            text: [
                `Guess the bollywood movie by choosing the letters that you think may be included in it.`,
                `Vowels(a, e, i, o, u) are autofilled at start.`,
                `Guess the movie before all the letters of Bollywood are sliced off.`
            ]
        },
        {
            title: `Hollywood`,
            text: [
                `Guess the hollywood movie by choosing the letters that you think may be included in it.`,
                `Vowels(a, e, i, o, u) are autofilled at start.`,
                `Guess the movie before all the letters of Hollywood are sliced off.`
            ]
        },
        {
            title: `Word Game`,
            text: [
                `Spell different words from categories such as Animals, Countries, Music, Sport, Games and accessories, Transport, Professions, Nature and many more!`,
                `Stimulate your vocabulary and language skills.`
            ]
        },
    ]

    const pageElementsVisible = () => {
        setTimeout(() => { document.querySelector(".m__bottom")?.classList.add("visible") }, 600);
        setTimeout(() => { document.querySelector(".m__top")?.classList.add("visible") }, 600);
        setTimeout(() => { document.querySelector(".m__tag")?.classList.add("visible") }, 200);
    }

    return (
        <section>
            <div className="mode-page">
                <span id="page-tag" hidden>mode</span>
                <div className="m__content">
                    <div className="m__tag">
                        <h2>
                            <span>Fun and</span>
                            <span>Simple</span>
                        </h2>
                    </div>
                    <div className="m__subcontent">
                        <h2 className="m__top"><span>Choose Mode</span></h2>
                        <div className="m__bottom">
                            <div className="grab-sign">
                                <span>Grab and Scroll to see more</span>
                                <p>
                                    <div className="arrow-line"></div>
                                    <svg viewBox="0 0 20 20"><path d="M6.3 3l3.6 3.5m4.5 3.5l-8.2 7" fill="none" stroke="#ece8e1" pathLength="1"></path></svg>
                                </p>
                            </div>
                            <div className="m__carousel">
                                <Carousel
                                    breakPoints={carouselBreakPoints}
                                    showArrows={false}
                                >
                                    {descriptionItems.map((item, index) => {
                                        return (
                                            <div className={"mode-card card-" + (index+1)}>
                                                <h4>Play mode</h4>
                                                <h2>{item.title}</h2>
                                                <ul>
                                                    {item.text.map((feature) => {
                                                        return (
                                                            <li>{feature}</li>
                                                        )
                                                    })}
                                                </ul>
                                                <button onClick={() => history.push('/game')}>Play</button>
                                            </div>
                                        )
                                    })}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Mode;