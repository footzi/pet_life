import './Navigation.scss';
import { Link } from 'web/routes';
import React from 'react';

const Navigation = () => (
  <nav className="navigation">
    <Link href="/profile">
      <a>Профиль</a>
    </Link>
    <Link href="/about">
      <a>О проекте (список дел)</a>
    </Link>
    <Link href="/blog">
      <a>Блог</a>
    </Link>
    <Link href="/signup">
      <a>Регистрация</a>
    </Link>
  </nav>
);

export default Navigation;
