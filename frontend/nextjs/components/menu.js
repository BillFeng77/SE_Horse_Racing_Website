import Link from 'next/link';
import React from 'react';
import {Dropdown,Space} from 'antd';
import styles from '../styles/menu.module.css';
import {Menu} from'antd';


export default function Definemenu() {
    const userItems=[{key:'1',label:(<a target="_blank" rel="noopener noreferrer" href='/auth/logout'>Logout</a>)},
    {key:"2",label:(<a target="_blank" rel="noopener noreferrer" href="admin-manage-accounts">Admin Login</a>)}]
    return (
        <Menu mode="horizontal" className={styles.header}title="Horse Racing">
            <li>
                <a>Horse racing</a>
            </li>
            <Menu.Item className={styles.item}>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </Menu.Item>
            <Menu.Item className={styles.item}>
                <Link href="/horses">
                    <a>Horse</a>
                </Link>
            </Menu.Item>
            <Menu.Item className={styles.item}>
                <Link href="/forum">
                    <a>Forum</a>
                </Link>
            </Menu.Item>
            <Menu.Item className={styles.item}>
                <Link href="/forum">
                    <a>Forum</a>
                </Link>
            </Menu.Item>
            <Menu.Item className={styles.item}>
                <Link href="/auth/login">
                    <a>Login</a>
                </Link>
            </Menu.Item>
            <Dropdown>
                
            </Dropdown>
            <Menu.SubMenu title="Hi user" className={styles.item}>
                <Menu.Item>
                    <Link href="/auth/logout">
                        <a>Logout</a>
                    </Link>
                </Menu.Item>
                <Menu>
                    <Link href="admin-manage-accounts">
                        <a>Admin management</a>
                    </Link>
                </Menu>
            </Menu.SubMenu>
        </Menu>
        /*<div className={styles.header}>
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
            {/* TODO: Login 完善后实时显示用户名字 */
    );
}