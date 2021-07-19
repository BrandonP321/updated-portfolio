import React, { ReactElement, useRef } from 'react'
import { Responsive } from '../../utils/Responsive'
// import Hero from './sections/Hero/Hero';
import Hero from './sections/Hero1/Hero';
import styles from "./Home.module.scss";
import { Header } from '../../shared/components';
// import Skills from './sections/Skills/Skills';
import Skills from './sections/Skills1/Skills';
import testImg from "../../assets/media/img/web-lines.png";

export default function Home(): ReactElement {
    const { current: responsive } = useRef(Responsive);

    return (
        <div className={styles.home}>
            <Header/>
            <Hero/>
            <Skills/>
        </div>
    )
}
