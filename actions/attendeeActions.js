import { CHECKIN_ATTENDEE, SET_CHECKOUT } from './actionTypes';

const checkinAttendee = () => {
  return {
    type: CHECKIN_ATTENDEE
  }
};

const setCheckout = (zid) => {
  return {
    type: SET_CHECKOUT,
    payload: zid
  }
} 

export { checkinAttendee, setCheckout };