import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('localId')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const logout = (expectedTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expectedTime * 1000)
    }
}

export const auth = (email, password, method) => {
    return dispatch => {
        dispatch(authStart())
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCs3uKS7Y3HihoW59StZczRBzCCvrZ2Duk"
        if(!method){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCs3uKS7Y3HihoW59StZczRBzCCvrZ2Duk"
        }
        axios.post(url, data)
        .then(response => {

            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('localId', response.data.localId)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(logout(response.data.expiresIn))
        })
        .catch(error => {
             dispatch(authFail(error.response.data.error.message))
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(authLogout())
        }else{
            const localId = localStorage.getItem('localId')
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate > new Date()){
                dispatch(authSuccess(token, localId))
                dispatch(logout((expirationDate.getTime() - new Date().getTime())/1000))
            }else{
                dispatch(authLogout())
            }
        }
        
    }
}