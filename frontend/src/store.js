import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
    taskListReducer,
    taskDetailsReducer,
    taskCreateReducer,
    taskUpdateReducer,
    taskDeleteReducer,
} from './reducers/taskReducers'

const reducer = combineReducers({
    taskList: taskListReducer,
    taskDetails: taskDetailsReducer,
    taskCreate: taskCreateReducer,
    taskUpdate: taskUpdateReducer,
    taskDelete: taskDeleteReducer,
})

const initialState = {}


const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store