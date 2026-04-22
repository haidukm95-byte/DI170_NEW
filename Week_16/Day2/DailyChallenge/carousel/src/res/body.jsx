import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./body.css";

const list = {
    HongKong: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg",
    Macao: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp",
    Japan: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp",
    LasVegas: "https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/usg6havzpmut5gxwbz8f.webp",
};

const keys = Object.keys(list);
const values = Object.values(list);

function Body() {
    const [index, setIndex] = useState(0);

    const goNext = () => setIndex((prev) => (prev + 1) % keys.length);
    const goPrev = () => setIndex((prev) => (prev - 1 + keys.length) % keys.length);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div className="carousel-wrapper">
            <Carousel
                selectedItem={index}
                onChange={(i) => setIndex(i)}
                showThumbs={false}
                infiniteLoop
                useKeyboardArrows
                transitionTime={400}
            >
                {keys.map((city, i) => (
                    <div key={city}>
                        <img src={values[i]} alt={city} />
                        <p className="legend">{city}</p>
                    </div>
                ))}
            </Carousel>

            <div className="thumbs">
                <ul className="thumbs-list">
                    {values.map((src, i) => (
                        <li
                            key={i}
                            className={`thumbs-list-thumb${i === index ? " active" : ""}`}
                            onClick={() => setIndex(i)}
                        >
                            <img src={src} alt={keys[i]} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Body;
