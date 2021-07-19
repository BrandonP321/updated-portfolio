import React, { ReactElement, useRef } from 'react'
import { useState } from 'react';
import styles from "./Header.module.scss";
import classNames from 'classnames';
import { useEffect } from 'react';

const navLinks = [
    { text: "Home", id: "#" },
    { text: "About", id: "#" },
    { text: "Projects", id: "#" },
    { text: "Resume", id: "#" },
]

interface Props {
    
}

export default function Header({}: Props): ReactElement {
    const [isHeaderHovered, setIsHeaderHovered] = useState(false);
    const [linkHoverEleStyle, setLinkHoverEleStyle] = useState<React.CSSProperties>({ width: 0, left: 0, opacity: 0 })
    const [isLinkHoverEleVisible, setIsLinkHoverEleVisible] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<null | EventTarget>(null);
    const [showHeaderBg, setShowHeaderBg] = useState(false);

    // how far user needs to scroll to show header bg
    const scrollAmountToShowHeaderBg = useRef(300);

    useEffect(() => {
        // make initial check for showing header bg
        handleScroll();

        window.addEventListener("scroll", handleScroll)

        return cleanup;
    }, [])

    /**
     * removed any event listeners on component unmount
     */
    const cleanup = () => {
        window.removeEventListener("scroll", handleScroll);
    }

    /**
     * checks if header bg needs to be shown on scroll
     */
    const handleScroll = () => {
        setShowHeaderBg(window.pageYOffset >= scrollAmountToShowHeaderBg.current);
    }

    const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const target = e.currentTarget;
        const targetRect = target.getBoundingClientRect();

        setHoveredLink(target);
        setLinkHoverEleStyle({ width: targetRect.width, left: targetRect.left + (targetRect.width / 2), opacity: 1 })
        setTimeout(() => {
            setIsLinkHoverEleVisible(true);
        }, 100)
    }

    const handleHeaderLeaveHover = () => {
        setHoveredLink(null);
        setIsHeaderHovered(false);
        setIsLinkHoverEleVisible(false);

        setLinkHoverEleStyle({ ...linkHoverEleStyle, width: 0, opacity: 0 })
    }

    return (
        <header className={styles.mainHeader} onMouseOver={() => setIsHeaderHovered(true)} onMouseLeave={handleHeaderLeaveHover}>
            <div className={classNames(styles.headerBg, {[styles.shown]: showHeaderBg})}/>
            <div className={styles.headerBrand}>
                BRANDON
            </div>
            <nav className={styles.headerLinks}>
                {navLinks.map((link) => {
                    return (
                        <a href={link.id} 
                            className={styles.navLink} 
                            key={link.text} 
                            onMouseOver={(e) => handleLinkHover(e)}>{link.text}</a>
                    )
                })}
            </nav>
            <div className={classNames(styles.linkHoverEffect, {[styles.active]: isLinkHoverEleVisible})} style={linkHoverEleStyle}/>
        </header>
    )
}
