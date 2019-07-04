import './Navigation.scss';
import { Link } from 'web/routes';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import SignOut from '../SignOut';

const mapStateToProps = (state) => ({
  user: state.user
});

const enhance = compose(
  connect(
    mapStateToProps
  )
);

const Navigation = enhance(({ user }) => (
  <nav className="navigation">
    {user.id && (
      <>
      <SignOut id={user.id} />
        <Link href={`/profile/${user.id}`}>
          <a>Профиль № {user.id}</a>
        </Link>
      </>
    )}
    {!user.id && (
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
