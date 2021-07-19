import classNames from 'classnames';
import React, { ReactElement } from 'react'
import styles from "./GradientButton.module.scss";

interface Props {
    url?: string;
    onClick?: () => void;
    children: React.ReactNode;
    textColor: "white" | "blue";
}

export default function GradientButton(props: Props): ReactElement {
    // inner content of button
    const inner = props.children;

    const btnClasses = classNames(styles.gradientButton, styles[props.textColor])

    return (
        <>
            {props.url
                ? <a href={props.url} className={btnClasses}>{inner}</a>
                : <button onClick={props.onClick} className={btnClasses}>{inner}</button>
            }
        </>
    )
}
