import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEventHandler, FormEventHandler, ReactElement } from 'react'
import { useState } from 'react';
import GradientButton from '../GradientButton/GradientButton';
import styles from "./Footer.module.scss";
import classNames from 'classnames';
// import {} from "";

interface IFooterLink {
    linkName: string;
    url: string;
}

const projectsLinks: IFooterLink[] = [
    { linkName: "Destiny 2: Season 14", url: "https://bungie.net/SeasonOfTheSplicer" },
    { linkName: "Destiny 2: Season 14", url: "https://bungie.net/SeasonOfTheSplicer" },
    { linkName: "Destiny 2: Season 14", url: "https://bungie.net/SeasonOfTheSplicer" },
    { linkName: "Destiny 2: Season 14", url: "https://bungie.net/SeasonOfTheSplicer" },
    { linkName: "Destiny 2: Season 14", url: "https://bungie.net/SeasonOfTheSplicer" },
]

const siteLinks: IFooterLink[] = [
    { linkName: "Home", url: "/" },
    { linkName: "Skills", url: "#skills" },
    { linkName: "Projects", url: "#projects" },
    { linkName: "Resume", url: "#" },
]

const socialLinks = {
    git: <i className={classNames("fab fa-github-square", styles.socialIcon)}></i>,
    linkedin: <i className={classNames("fab fa-linkedin", styles.socialIcon)}></i>,
}

interface Props {
    
}

export default function Footer({}: Props): ReactElement {
    const [contactFormValues, setContactFormValues] = useState({ email: "", message: "" })

    const handleContactFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(contactFormValues)
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContactFormValues({ ...contactFormValues, [name]: value })
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.topRow}>
                <div className={styles.footerLinkLists}>
                    <FooterLinksList heading={"Projects"} links={projectsLinks}/>
                    <FooterLinksList heading={"Site Links"} links={siteLinks}/>
                </div>
                <form className={styles.contactForm} onSubmit={handleContactFormSubmit}>
                    <h4>Contact Me</h4>
                    <input type={"email"} placeholder={"E-mail"} aria-label={"Email"} required={true} name={"email"} value={contactFormValues.email} onChange={handleInputChange}/>
                    <textarea placeholder={"Message"} required={true} name={"message"} onChange={handleInputChange} value={contactFormValues.message}></textarea>
                    <div className={styles.btnWrapper}>
                        <GradientButton textColor={"blue"}>Send</GradientButton>
                    </div>
                </form>
                <div className={styles.contactInfo}>
                    <a href={"mailto: brandon.phillips@bphillips.dev"}>brandon.phillips@bphillips.dev</a>
                    <p>(406) 671-6723</p>
                    <p>Seattle, WA</p>
                </div>
            </div>
            <div className={styles.bottomRow}>
                <p className={styles.copyright}>?? Brandon 2021</p>
                <div className={styles.socialIcons}>
                    <SocialIcon url="https://github.com/BrandonP321" icon={socialLinks.git} name={"Github"}/>
                    <SocialIcon url="https://www.linkedin.com/in/brandon-phillips-dev" icon={socialLinks.linkedin} name={"LinkedIn"}/>
                </div>
            </div>
        </footer>
    )
}

interface IFooterLinksList {
    heading: string;
    links: IFooterLink[];
}

const FooterLinksList: React.FC<IFooterLinksList> = (props) => {
    return (
        <div className={styles.linkList}>
            <h4>{props.heading}</h4>
            {props.links.map(({ linkName, url }, i) => {
                return (
                    <>
                        <a href={url} target={"_blank"} key={i}>{linkName}</a>
                        <br/>
                    </>
                )
            })}
        </div>
    )
}

interface ISocialIcon {
    url: string;
    icon: React.ReactNode;
    name: string;
}

const SocialIcon: React.FC<ISocialIcon> = (props) => {
    return (
        <a href={props.url} target={"_blank"} className={styles.socialIcon}>
            {props.icon}
        </a>
    )
}