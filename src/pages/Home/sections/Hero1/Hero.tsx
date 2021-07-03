import React, { ReactElement } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import styles from "./Hero.module.scss";

interface Props {
    
}

export default function Hero({}: Props): ReactElement {
    const [parallaxAmount, setParallaxAmount] = useState(0);

    useEffect(() => {
        const parallaxSpeed = .4;

        // make initial parallax call on page load
        parallax(parallaxSpeed);

        window.addEventListener("scroll", () => parallax(parallaxSpeed))

        return () => window.removeEventListener("scroll", () => parallax);
    }, [])

    const parallax = (scrollRate: number) => {
        setParallaxAmount(window.pageYOffset * scrollRate);
    }

    const heroStyle: React.CSSProperties = {
        backgroundPosition: `center, 50% ${parallaxAmount}px`
    }

    return (
        <div className={styles.hero} style={heroStyle}>
            <div className={styles.heroContent}>
                <p className={styles.subtitle}>FULL STACK WEB DEVELOPER</p>
                <h1 className={styles.title}>BRANDON PHILLIPS</h1>
            </div>
        </div>
    )
}
