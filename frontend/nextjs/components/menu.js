import Link from 'next/link';

import styles from '../styles/menu.module.css';


export default function Menu() {
    return (
        <div className={styles.header}>
            <b className={styles.title}>Horseracing</b>
        <div className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link href="/horses">
                        <a>Horse</a>
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link href="/forum">
                        <a>Forum</a>
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link href="/auth/login">
                        <a>Login</a>
                    </Link>
                </li>
            </ul>
        </div>
        <div className={styles.userName}>
            {/* TODO: drop down 组件, 包括logout，administrator link*/}
            <p>Hi, user!</p>
        </div>
        </div>
    );
}