import './SignUp.scss';
import React from 'react';
import { toSignUp } from 'store';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

const mapDispatchToProps = dispatch => ({
  signIn: (body) => dispatch(toSignUp(body)),
});

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withState('state', 'setState', { name: '', password: '' }),
  withHandlers({
    onSubmit: ({ signIn, state }) => (event) => {
      event.preventDefault();
      signIn(state);
    },
    onInput: ({ setState, state }) => (event) => {
      const { name, value } = event.currentTarget;

      setState({
        ...state,
        [name]: value
      });
    }
  })
);

const SignUp = enhance(({ onInput, onSubmit }) => (
  <form className="sign-in" onSubmit={onSubmit}>
    <h3>Вход</h3>

    <div className="sign-up__group">
      <label id="name">Введите имя:</label>
      <input type="text" name="name" autoComplete="off" onChange={onInput}/>
    </div>

    <div className="sign-in__group">
      <label id="surname">Введите фамилию:</label>
      <input type="text" name="surname" autoComplete="off" onChange={onInput}/>
    </div>

    <div className="sign-in__group">
      <label id="password">Введите пароль:</label>
      <input type="password" name="password" autoComplete="off" onChange={onInput}/>
    </div>

    <button type="submit">Войти</button>
  </form>
));

export default SignUp;
