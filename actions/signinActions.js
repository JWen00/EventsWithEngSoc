import { LOGIN_SUCCESS, LOGIN_ATTEMPT } from './actionTypes';
import * as Google from "expo-google-app-auth";

const config = {
  iosClientId: '974954981551-citqv0p5j18ug0fk0uc0ki6p5adf3is3.apps.googleusercontent.com',
  androidClientId: '974954981551-0l4cp333kfbsooqgcvk9jjsg19ovj4ic.apps.googleusercontent.com',
  androidStandaloneAppClientId: '974954981551-jcneghk2q4b9656usi3v0rk6ebrjnbhv.apps.googleusercontent.com',
  iosStandaloneAppClientId: "974954981551-lofkso32ge67nkbhsvnuqs2l0uf5bv8n.apps.googleusercontent.com"
}

const loginAttempt = () => {
  return {
    type: LOGIN_ATTEMPT
  }
}

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  }
}

const login = () => {
  return async (dispatch) => {
    try {
      const result = await Google.logInAsync({
        ...config,
        scopes: ["profile", "email"]
      });
      dispatch(loginAttempt());
      if (result.type === "success") {
        dispatch(loginSuccess());
        return result.accessToken;
      } else {
        return {'cancelled': true};
      }
    } catch (e) {
      console.log(e, 'error')
    }
  }  
};

export { login };