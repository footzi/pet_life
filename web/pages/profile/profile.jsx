import React from 'react';
import { compose } from 'recompose';
import { loadProfileData } from 'store';

const enhance = compose();

const Profile = enhance(() => (
  <h1>Профиль</h1>
));

Profile.getInitialProps = async ({ store, req, res, query }) => {
	console.log(query)
  await store.dispatch(loadProfileData(req, res));
};

export default Profile;
