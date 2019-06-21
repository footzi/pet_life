import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Cookies } from 'react-cookie';
import Router from 'next/router';

const { domain } = require('../server.config');

const cookies = new Cookies();

// начальное состояние
const initState = {
  pages: {
    home: [{ id: 1, name: 'Home' }],
    about: [{ id: 2, title: 'Title' }],
    blog: '',
  },
  user: {
    id: ''
  },
  notification: ''
};

// алиасы для экшенов
export const actionTypes = {
  GET_HOME_DATA: 'GET_HOME_DATA',
  GET_ABOUT_DATA: 'GET_ABOUT_DATA',
  GET_BLOG_DATA: 'GET_BLOG_DATA',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  SET_USER: 'SET_USER'
};

// редьюсеры
export const reducer = (state = initState, action) => {
  switch (action.type) {
  case actionTypes.GET_HOME_DATA:
    return {
      ...state,
      pages: {
        ...state.pages, home: action.data,
      },
    };
  case actionTypes.GET_ABOUT_DATA:
    return {
      ...state,
      pages: {
        ...state.pages, about: action.data,
      },
    };
  case actionTypes.GET_BLOG_DATA:
    return {
      ...state,
      pages: {
        ...state.pages, blog: action.data,
      },
    };
  case actionTypes.SET_NOTIFICATION:
    return {
      ...state,
      notification: action.data
    };
  case actionTypes.SET_USER:
    return {
      ...state,
      user: action.user
    };
  default:
    return state;
  }
};

// Экшены, возврашают тип, и какой-либо пэйлоад
export const setNotification = (data) => dispatch => {
  dispatch({ type: 'SET_NOTIFICATION', data });
};

export const setUser = (id) => dispatch => {
  const user = { id };
  dispatch({ type: 'SET_USER', user });
};

// export const loadHomeData = () => dispatch => axios.get('https://jsonplaceholder.typicode.com/users')
//   .then((response) => {
//     const { data } = response;
//     dispatch({ type: 'GET_HOME_DATA', data });
//   })
//   .catch((error) => {
//     console.error(`При получении данных для главной страницы произошла ошибка: ${error}`);
//   });
export const loadHomeData = (req) => async (dispatch) => {
  const token = req ? req.cookies.token : cookies.get('token');
  const auth = { Authorization: `Bearer ${token}` };

  console.log(token)

  try {
    const response = await axios.get(`${domain}/pages/home`, { headers: auth });
    const { data } = response;

    dispatch({ type: 'GET_HOME_DATA', data });
  } catch (error) {
    console.error(`При получении данных для главной страницы произошла ошибка: ${error}`);
  }
};

export const loadAboutData = (req) => async (dispatch) => {
  const token = req ? req.cookies.token : cookies.get('token');
  const auth = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.get(`${domain}/api/about`, { headers: auth });
    const { data } = response;

    dispatch(setNotification({ success: 'Доступ разрешен' }));
    dispatch({ type: 'GET_ABOUT_DATA', data });
  } catch (error) {
    dispatch(setNotification({ error: error.response.data }));
    console.error(`При получении данных для cтраницы обо мне произошла ошибка: ${error}`);
  }
};

export const toSignIn = data => dispatch => {
  const formData = new FormData();

  for (const prop of Object.keys(data)) {
    formData.append(prop, data[prop]);
  }

  axios.post(`${domain}/api/signin`, formData)
    .then((response) => {
      const { token, id } = response.data;
      cookies.set('token', token);
      dispatch(setUser(id));
      dispatch(setNotification({ success: 'Вход произошел успешно' }));
      Router.push('/profile');
    })
    .catch((error) => {
      dispatch(setNotification({ error: error.response.data }));
    });
};

export const toSignUp = data => dispatch => {
  const formData = new FormData();

  for (const prop of Object.keys(data)) {
    formData.append(prop, data[prop]);
  }

  axios.post(`${domain}/api/signup`, formData)
    .then((response) => {
      dispatch(setNotification({ success: 'Регистрация прошла успешно' }));
      dispatch(setUser(response.data.id));
      Router.push('/profile');
    })
    .catch((error) => {
      dispatch(setNotification({ error: error.response.data }));
    });
};

export default (initialState = initState) => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
