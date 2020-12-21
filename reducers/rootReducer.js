import { combineReducers } from 'redux';
import attendeeReducer from './attendeeReducer';
import signinReducer from './signinReducer';

const rootReducer = combineReducers({
  attendee: attendeeReducer,
  signin: signinReducer
});

export default rootReducer;