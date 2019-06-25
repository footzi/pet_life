import './SignOut.scss';
import React from 'react';
import { toSignOut } from 'store';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const mapDispatchToProps = dispatch => ({
  signOut: (id) => dispatch(toSignOut(id)),
});

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
);

const SignOut = enhance(({ id, signOut }) => (
  <button className="SignOut" onClick={() => { signOut(id); }}>Выход</button>
));

export default SignOut;
