import './Navigation.scss';
import { Link } from 'web/routes';
import React from 'react';
import { connect } from 'react-redux';
import SignOut from '../SignOut';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  user: state.user
});

const Navigation = ({ user }) => (
  <nav className="navigation">
    {user.id && (
      <>
        <SignOut />
        <Link route={`/profile/${user.id}`}>
          <a>Профиль № {user.id}</a>
        </Link>
      </>
    )}
    {!user.id && (
      <>
        <Link route="/">
          <a>Вход</a>
        </Link>
        <Link route="/checkin">
          <a>Регистрация</a>
        </Link>
      </>
    )}
    <Link route="/about">
      <a>О проекте (private)</a>
    </Link>
  </nav>
);

Navigation.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number
  })
};

export default connect(mapStateToProps)(Navigation);
