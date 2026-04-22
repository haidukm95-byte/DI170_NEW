import React, { useState, useEffect } from "react";
import "./body.css";

const list = {
    HongKong: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg",
    Macao: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp",
    Japan: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp",
    LasVegas: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp",
};

const keys = Object.keys(list);
const values = Object.values(list);

function Body() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState("slide-right");

    const goNext = () => {
        setDirection("slide-right");
        setIndex((prev) => (prev + 1) % keys.length);
    };

    const goPrev = () => {
        setDirection("slide-left");
        setIndex((prev) => (prev - 1 + keys.length) % keys.length);
    };

    const goToThumb = (i) => {
        setDirection(i > index ? "slide-right" : "slide-left");
        setIndex(i);
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div className="carousel-root">
            <div className="carousel-slider">
                {/* key={index} forces remount on each slide, restarting the animation */}
                <div key={index} className={`city ${direction}`}>
                    <img src={values[index]} alt={keys[index]} />
                    <p className="city-name">{keys[index]}</p>
                </div>
            </div>
            <div className="thumbs">
                <ul className="thumbs-list">
                    {values.map((src, i) => (
                        <li key={i} className="thumbs-list-thumb">
                            <img src={src} alt={keys[i]} onClick={() => goToThumb(i)} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Body;
