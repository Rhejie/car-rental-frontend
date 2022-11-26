import * as types from './mutation-types'
export default {
    [types.USER_LOGGEDIN](state, item) {
        state.userloggedIn = item
    }
}