import React, { ReactElement } from 'react'
import SkillsList, { ISkillList } from "../../components/SkillsList/SkillsList"
import styles from "./Skills.module.scss";
import codeIcon from "../../../../assets/media/img/computer-with-code-symbol.png";
import skills from "./skills.json";
import SectionHeading from '../../components/SectionHeading/SectionHeading';

interface Props {
    
}

export default function Skills({}: Props): ReactElement {
    return (
        <section className={styles.skillsSection}>
            <SectionHeading heading={"SKILLS"} className={styles.heading}/>
            <div className={styles.skillsLists}>
                <SkillsList
                    heading={"Web Development"}
                    skillLists={skills.dev}
                    listIcon={codeIcon}/>
                <SkillsList
                    heading={"Web Development"}
                    skillLists={skills.dev}
                    listIcon={codeIcon}/>
                <SkillsList
                    heading={"Web Development"}
                    skillLists={skills.dev}
                    listIcon={codeIcon}/>
            </div>
        </section>
    )
}