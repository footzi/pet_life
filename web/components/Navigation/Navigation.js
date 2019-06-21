import './Navigation.scss';
import { Link } from 'web/routes';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

const mapStateToProps = (state) => {
  return {
    id: state.user.id
  }
}

const enhance = compose(
  connect(
    mapStateToProps
  )
)

const Navigation = enhance(({id}) => (
  <nav className="navigation">
    <Link href="/">
      <a>Главная</a>
    </Link>
    <Link href="/profile">
      <a>Профиль № {id}</a>
    </Link>
    <Link href="/about">
      <a>О проекте (список дел)</a>
    </Link>
    {!id && (
      <Link href="/checkin">
        <a>Регистрация</a>
      </Link>
    )}>
    {id && (
      <Link href="/logout">
       <a>Выйти</a>
      </Link>
    )}
  </nav>
));

export default Navigation;
