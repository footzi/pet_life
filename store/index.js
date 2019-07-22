import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

const { domain } = require('../server.config');

// начальное состояние
const initState = {
  pages: {
    about: [],
    profile: {}
  },
  user: {
    id: null
  },
  profile: {},
  notification: {}
};

// алиасы для экшенов
export const actionTypes = {
  SET_ABOUT_DATA: 'SET_ABOUT_DATA',
  SET_PROFILE_DATA: 'SET_PROFILE_DATA',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  SET_USER: 'SET_USER'
};

// редьюсеры
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_ABOUT_DATA:
      return {
        ...state,
        pages: {
          ...state.pages,
          about: action.todos
        }
      };
    case actionTypes.SET_PROFILE_DATA:
      return {
        ...state,
        profile: action.profile
      };
    case actionTypes.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.data
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user || { id: null }
      };
    default:
      return state;
  }
};

// Экшены, возврашают тип, и какой-либо пэйлоад
export const setNotification = data => dispatch => {
  dispatch({ type: 'SET_NOTIFICATION', data });
};

export const setUser = user => dispatch => {
  dispatch({ type: 'SET_USER', user });
};

export const refreshTokens = ({ settings, setToken }) => async dispatch => {
  try {
    const response = await axios.get(`${domain}/api/refresh`, settings);
  } catch (error) {
    console.error(error);
    dispatch(setNotification(error.response.data));
  }
};

export const loadHomeData = ({ settings }) => async dispatch => {
  try {
    const response = await axios.get(`${domain}/pages/home`, settings);
    const { user } = response.data;

    dispatch(setUser(user));
  } catch (error) {
    console.error(error);
  }
};

export const loadAboutData = ({ settings, redirect}) => async dispatch => {
  try {
    const response = await axios.get(`${domain}/pages/about`, settings);
    const { user, todos } = response.data;

    dispatch(setUser(user));
    dispatch(setNotification({ success: 'Доступ разрешен' }));
    dispatch({ type: 'SET_ABOUT_DATA', todos });
  } catch (error) {
    console.error(error);
    redirect();
    dispatch(setNotification(error.response.data));
  }
};

// id - берется из урла
export const loadProfileData = ({ settings, id, redirect }) => async dispatch => {
  try {
    const response = await axios.post(`${domain}/pages/profile`, { id }, settings);
    const { user, profile } = response.data;

    dispatch(setUser(user));
    dispatch({ type: 'SET_PROFILE_DATA', profile });
  } catch (error) {
    console.error(error)
    redirect();
    dispatch(setNotification(error.response.data));
  }
};

export const toSignIn = ({ body, setToken, redirect }) => dispatch => {
  const formData = new FormData();

  for (const prop of Object.keys(body)) {
    formData.append(prop, body[prop]);
  }

  axios
    .post(`${domain}/api/signin`, formData)
    .then(response => {
      const { user } = response.data;
      const { access_token, refresh_token, id } = user;

      setToken(access_token, refresh_token);
      redirect(id);
      dispatch(setUser(user));
      dispatch(setNotification({ success: 'Вход произошел успешно' }));
    })
    .catch(error => {
      console.log(error.response);
      dispatch(setNotification(error.response.data));
    });
};

export const toSignUp = ({ body, setToken, redirect }) => dispatch => {
  const formData = new FormData();

  for (const prop of Object.keys(body)) {
    formData.append(prop, body[prop]);
  }

  axios
    .post(`${domain}/api/signup`, formData)
    .then(response => {
      const { user } = response.data;
      const { access_token, refresh_token, id } = user;

      setToken(access_token, refresh_token);
      redirect(id);
      dispatch(setNotification({ success: 'Регистрация прошла успешно' }));
      dispatch(setUser(user));
    })
    .catch(error => {
      console.log(error.response);
      dispatch(setNotification(error.response.data));
    });
};

export const toSignOut = ({ removeToken, redirect }) => dispatch => {
  removeToken();
  redirect();
  dispatch(setUser(null));
};

export default (initialState = initState) =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
