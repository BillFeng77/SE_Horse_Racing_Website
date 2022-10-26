import Link from 'next/link';

import styles from '../styles/menu.module.css';

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link href="/posts">
                        <a>Forum</a>
                    </Link>
                </li>
                <li>
                    
                </li>
            </ul>
        </nav>
    );
}