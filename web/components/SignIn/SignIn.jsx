import './SignIn.scss';
import React, { useState, useRef, useEffect } from 'react';
import Api from 'api';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => ({
  signIn: body => dispatch(Api.signIn(body))
});

const SignIn = ({ signIn }) => {
  const inputName = useRef();
  const inputPassword = useRef();

  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const submit = event => {
    event.preventDefault();
    signIn({ name, password });
  };

  useEffect(() => {
    setName(inputName.current.value);
    setPassword(inputPassword.current.value);
  });

  return (
    <form className="sign-in" onSubmit={submit}>
      <h3>Вход</h3>

      <div className="sign-in__group">
        <label id="name">Введите имя:</label>
        <input
          type="text"
          name="name"
          autoComplete="on"
          ref={inputName}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="sign-in__group">
        <label id="password">Введите пароль:</label>
        <input
          type="password"
          name="password"
          autoComplete="on"
          ref={inputPassword}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Войти</button>
    </form>
  );
};

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
