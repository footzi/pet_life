import './SignUp.scss';
import React from 'react';
import { toSignUp } from 'store';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

const mapDispatchToProps = dispatch => ({
  signUp: (body) => dispatch(toSignUp(body)),
});

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withState('state', 'setState', { name: '', password: '' }),
  withHandlers({
    onSubmit: ({ signUp, state }) => (event) => {
      event.preventDefault();
      signUp(state);
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
  <form className="sign-up" onSubmit={onSubmit}>
    <h3>Вход</h3>

    <div className="sign-up__group">
      <label>Введите имя:
        <input type="text" name="name" autoComplete="off" onChange={onInput} required/>
      </label>
    </div>

    <div className="sign-up__group">
      <label>Введите фамилию:
        <input type="text" name="surname" autoComplete="off" onChange={onInput}/>
      </label>
    </div>

    <div className="sign-up__group">
      <label>Введите пароль:
        <input type="password" name="password" autoComplete="off" onChange={onInput}/>
      </label>
    </div>

    <div className="sign-up__group">
      <label>
        <input type="checkbox" required/>
        Подтверждаю
      </label>
    </div>

    <button type="submit">Регистрация</button>
  </form>
));

export default SignUp;
