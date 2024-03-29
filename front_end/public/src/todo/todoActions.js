import axios from 'axios'
const URL = 'http://localhost:3003/api/todos'

export const changeDescription = (event) => {
    return {
        type:'DESCRIPTION_CHANGED',
        payload: event.target.value
    }
    
}

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/`:''
        const request = axios.get(`${URL}?sort=-createdAt&${search}`)
            .then(
                resp => dispatch({
                    type:'TODO_SEARCHED', payload: resp.data
                })
            )
    }
}


//Usando o thunk para fazer o dispatch para chamar vários then
export const add = (description) => {
    return dispatch => {
        axios.post(URL, {description})
            .then(
                resp => dispatch({
                    type: 'TODO_ADDED',
                    payload: resp.data
                })
               
            )
            .then(resp => dispatch(search()))
    }
}

export const markeAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true})
            .then(
                resp => dispatch({
                    type: 'TODO_MARKED_AS_DONE',
                    payload: resp.data
                })
            )
            .then(
                resp => dispatch(search())
            )
    }
}

export const markeAsPending = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false})
            .then(
                resp => dispatch({
                    type: 'TODO_MARKED_AS_PENDING',
                    payload: resp.data
                })
            )
            .then(
                resp => dispatch(search())
            )
    }
}

export const remove = (todo) => {
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp=> dispatch(search()))
    }
}


export const clear = () => {
    return [{
        type: 'TODO_CLEAR'
    }, search()]
}