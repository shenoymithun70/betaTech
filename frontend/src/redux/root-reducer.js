import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import messageReducer from './message/message.reducer'


const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
})

export default rootReducer;