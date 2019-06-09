import './SignUp.scss';
import React from 'react';
import { toSignUp } from 'store';

const data = {
    name: '',
    surname: '',
    password: ''
};

const change = (event) => {
    const { target } = event;
    data[target.name] = target.value;
};

const submit = (event) => {
    event.preventDefault();
    toSignUp(data);
};

const SignUp = () => (
	<form className="sign-up" onSubmit={submit}>
        <h3>Регистрация</h3>

        <div className="sign-up__group">
            <label id="name">Введите имя:</label>
            <input type="text" name="name" autoComplete="off" onChange={change}/>
        </div>

        <div className="sign-up__group">
            <label id="surname">Введите Фамилию:</label>
            <input type="text" name="surname" autoComplete="off" onChange={change}/>
        </div>

        <div className="sign-up__group">
            <label id="password">Введите пароль:</label>
            <input type="password" name="password" autoComplete="off" onChange={change}/>
        </div>

        <button type="submit">Зарегистрироваться</button>
    </form>
);

export default SignUp;
