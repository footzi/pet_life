import './Navigation.scss';
import { Link } from 'web/routes';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import SignOut from '../SignOut';

const mapStateToProps = (state) => ({
  id: state.user.id
});

const enhance = compose(
  connect(
    mapStateToProps
  )
);

const Navigation = enhance(({ id }) => (
  <nav className="navigation">
    {id && (
      <>
      <SignOut id={id} />
        <Link href="/profile">
          <a>Профиль № {id}</a>
        </Link>
      </>
    )}
    {!id && (
      <>
        <Link href="/">
          <a>Вход</a>
        </Link>
        <Link href="/checkin">
          <a>Регистрация</a>
        </Link>
      </>
    )}
    <Link href="/about">
      <a>О проекте (private)</a>
    </Link>
  </nav>
));

export default Navigation;
