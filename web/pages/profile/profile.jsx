import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Api from 'api';

const mapStateToProps = (state) => ({
  profile: state.profile
});

const Profile = ({ profile }) => (
  <>
    <h1>Профиль</h1>
    <ul>
      <li>id - <b>{profile.id}</b></li>
      <li>Имя - <b>{profile.name}</b></li>
      <li>Фамилия - <b>{profile.surname}</b></li>
      <li>Создан - <b>{profile.createDate}</b></li>
    </ul>
  </>
);

Profile.getInitialProps = async ({ store, res, req, query }) => {
  await store.dispatch(Api.getProfileData(res, req, query.id));
};

Profile.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string,
    createDate: PropTypes.string.isRequired,
  })
};

export default connect(mapStateToProps)(Profile);
