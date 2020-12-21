import { CHECKIN_ATTENDEE } from '../actions/actionTypes';

const initialState = {
  attendees: [],
  loading: false,
  error: ''
};

const attendeeReducer = (state = initialState, action) => {
  switch(action.type) {
    case CHECKIN_ATTENDEE:
      return state;
    default: 
      return state;
  }
}

export default attendeeReducer;