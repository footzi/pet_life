import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import Utils from './utils';

const { domain } = require('../server.config');

// начальное состояние
const initState = {
  pages: {
    home: [{ id: 1, name: 'Home' }],
    about: [{ id: 2, title: 'Title' }],
    profile: {}
  },
  user: {
    id: ''
  },
  profile: {},
  notification: ''
};

// алиасы для экшенов
export const actionTypes = {
  SET_HOME_DATA: 'SET_HOME_DATA',
  SET_ABOUT_DATA: 'SET_ABOUT_DATA',
  SET_PROFILE_DATA: 'SET_PROFILE_DATA',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  SET_USER: 'SET_USER'
};

// редьюсеры
export const reducer = (state = initState, action) => {
  switch (action.type) {
  case actionTypes.SET_HOME_DATA:
    return {
      ...state,
      pages: {
        ...state.pages, home: action.data,
      },
    };
  case actionTypes.SET_ABOUT_DATA:
    return {
      ...state,
      pages: {
        ...state.pages, about: action.todos,
      },
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
      user: action.user || { id: false }
    };
  default:
    return state;
  }
};

// Экшены, возврашают тип, и какой-либо пэйлоад
export const setNotification = (data) => dispatch => {
  dispatch({ type: 'SET_NOTIFICATION', data });
};

export const setUser = (user) => dispatch => {
  dispatch({ type: 'SET_USER', user });
};

export const loadHomeData = (req) => async (dispatch) => {
  try {
    const response = await axios.get(`${domain}/pages/home`, { headers: Utils.setAuthData(req), withCredentials: true });
    const { user } = response.data;

    dispatch(setUser(user));
    // dispatch({ type: 'SET_HOME_DATA', users });
  } catch (error) {
    console.error(`При получении данных для главной страницы произошла ошибка: ${error}`);
  }
};

export const loadAboutData = (req) => async (dispatch) => {
  try {
    const response = await axios.get(`${domain}/pages/about`, { headers: Utils.setAuthData(req), withCredentials: true });
    const { user, todos } = response.data;

    dispatch(setUser(user));
    dispatch(setNotification({ success: 'Доступ разрешен' }));
    dispatch({ type: 'SET_ABOUT_DATA', todos });
  } catch (error) {
    // Utils.forbiddenRedirect(res, '/');
    dispatch(setNotification(error.response.data));
  }
};

// id - берется из урла
export const loadProfileData = (req, res, id) => async (dispatch) => {
  try {
    const response = await axios.post(`${domain}/pages/profile`, { id }, { headers: Utils.setAuthData(req) });
    const { user, profile } = response.data;

    dispatch(setUser(user));
    dispatch({ type: 'SET_PROFILE_DATA', profile });
  } catch (error) {
    // Utils.forbiddenRedirect(res, '/');
    dispatch(setNotification(error.response.data));
  }
};

export const toSignIn = data => dispatch => {
  const formData = new FormData();

  for (const prop of Object.keys(data)) {
    formData.append(prop, data[prop]);
  }

  axios.post(`${domain}/api/signin`, formData)
    .then((response) => {
      const { user } = response.data;
      const { token, id } = user;

      Utils.setCookieToken(token);
      Utils.setCookieUserID(user.id);
      // Utils.redirect(`/profile/${id}`);
      dispatch(setUser(user));
      dispatch(setNotification({ success: 'Вход произошел успешно' }));
    })
    .catch((error) => {
      dispatch(setNotification(error.response.data));
    });
};

export const toSignUp = data => dispatch => {
  const formData = new FormData();

  for (const prop of Object.keys(data)) {
    formData.append(prop, data[prop]);
  }

  axios.post(`${domain}/api/signup`, formData)
    .then((response) => {
      const { user } = response.data;
      const { token, id } = user;

      Utils.setCookieToken(token);
      Utils.setCookieUserID(user.id);
      // Utils.redirect(`/profile/${id}`);
      dispatch(setNotification({ success: 'Регистрация прошла успешно' }));
      dispatch(setUser(user));
    })
    .catch((error) => {
      dispatch(setNotification(error.response.data));
    });
};

export const toSignOut = id => dispatch => {
  Utils.removeCookieToken();
  // Utils.redirect('/');
  dispatch(setUser(null));
};

export default (initialState = initState) => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
