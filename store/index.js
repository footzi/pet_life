import { createStore } from "redux";

// начальное состояние
const exampleInitialState = {
    todos: ["1", "2", "3"],
    text: "text in store",
    data: ""
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
        case actionTypes.GET:
            return Object.assign({}, state, {
                data: action.payload.data
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

export const getHomeData = () => {
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     .then(response => response.json())
    //     .then(json => console.log(json))
}

export default function(initialState = exampleInitialState) {
    return createStore(reducer, initialState);
}
