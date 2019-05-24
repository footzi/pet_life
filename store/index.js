import axios from 'axios';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

// начальное состояние
const exampleInitialState = {
    todos: ["1", "2", "3"],
    text: "text in store",
    data: "init data"
};

// алиасы для экшенов
export const actionTypes = {
    TICK: "TICK",
    GET: "GET",
    GETHOMEDATA: "GETHOMEDATA"
};

// редьюсеры
export const reducer = (state = exampleInitialState, action) => {
    switch (action.type) {
        case actionTypes.TICK:
            return Object.assign({}, state, {
                text: action.payload.text
            });
        case actionTypes.GETHOMEDATA:
            return Object.assign({}, state, {
                data: action.data.title
            });
        default:
            return state;
    }
};

// Экшены, возврашают тип, и какой-либо пэйлоад
export const test = () => {
    return { type: actionTypes.TEST };
};

export const changeText = (text = "Текст из экшена") => {
    return {
        type: actionTypes.TICK,
        payload: {
            text
        }
    };
};

export const getData = (data = "DATA from serve") => {
    return {
        type: actionTypes.GET,
        payload: {
            data
        }
    };
};

export const getHomeData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');

    return {
        type: actionTypes.GETHOMEDATA,
        payload: {
            data: response.data.title
        }
    }
}

export const someAsyncAction = () => {
    
   return dispatch => axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(({ data }) => data)
        .then(data => dispatch({ type: 'GETHOMEDATA', data }));
}

export default function(initialState = exampleInitialState) {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
}
