import './Navigation.scss';
import {Link} from 'web/routes';
import React from 'react';

const Navigation = () => {
    return (
        <nav className="navigation">
            <Link href="/">
                <a>Главная</a>
            </Link>
            <Link href="/about">
                <a>О проекте (список дел)</a>
            </Link>
            <Link href="/blog">
                <a>Блог</a>
            </Link>
        </nav>
    );
};

export default Navigation;
