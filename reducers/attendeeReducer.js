import { CHECKIN_ATTENDEE, SET_CHECKOUT, SET_CHECKOUTMODAL } from '../actions/actionTypes';

const initialState = {
  attendees: [],
  loading: false,
  error: '',
  toCheckout: '',
  checkoutModal: false,
};

const attendeeReducer = (state = initialState, action) => {
  switch(action.type) {
    case CHECKIN_ATTENDEE:
      return state;
    case SET_CHECKOUT:
      return {
        ...state,
        toCheckout: action.payload
      };
    case SET_CHECKOUTMODAL:
      return {
        ...state,
        checkoutModal: action.payload
      }
    default: 
      return state;
  }
}

export default attendeeReducer;