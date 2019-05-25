import axios from 'axios';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';

// начальное состояние
const initState = {
    pages: {
        home : [{id:1, name:"Vlad"}],
        about: '',
        blog : ''
    }
};

// алиасы для экшенов
export const actionTypes = {
    GET_HOME_DATA : 'GET_HOME_DATA',
    GET_ABOUT_DATA: 'GET_ABOUT_DATA',
    GET_BLOG_DATA : 'GET_BLOG_DATA'
};

// редьюсеры
export const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME_DATA:
            return {
                ...state,
                pages: {
                    ...state.pages, home: action.data
                }
            };
        case actionTypes.GET_ABOUT_DATA:
            return {
                ...state,
                pages: {
                    ...state.pages, about: action.data
                }
            };
        case actionTypes.GET_BLOG_DATA:
            return {
                ...state,
                pages: {
                    ...state.pages, blog: action.data
                }
            };
        default:
            return state;
    }
};

// Экшены, возврашают тип, и какой-либо пэйлоад
export const loadHomeData = () => {
    return (dispatch) => axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            const data = response.data;

            dispatch({type: 'GET_HOME_DATA', data});
        })
        .catch((error) => {
            console.error(`При получении данных для главной страницы произошла ошибка: ${error}`);
        });
};

export const loadAboutData = () => {
    return (dispatch) => axios.get('https://jsonplaceholder.typicode.com/todos')
        .then((response) => {
            const data = response.data;

            dispatch({type: 'GET_ABOUT_DATA', data});
        })
        .catch((error) => {
            console.error(`При получении данных для cтраницы обо мне произошла ошибка: ${error}`);
        });
};

export const loadBlogData = () => {
    return (dispatch) => axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            const data = response.data;

            dispatch({type: 'GET_BLOG_DATA', data});
        })
        .catch((error) => {
            console.error(`При получении данных для блога произошла ошибка: ${error}`);
        });
};

export default (initialState = initState) => {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
};
