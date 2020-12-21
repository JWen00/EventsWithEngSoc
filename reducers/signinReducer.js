import { LOGIN_SUCCESS, LOGIN_ATTEMPT } from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  loading: false
};

const signinReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      console.log('when i go');
      return {
        ...state,
        loading: false,
        isLoggedIn: true, 
      };
    case LOGIN_ATTEMPT:
      return {
        ...state,
        loading: true
      }
    default: 
      return state;
  }
}

export default signinReducer