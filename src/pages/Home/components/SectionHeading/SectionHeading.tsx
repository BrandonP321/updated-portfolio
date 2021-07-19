import classNames from 'classnames';
import React, { ReactElement } from 'react'
import styles from "./SectionHeading.module.scss";

interface Props {
    heading: string;
    className?: string;
}

export default function SectionHeading(props: Props): ReactElement {
    return (
        <div className={classNames(styles.sectionHeading, String(props.className))}>
            <p className={styles.bgText}>{props.heading}</p>
            <div className={styles.textWrapper}>
                <h2>{props.heading}</h2>
            </div>
        </div>
    )
}
