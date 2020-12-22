import { CHECKIN_ATTENDEE, SET_CHECKOUT, SET_CHECKOUTMODAL } from './actionTypes';

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

const setCheckoutModal = (toShow) => {
  return {
    type: SET_CHECKOUTMODAL,
    payload: toShow
  }
} 

export { checkinAttendee, setCheckout, setCheckoutModal };