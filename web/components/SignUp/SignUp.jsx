import './SignUp.scss';
import React, { useState } from 'react';
import Api from 'api';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => ({
  signUp: body => dispatch(Api.signUp(body))
});

const SignUp = ({ signUp }) => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [password, setPassword] = useState();

  const submit = event => {
    event.preventDefault();
    signUp({ name, surname, password });
  };

  return (
    <form className="sign-up" onSubmit={submit}>
      <h3>Вход</h3>

      <div className="sign-up__group">
        <label>
          Введите имя:
          <input type="text" name="name" autoComplete="off" onChange={e => setName(e.target.value)} required />
        </label>
      </div>

      <div className="sign-up__group">
        <label>
          Введите фамилию:
          <input type="text" name="surname" autoComplete="off" onChange={e => setSurname(e.target.value)} />
        </label>
      </div>

      <div className="sign-up__group">
        <label>
          Введите пароль:
          <input type="password" name="password" autoComplete="off" onChange={e => setPassword(e.target.value)} />
        </label>
      </div>

      <div className="sign-up__group">
        <label>
          <input type="checkbox" required />
          Подтверждаю
        </label>
      </div>

      <button type="submit">Регистрация</button>
    </form>
  );
};

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(SignUp);
