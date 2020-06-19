import reducer from './auth'
import * as actions from '../actions/actionTypes'

describe("auth reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            error: null,
            idToken: null,
            localId: null,
            authRedirectPath: '/'
        })
    })

    it("should store the token upon login", () => {
        expect(reducer({
            loading: false,
            error: null,
            idToken: null,
            localId: null,
            authRedirectPath: '/'
        }, {
            type: actions.AUTH_SUCCESS,
            idToken: 'some-token',
            localId: 'also-some-token'
        })).toEqual({
            loading: false,
            error: null,
            idToken: 'some-token',
            localId: 'also-some-token',
            authRedirectPath: '/'
        })
    })
})