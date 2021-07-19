import React, { ReactElement, SetStateAction, TouchEventHandler } from 'react'
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import styles from "./Skills.module.scss";
import reactIcon from "../../../../assets/media/img/icons/react_icon.svg";
import classNames from 'classnames';
import { useState } from 'react';
import skillData from "./skills.json";
import { Dispatch } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { number } from 'yargs';

enum numberToStringMapping {
    "One",
    "Two",
    "Three",
    "Four",
    "Five"
}

interface ISkillGroup {
    popUpSideOfMouseToDisplayOn: string;
    heading: string;
    skills: string[];
}

interface Props {
    
}

export default function Skills({}: Props): ReactElement {
    const [hoveredSkill, setHoveredSkill] = useState<null | ISkillGroup>(null);
    // indicates is user touched skill btn on a touch screen device
    const [touchedSkill, setTouchedSkill] = useState<null | {x: number; y: number;}>(null);

    return (
        <section className={styles.skillsSection}>
            <SectionHeading heading={"SKILLS"} className={styles.heading}/>
            <div className={styles.skillsContainer}>
                <div className={styles.skillIcons}>
                    {skillData.map((skill, i) => {
                        const skillNumber = numberToStringMapping[i];

                        return (
                            <SkillIcon 
                                icon={reactIcon} 
                                containerClass={styles[`skill${skillNumber}`]} 
                                skillData={skill} key={i}
                                setHoveredSkillState={setHoveredSkill}
                                setTouchedSkillState={setTouchedSkill}/>
                        )
                    })}
                </div>
            </div>

            {hoveredSkill &&
                <SkillPopUp skillGroup={hoveredSkill} touchedSkill={touchedSkill}/>
            }
        </section>
    )
}

interface ISkillIcon {
    icon: any;
    containerClass?: string;
    skillData: ISkillGroup;
    setHoveredSkillState: Dispatch<SetStateAction<ISkillGroup | null>>;
    setTouchedSkillState: Dispatch<SetStateAction<{ x: number; y: number; } | null>>;
}

const SkillIcon: React.FC<ISkillIcon> = (props) => {
    const [hasBeenHovered, setHasBeenHovered] = useState(false);

    const handleMouseLeave = () => {
        props.setHoveredSkillState(null);
    }

    const handleMouseEnter = () => {
        setHasBeenHovered(true);
        props.setHoveredSkillState(props.skillData);
    }

    const handleBtnTouch: TouchEventHandler<HTMLDivElement> = (e) => {
        const targetRect = e.currentTarget.getBoundingClientRect();
        const targetX = targetRect.left;
        // distance from top of page is dist from screen top plus distance scrolled
        const targetY = targetRect.y + window.scrollY;
        
        props.setTouchedSkillState({x: targetX, y: targetY})
    }

    return (
        <div className={classNames(styles.skillContainer, props.containerClass)} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleBtnTouch}>
            <div className={styles.aspectRatioBox}/>
            <div className={styles.iconWrapper}>
                <img src={props.icon} className={styles.icon}/>
                {/* show shining animation over button if user has not hovered over button yet */}
                {!hasBeenHovered &&
                    <div className={styles.shine}/>
                }
            </div>
        </div>
    )
}

interface ISkillPopUp {
    skillGroup: ISkillGroup;
    touchedSkill: {x: number; y: number} | null;
}

const SkillPopUp: React.FC<ISkillPopUp> = (props) => {
    const [mousePosition, setMousePosition] = useState<null | {x: number; y: number}>(null);

    const {
        popUpSideOfMouseToDisplayOn,
        heading,
        skills
    } = props.skillGroup

    useEffect(() => {
        // no need to add mouse listener if user is on touch screen device
        if (!props.touchedSkill) {
            window.addEventListener("mousemove", handleMouseMove)
        }

        return cleanup
    }, [])

    const cleanup = () => {
        window.removeEventListener("mousemove", handleMouseMove);
    }

    const handleMouseMove = (e: MouseEvent) => {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        
        setMousePosition({ x: mouseX, y: mouseY })
    }

    const positionClass = popUpSideOfMouseToDisplayOn === "left" ? styles.leftFacing : styles.rightFacing;

    const positionStyle: React.CSSProperties = {
        top: props.touchedSkill ? props.touchedSkill.y : mousePosition?.y,
        left: props.touchedSkill ? props.touchedSkill.x : mousePosition?.x
    }

    return (
        <div className={classNames(styles.skillPopUp, positionClass)} style={positionStyle}>
            <div className={styles.content}>
                <h3>{heading}</h3>
                <div className={styles.skillsList}>
                    {skills.map((skill, i) => {
                        return (
                            <p key={i}><FontAwesomeIcon className={styles.checkIcon} icon={faCheck}/> {skill}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}