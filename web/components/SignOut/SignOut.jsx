import './SignOut.scss';
import React from 'react';
import Api from 'api';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(Api.signOut()),
});

const SignOut = ({ signOut }) => (
  <button className="SignOut" onClick={signOut}>Выход</button>
);

SignOut.propTypes = {
  signOut: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(SignOut);
