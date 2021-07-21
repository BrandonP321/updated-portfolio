import React, { ReactElement } from 'react'
import styles from "./SkillsList.module.scss";

export interface ISkillList {
    listHeading: string;
    skills: string[];
}

interface Props {
    heading: string;
    skillLists: ISkillList[];
    listIcon: string;
}

export default function SkillsList(props: Props): ReactElement {
    return (
        <div className={styles.skillsListWrapper}>
            <h3 className={styles.skillsHeading}>{props.heading}</h3>
            <img src={props.listIcon} alt="List Icon" className={styles.skillsIcon}/>
            <hr className={styles.divider}/>
            <div className={styles.skillsList}>
                {props.skillLists.map(list => {
                    return (
                        <SkillSubList listHeading={list.listHeading} skills={list.skills}/>
                    )
                })}
            </div>
        </div>
    )
}

const SkillSubList: React.FC<ISkillList> = (props) => {
    return (
        <div className={styles.skillsSubList}>
            <h4>{props.listHeading}</h4>
            {props.skills.map(skill => {
                return (
                    <p className={styles.skill}>{skill}</p>
                )
            })}
        </div>
    )
}

const imgPath = (img: string) => {
    return require(`../../../../assets/media/img/${img}`)
}