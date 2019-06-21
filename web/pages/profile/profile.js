import React from 'react';
import { compose } from 'recompose';

const enhance = compose();

const Profile = enhance(() => (
  <h1>Профиль</h1>
));

Profile.getInitialProps = async ({ store, req }) => {};

export default Profile;
