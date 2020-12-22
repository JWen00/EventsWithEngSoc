import { CHECKIN_ATTENDEE, SET_CHECKOUT } from '../actions/actionTypes';

const initialState = {
  attendees: [],
  loading: false,
  error: '',
  toCheckout: ''
};

const attendeeReducer = (state = initialState, action) => {
  switch(action.type) {
    case CHECKIN_ATTENDEE:
      return state;
    case SET_CHECKOUT:
      return {
        ...state,
        toCheckout: action.payload
      }
    default: 
      return state;
  }
}

export default attendeeReducer;