import {UserActionTypes} from '../user/user.types'


const INITIAL_STATE = {
};

const messageReducer = (state = INITIAL_STATE , action) => {
     switch(action.type) {
        case UserActionTypes.SET_MESSAGE:
            return {
                message: action.payload
            }
        case UserActionTypes.CLEAR_MESSAGE:
            return {
                message: ""
            }
        default:
            return state;
     }
}
export default messageReducer;