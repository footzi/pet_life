import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { loadProfileData } from 'store';

const mapStateToProps = (state) => ({
  profile: state.profile
});


const enhance = compose(
  connect(
    mapStateToProps
  )
);

const Profile = enhance(({ profile }) => (
  <>
    <h1>Профиль</h1>
    <ul>
      <li>id - <b>{profile.id}</b></li>
      <li>Имя - <b>{profile.name}</b></li>
      <li>Фамилия - <b>{profile.surname}</b></li>
      <li>Создан - <b>{profile.createDate}</b></li>
    </ul>
  </>
));

Profile.getInitialProps = async ({ store, req, res, query }) => {
  await store.dispatch(loadProfileData(req, res, query.id));
};

export default Profile;
