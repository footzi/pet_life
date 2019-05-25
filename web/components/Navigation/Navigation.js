import './Navigation.scss';
import Link from 'next/link';
import React from 'react';

const Navigation = () => {
    return (
        <nav className="navigation">
            <Link href="/">
                <a>Главная</a>
            </Link>
            <Link href="/about">
                <a>Обо проекте</a>
            </Link>
            <Link href="/blog">
                <a>Блог</a>
            </Link>
        </nav>
    )
}

export default Navigation;